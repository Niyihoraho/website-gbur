import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { regionalStaffSchema } from '@/app/api/validation/organization'

// GET /api/organization/regional-staff - Fetch all regional staff
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const regionId = searchParams.get('regionId')

    const regionalStaff = await prisma.regionalStaff.findMany({
      where: regionId ? { regionId: parseInt(regionId, 10) } : {},
      include: {
        region: true,
      },
      orderBy: {
        name: 'asc',
      },
    })

    return NextResponse.json({ regionalStaff: regionalStaff || [] })
  } catch (error: any) {
    console.error('Error fetching regional staff:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch regional staff', 
      message: error.message,
      code: error.code 
    }, { status: 500 })
  }
}

// POST /api/organization/regional-staff - Create a new regional staff
export async function POST(request: NextRequest) {
  let body: any
  try {
    body = await request.json()
    console.log('Received request body:', JSON.stringify(body, null, 2))
  } catch (parseError: any) {
    console.error('JSON parsing error:', parseError)
    return NextResponse.json({ 
      error: 'Invalid JSON in request body',
      message: parseError.message 
    }, { status: 400 })
  }

  try {
    const validatedData = regionalStaffSchema.parse(body)
    console.log('Validated data:', JSON.stringify(validatedData, null, 2))

    // Check if region exists
    const region = await prisma.region.findUnique({
      where: { id: validatedData.regionId },
    })

    if (!region) {
      return NextResponse.json({ error: 'Region not found' }, { status: 404 })
    }

    // Create the regional staff
    console.log('Creating regional staff with data:', {
      regionId: validatedData.regionId,
      name: validatedData.name,
      phone: validatedData.phone || null,
      WhatappNumber: validatedData.WhatappNumber || null,
    })
    
    const staff = await prisma.regionalStaff.create({
      data: {
        regionId: validatedData.regionId,
        name: validatedData.name,
        phone: validatedData.phone || null,
        WhatappNumber: validatedData.WhatappNumber || null,
      },
      include: {
        region: true,
      },
    })

    console.log('Successfully created regional staff:', staff.id)
    return NextResponse.json(staff, { status: 201 })
  } catch (error: any) {
    console.error('=== ERROR CREATING REGIONAL STAFF ===')
    console.error('Error type:', error?.constructor?.name)
    console.error('Error name:', error?.name)
    console.error('Error message:', error?.message)
    console.error('Error code:', error?.code)
    console.error('Error stack:', error?.stack)
    
    // Try to stringify error (may fail for circular references)
    try {
      console.error('Error object:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2))
    } catch (e) {
      console.error('Could not stringify error object')
    }
    
    if (error.name === 'ZodError') {
      console.error('Zod validation errors:', error.errors)
      return NextResponse.json({ 
        error: 'Validation failed', 
        details: error.errors 
      }, { status: 400 })
    }
    
    // Handle Prisma-specific errors
    if (error.code) {
      console.error('Prisma error code:', error.code)
      if (error.code === 'P2002') {
        return NextResponse.json({ 
          error: 'A regional staff with this information already exists',
          code: error.code
        }, { status: 400 })
      }
      if (error.code === 'P2003') {
        return NextResponse.json({ 
          error: 'Invalid region ID. The region does not exist.',
          code: error.code
        }, { status: 400 })
      }
      if (error.code === 'P2025') {
        return NextResponse.json({ 
          error: 'Record not found',
          code: error.code
        }, { status: 404 })
      }
    }
    
    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json({ 
        error: 'Invalid JSON in request body',
        message: error.message
      }, { status: 400 })
    }
    
    return NextResponse.json({ 
      error: 'Failed to create regional staff', 
      message: error?.message || 'Unknown error',
      code: error?.code || 'UNKNOWN',
      type: error?.constructor?.name || 'Error'
    }, { status: 500 })
  }
}

