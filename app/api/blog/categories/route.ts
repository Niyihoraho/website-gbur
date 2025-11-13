import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { blogCategorySchema } from '@/app/api/validation/blog'

// GET /api/blog/categories - Fetch all blog categories
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const includeInactive = searchParams.get('includeInactive') === 'true'

    const categories = await prisma.blogCategory.findMany({
      where: includeInactive ? {} : { isActive: true },
      orderBy: {
        order: 'asc',
      },
    })

    return NextResponse.json({ categories: categories || [] })
  } catch (error: any) {
    console.error('Error fetching blog categories:', error)
    console.error('Error details:', error.message)
    
    // Return empty array if table doesn't exist
    if (error.message?.includes('does not exist') || error.message?.includes('Table') || error.message?.includes('Unknown table')) {
      console.warn('BlogCategory table may not exist. Returning empty array.')
      return NextResponse.json({ categories: [] })
    }
    
    return NextResponse.json({ 
      error: 'Failed to fetch blog categories', 
      message: error.message,
      code: error.code 
    }, { status: 500 })
  }
}

// POST /api/blog/categories - Create a new blog category
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = blogCategorySchema.parse(body)

    // Check if category name or slug already exists
    const existingCategory = await prisma.blogCategory.findFirst({
      where: {
        OR: [{ name: validatedData.name }, { slug: validatedData.slug }],
      },
    })

    if (existingCategory) {
      return NextResponse.json({ error: 'Category name or slug already exists' }, { status: 400 })
    }

    const category = await prisma.blogCategory.create({
      data: validatedData,
    })

    return NextResponse.json(category, { status: 201 })
  } catch (error: any) {
    console.error('Error creating blog category:', error)
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 })
    }
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Category name or slug already exists' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create blog category', message: error.message }, { status: 500 })
  }
}

