import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { blogCategorySchema } from '@/app/api/validation/blog'

// PUT /api/blog/categories/[id] - Update a category
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const categoryId = parseInt(id, 10)

    if (isNaN(categoryId)) {
      return NextResponse.json({ error: 'Invalid category ID' }, { status: 400 })
    }

    const body = await request.json()
    const validatedData = blogCategorySchema.parse(body)

    // Check if category exists
    const existingCategory = await prisma.blogCategory.findUnique({
      where: { id: categoryId },
    })

    if (!existingCategory) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }

    // Check if name or slug already exists (excluding current category)
    const duplicateCategory = await prisma.blogCategory.findFirst({
      where: {
        AND: [
          { id: { not: categoryId } },
          {
            OR: [{ name: validatedData.name }, { slug: validatedData.slug }],
          },
        ],
      },
    })

    if (duplicateCategory) {
      return NextResponse.json({ error: 'Category name or slug already exists' }, { status: 400 })
    }

    // Update the category
    const category = await prisma.blogCategory.update({
      where: { id: categoryId },
      data: validatedData,
    })

    return NextResponse.json(category)
  } catch (error: any) {
    console.error('Error updating category:', error)
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 })
    }
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Category name or slug already exists' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to update category', message: error.message }, { status: 500 })
  }
}

// DELETE /api/blog/categories/[id] - Delete a category
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const categoryId = parseInt(id, 10)

    if (isNaN(categoryId)) {
      return NextResponse.json({ error: 'Invalid category ID' }, { status: 400 })
    }

    // Check if category exists
    const existingCategory = await prisma.blogCategory.findUnique({
      where: { id: categoryId },
      include: {
        _count: {
          select: { blogs: true },
        },
      },
    })

    if (!existingCategory) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }

    // Check if category has associated blog posts
    if (existingCategory._count.blogs > 0) {
      return NextResponse.json(
        {
          error: 'Cannot delete category',
          message: `This category has ${existingCategory._count.blogs} blog post(s) associated with it. Please reassign or delete those posts first.`,
        },
        { status: 400 }
      )
    }

    // Delete the category
    await prisma.blogCategory.delete({
      where: { id: categoryId },
    })

    return NextResponse.json({ message: 'Category deleted successfully' }, { status: 200 })
  } catch (error: any) {
    console.error('Error deleting category:', error)
    if (error.code === 'P2003') {
      return NextResponse.json(
        {
          error: 'Cannot delete category',
          message: 'This category is being used by one or more blog posts.',
        },
        { status: 400 }
      )
    }
    return NextResponse.json({ error: 'Failed to delete category', message: error.message }, { status: 500 })
  }
}

