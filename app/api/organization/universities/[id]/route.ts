import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { universitySchema } from '@/app/api/validation/organization'

// GET /api/organization/universities/[id] - Get a single university
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params
    const id = parseInt(idParam, 10)
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
    }

    const university = await prisma.university.findUnique({
      where: { id },
      include: {
        region: true,
      },
    })

    if (!university) {
      return NextResponse.json({ error: 'University not found' }, { status: 404 })
    }

    return NextResponse.json(university)
  } catch (error: any) {
    console.error('Error fetching university:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch university', 
      message: error.message 
    }, { status: 500 })
  }
}

// PUT /api/organization/universities/[id] - Update a university
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params
    const id = parseInt(idParam, 10)
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
    }

    const body = await request.json()
    const validatedData = universitySchema.parse(body)

    // Check if region exists
    const region = await prisma.region.findUnique({
      where: { id: validatedData.regionId },
    })

    if (!region) {
      return NextResponse.json({ error: 'Region not found' }, { status: 404 })
    }

    const university = await prisma.university.update({
      where: { id },
      data: validatedData,
      include: {
        region: true,
      },
    })

    return NextResponse.json(university)
  } catch (error: any) {
    console.error('Error updating university:', error)
    console.error('Error details:', JSON.stringify(error, null, 2))
    
    if (error.name === 'ZodError') {
      console.error('Zod validation errors:', error.errors)
      return NextResponse.json({ 
        error: 'Validation failed', 
        message: error.errors?.[0]?.message || 'Invalid input data',
        details: error.errors 
      }, { status: 400 })
    }
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'University not found' }, { status: 404 })
    }
    if (error.code === 'P2003') {
      return NextResponse.json({ error: 'Invalid region ID. The region does not exist.' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to update university', message: error.message }, { status: 500 })
  }
}

// DELETE /api/organization/universities/[id] - Delete a university
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params
    const id = parseInt(idParam, 10)
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
    }

    await prisma.university.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'University deleted successfully' })
  } catch (error: any) {
    console.error('Error deleting university:', error)
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'University not found' }, { status: 404 })
    }
    return NextResponse.json({ error: 'Failed to delete university', message: error.message }, { status: 500 })
  }
}


