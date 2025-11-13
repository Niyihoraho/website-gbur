import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { universitySchema } from '@/app/api/validation/organization'

// GET /api/organization/universities - Fetch all universities
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const regionId = searchParams.get('regionId')

    const universities = await prisma.university.findMany({
      where: regionId ? { regionId: parseInt(regionId, 10) } : {},
      include: {
        region: true,
      },
      orderBy: {
        name: 'asc',
      },
    })

    return NextResponse.json({ universities: universities || [] })
  } catch (error: any) {
    console.error('Error fetching universities:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch universities', 
      message: error.message,
      code: error.code 
    }, { status: 500 })
  }
}

// POST /api/organization/universities - Create a new university
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = universitySchema.parse(body)

    // Check if region exists
    const region = await prisma.region.findUnique({
      where: { id: validatedData.regionId },
    })

    if (!region) {
      return NextResponse.json({ error: 'Region not found' }, { status: 404 })
    }

    const university = await prisma.university.create({
      data: validatedData,
      include: {
        region: true,
      },
    })

    return NextResponse.json(university, { status: 201 })
  } catch (error: any) {
    console.error('Error creating university:', error)
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create university', message: error.message }, { status: 500 })
  }
}

