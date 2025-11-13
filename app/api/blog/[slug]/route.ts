import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { updateBlogPostSchema } from '@/app/api/validation/blog'
import { BlogStatus } from '@prisma/client'

// GET /api/blog/[slug] - Fetch a single blog post by slug or ID
// This route handles both slug (string) and ID (numeric) lookups
export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    
    // Check if slug is numeric (ID) or string (slug)
    const isNumeric = /^\d+$/.test(slug)
    
    let post
    if (isNumeric) {
      // If numeric, search by ID
      const postId = parseInt(slug, 10)
      post = await prisma.blog.findUnique({
        where: { id: postId },
        include: {
          category: true,
        },
      })
    } else {
      // If not numeric, search by slug
      post = await prisma.blog.findUnique({
        where: { slug },
        include: {
          category: true,
        },
      })
    }

    if (!post) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 })
    }

    // Transform post to match frontend expectations
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

    return NextResponse.json(transformedPost)
  } catch (error: any) {
    console.error('Error fetching blog post:', error)
    return NextResponse.json({ error: 'Failed to fetch blog post', message: error.message }, { status: 500 })
  }
}

// PUT /api/blog/[slug] - Update a blog post by ID (slug must be numeric ID)
export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    
    // PUT only works with numeric IDs
    if (!/^\d+$/.test(slug)) {
      return NextResponse.json({ error: 'PUT endpoint requires numeric ID, not slug' }, { status: 400 })
    }
    
    const postId = parseInt(slug, 10)
    const body = await request.json()
    const validatedData = updateBlogPostSchema.parse({ ...body, id: postId })

    // Check if post exists
    const existingPost = await prisma.blog.findUnique({
      where: { id: postId },
    })

    if (!existingPost) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 })
    }

    // Check if category exists (if categoryId is being updated)
    if (validatedData.categoryId) {
      const category = await prisma.blogCategory.findUnique({
        where: { id: validatedData.categoryId },
      })

      if (!category) {
        return NextResponse.json({ error: 'Category not found' }, { status: 404 })
      }
    }

    // Check if slug already exists (if slug is being updated)
    if (validatedData.slug && validatedData.slug !== existingPost.slug) {
      const slugExists = await prisma.blog.findUnique({
        where: { slug: validatedData.slug },
      })

      if (slugExists) {
        return NextResponse.json({ error: 'Slug already exists' }, { status: 400 })
      }
    }

    // Prepare update data
    const updateData: any = {}
    if (validatedData.title) updateData.title = validatedData.title
    if (validatedData.slug) updateData.slug = validatedData.slug
    if (validatedData.content) updateData.content = validatedData.content
    if (validatedData.excerpt !== undefined) updateData.excerpt = validatedData.excerpt
    if (validatedData.featuredImage !== undefined) updateData.featuredImage = validatedData.featuredImage
    if (validatedData.categoryId) updateData.categoryId = validatedData.categoryId
    if (validatedData.status) updateData.status = validatedData.status as BlogStatus
    if (validatedData.publishedAt !== undefined) {
      updateData.publishedAt = validatedData.publishedAt ? new Date(validatedData.publishedAt) : null
    }

    // Update the blog post
    const post = await prisma.blog.update({
      where: { id: postId },
      data: updateData,
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

    return NextResponse.json(transformedPost)
  } catch (error: any) {
    console.error('Error updating blog post:', error)
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 })
    }
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to update blog post', message: error.message }, { status: 500 })
  }
}

// DELETE /api/blog/[slug] - Delete a blog post by ID (slug must be numeric ID)
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    
    // DELETE only works with numeric IDs
    if (!/^\d+$/.test(slug)) {
      return NextResponse.json({ error: 'DELETE endpoint requires numeric ID, not slug' }, { status: 400 })
    }
    
    const postId = parseInt(slug, 10)

    // Check if post exists
    const existingPost = await prisma.blog.findUnique({
      where: { id: postId },
    })

    if (!existingPost) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 })
    }

    // Delete the blog post
    await prisma.blog.delete({
      where: { id: postId },
    })

    return NextResponse.json({ message: 'Blog post deleted successfully' }, { status: 200 })
  } catch (error: any) {
    console.error('Error deleting blog post:', error)
    return NextResponse.json({ error: 'Failed to delete blog post', message: error.message }, { status: 500 })
  }
}

