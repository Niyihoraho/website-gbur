import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { regionSchema } from '@/app/api/validation/organization'

// GET /api/organization/regions - Fetch all regions
export async function GET(request: NextRequest) {
  try {
    const regions = await prisma.region.findMany({
      orderBy: {
        name: 'asc',
      },
    })

    return NextResponse.json({ regions: regions || [] })
  } catch (error: any) {
    console.error('Error fetching regions:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch regions', 
      message: error.message,
      code: error.code 
    }, { status: 500 })
  }
}

// POST /api/organization/regions - Create a new region
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = regionSchema.parse(body)

    // Check if region name already exists
    const existingRegion = await prisma.region.findUnique({
      where: { name: validatedData.name },
    })

    if (existingRegion) {
      return NextResponse.json({ error: 'Region name already exists' }, { status: 400 })
    }

    const region = await prisma.region.create({
      data: validatedData,
    })

    return NextResponse.json(region, { status: 201 })
  } catch (error: any) {
    console.error('Error creating region:', error)
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 })
    }
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Region name already exists' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create region', message: error.message }, { status: 500 })
  }
}

