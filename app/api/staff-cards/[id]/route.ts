import { NextRequest, NextResponse } from 'next/server'
import { getStaffCardById, deleteStaffCard, createStaffCard } from '@/app/lib/staffCards'

export const dynamic = 'force-dynamic'

interface RouteProps {
  params: Promise<{ id: string }>
}

export async function GET(
  request: NextRequest,
  { params }: RouteProps
) {
  try {
    const { id } = await params
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Staff Card ID is required' },
        { status: 400 }
      )
    }

    const card = await getStaffCardById(id)
    if (!card) {
      return NextResponse.json(
        { success: false, error: 'Staff Card not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      staffCard: card,
    })
  } catch (error: any) {
    console.error('API Error in GET /api/staff-cards/[id]:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch staff card', message: error.message },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: RouteProps
) {
  try {
    const { id } = await params
    const body = await request.json()

    const existing = await getStaffCardById(id)
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Staff Card not found' },
        { status: 404 }
      )
    }

    const updated = await createStaffCard({
      id: id,
      first_name: body.first_name ?? existing.first_name,
      last_name: body.last_name ?? existing.last_name,
      position: body.position ?? existing.position,
      department: body.department ?? existing.department,
      work_field: body.work_field ?? existing.work_field,
      universities_in_charge: body.universities_in_charge ?? existing.universities_in_charge,
      validity: body.validity ?? existing.validity,
      image_url: body.image_url ?? existing.image_url,
    })

    return NextResponse.json({
      success: true,
      message: 'Staff card updated successfully',
      staffCard: updated,
    })
  } catch (error: any) {
    console.error('API Error in PUT /api/staff-cards/[id]:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update staff card', message: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteProps
) {
  try {
    const { id } = await params
    const success = await deleteStaffCard(id)

    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Staff Card could not be deleted' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Staff card deleted successfully',
    })
  } catch (error: any) {
    console.error('API Error in DELETE /api/staff-cards/[id]:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete staff card', message: error.message },
      { status: 500 }
    )
  }
}
