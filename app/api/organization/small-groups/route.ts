import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { smallGroupSchema } from '@/app/api/validation/organization'

// GET /api/organization/small-groups - Fetch all small groups
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get('type')

    const where: any = {}
    if (type && (type === 'student' || type === 'graduate')) where.type = type

    const smallGroups = await prisma.smallGroup.findMany({
      where,
      orderBy: {
        name: 'asc',
      },
    })

    return NextResponse.json({ smallGroups: smallGroups || [] })
  } catch (error: any) {
    console.error('Error fetching small groups:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch small groups', 
      message: error.message,
      code: error.code 
    }, { status: 500 })
  }
}

// POST /api/organization/small-groups - Create a new small group
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = smallGroupSchema.parse(body)

    const smallGroup = await prisma.smallGroup.create({
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

    return NextResponse.json(smallGroup, { status: 201 })
  } catch (error: any) {
    console.error('Error creating small group:', error)
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create small group', message: error.message }, { status: 500 })
  }
}

