import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { smallGroupSchema } from '@/app/api/validation/organization'

// GET /api/organization/small-groups/[id] - Get a single small group
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10)
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
    }

    const smallGroup = await prisma.smallGroup.findUnique({
      where: { id },
    })

    if (!smallGroup) {
      return NextResponse.json({ error: 'Small group not found' }, { status: 404 })
    }

    return NextResponse.json(smallGroup)
  } catch (error: any) {
    console.error('Error fetching small group:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch small group', 
      message: error.message 
    }, { status: 500 })
  }
}

// PUT /api/organization/small-groups/[id] - Update a small group
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10)
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
    }

    const body = await request.json()
    const validatedData = smallGroupSchema.parse(body)

    const smallGroup = await prisma.smallGroup.update({
      where: { id },
      data: {
        name: validatedData.name,
        type: validatedData.type,
        province: validatedData.province || null,
        district: validatedData.district || null,
        sector: validatedData.sector || null,
        address: validatedData.address || null,
        cellLeaderName: validatedData.cellLeaderName || null,
        WhatappNumber: validatedData.WhatappNumber || null,
      },
    })

    return NextResponse.json(smallGroup)
  } catch (error: any) {
    console.error('Error updating small group:', error)
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 })
    }
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Small group not found' }, { status: 404 })
    }
    return NextResponse.json({ error: 'Failed to update small group', message: error.message }, { status: 500 })
  }
}

// DELETE /api/organization/small-groups/[id] - Delete a small group
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10)
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
    }

    await prisma.smallGroup.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Small group deleted successfully' })
  } catch (error: any) {
    console.error('Error deleting small group:', error)
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Small group not found' }, { status: 404 })
    }
    return NextResponse.json({ error: 'Failed to delete small group', message: error.message }, { status: 500 })
  }
}


