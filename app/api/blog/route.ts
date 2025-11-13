import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { createBlogPostSchema, blogPostQuerySchema } from '@/app/api/validation/blog'
import { BlogStatus } from '@prisma/client'

// GET /api/blog - Fetch all blog posts
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    
    // Build query object - only include parameters that are present (not null)
    const queryParams: Record<string, string> = {}
    const status = searchParams.get('status')
    const categoryId = searchParams.get('categoryId')
    const limit = searchParams.get('limit')
    const offset = searchParams.get('offset')
    
    if (status) queryParams.status = status
    if (categoryId) queryParams.categoryId = categoryId
    if (limit) queryParams.limit = limit
    if (offset) queryParams.offset = offset
    
    // Validate query parameters using safeParse for better error handling
    const validationResult = blogPostQuerySchema.safeParse(queryParams)
    
    if (!validationResult.success) {
      console.error('Query validation failed:', validationResult.error.format())
      return NextResponse.json(
        { error: 'Invalid query parameters', details: validationResult.error.errors },
        { status: 400 }
      )
    }
    
    const query = validationResult.data

    const where: any = {}
    if (query.status) {
      where.status = query.status as BlogStatus
    }
    if (query.categoryId) {
      where.categoryId = query.categoryId
    }

    // Fetch posts from database
    const posts = await prisma.blog.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: query.limit || 100,
      skip: query.offset || 0,
    })

    // If no posts found, return empty array
    if (!posts || posts.length === 0) {
      return NextResponse.json({ posts: [], total: 0 })
    }

    // Sort posts: published posts first (by publishedAt), then drafts (by createdAt)
    const sortedPosts = [...posts].sort((a, b) => {
      if (a.publishedAt && b.publishedAt) {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      }
      if (a.publishedAt && !b.publishedAt) return -1
      if (!a.publishedAt && b.publishedAt) return 1
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

    // Transform posts to match frontend expectations
    const transformedPosts = sortedPosts.map((post) => {
      // Safely handle category - in case category is null
      const categoryName = post.category?.name || 'Uncategorized'
      
      return {
        id: post.id,
        title: post.title,
        slug: post.slug,
        image: post.featuredImage || '/Gbur/DSC_9972.jpg', // Default image
        category: categoryName.toUpperCase(),
        date: post.publishedAt
          ? new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          : new Date(post.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
        excerpt: post.excerpt ? post.excerpt.split('\n').filter((line) => line.trim()) : [],
        content: post.content ? post.content.split('\n').filter((line) => line.trim()) : [],
        author: {
          name: 'GBUR Team', // TODO: Add author relation when schema is updated
          avatar: '/Gbur/DSC_9816.jpg', // Default avatar
        },
        status: post.status,
        publishedAt: post.publishedAt,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      }
    })

    return NextResponse.json({ posts: transformedPosts, total: transformedPosts.length })
  } catch (error: any) {
    console.error('Error fetching blog posts:', error)
    console.error('Error stack:', error.stack)
    console.error('Error details:', JSON.stringify(error, null, 2))
    
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: 'Invalid query parameters', details: error.errors }, { status: 400 })
    }
    
    // Check for Prisma errors
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Database constraint violation', message: error.message }, { status: 400 })
    }
    
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Record not found', message: error.message }, { status: 404 })
    }
    
    // Database connection errors
    if (error.message?.includes('Can\'t reach database') || error.message?.includes('connection')) {
      return NextResponse.json({ 
        error: 'Database connection failed', 
        message: 'Please check your database connection and ensure the database is running.',
        details: error.message 
      }, { status: 500 })
    }
    
    // Return empty array if table doesn't exist or no posts
    if (error.message?.includes('does not exist') || error.message?.includes('Table') || error.message?.includes('Unknown table')) {
      console.warn('Blog table may not exist or is empty. Returning empty array.')
      return NextResponse.json({ posts: [], total: 0 })
    }
    
    return NextResponse.json({ 
      error: 'Failed to fetch blog posts', 
      message: error.message,
      code: error.code,
      meta: error.meta 
    }, { status: 500 })
  }
}

// POST /api/blog - Create a new blog post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = createBlogPostSchema.parse(body)

    // Check if category exists
    const category = await prisma.blogCategory.findUnique({
      where: { id: validatedData.categoryId },
    })

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }

    // Check if slug already exists
    const existingPost = await prisma.blog.findUnique({
      where: { slug: validatedData.slug },
    })

    if (existingPost) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 400 })
    }

    // Create the blog post
    const post = await prisma.blog.create({
      data: {
        title: validatedData.title,
        slug: validatedData.slug,
        content: validatedData.content,
        excerpt: validatedData.excerpt || null,
        featuredImage: validatedData.featuredImage || null,
        categoryId: validatedData.categoryId,
        status: validatedData.status as BlogStatus,
        publishedAt: validatedData.publishedAt ? new Date(validatedData.publishedAt) : null,
      },
      include: {
        category: true,
      },
    })

    // Transform response to match frontend expectations
    const transformedPost = {
      id: post.id,
      title: post.title,
      slug: post.slug,
      image: post.featuredImage || '/Gbur/DSC_9972.jpg',
      category: post.category.name.toUpperCase(),
      date: post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        : new Date(post.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
      excerpt: post.excerpt ? post.excerpt.split('\n').filter((line) => line.trim()) : [],
      content: post.content.split('\n').filter((line) => line.trim()),
      author: {
        name: 'GBUR Team',
        avatar: '/Gbur/DSC_9816.jpg',
      },
      status: post.status,
      publishedAt: post.publishedAt,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }

    return NextResponse.json(transformedPost, { status: 201 })
  } catch (error: any) {
    console.error('Error creating blog post:', error)
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 })
    }
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create blog post', message: error.message }, { status: 500 })
  }
}

