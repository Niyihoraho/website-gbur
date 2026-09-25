import { NextRequest, NextResponse } from 'next/server'
import { getAllStaffCards, createStaffCard, generateNextStaffId } from '@/app/lib/staffCards'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('query')?.toLowerCase().trim() || ''
    const department = searchParams.get('department')?.trim() || ''
    const workField = searchParams.get('work_field')?.trim() || ''
    const status = searchParams.get('status')?.toLowerCase().trim() || '' // 'active' or 'expired'

    let cards = await getAllStaffCards()
    const now = new Date()

    if (query) {
      cards = cards.filter((c) => {
        const fullName = `${c.first_name} ${c.last_name}`.toLowerCase()
        const idMatch = c.id.toLowerCase().includes(query)
        const nameMatch = fullName.includes(query)
        const posMatch = (c.position || '').toLowerCase().includes(query)
        const deptMatch = (c.department || '').toLowerCase().includes(query)
        const uniMatch = (c.universities_in_charge || []).some((u) =>
          u.toLowerCase().includes(query)
        )
        return idMatch || nameMatch || posMatch || deptMatch || uniMatch
      })
    }

    if (department && department !== 'all') {
      cards = cards.filter((c) => (c.department || '').toLowerCase() === department.toLowerCase())
    }

    if (workField && workField !== 'all') {
      cards = cards.filter((c) => (c.work_field || '').toLowerCase().includes(workField.toLowerCase()))
    }

    if (status === 'active') {
      cards = cards.filter((c) => {
        if (!c.validity) return true
        return new Date(c.validity) >= now
      })
    } else if (status === 'expired') {
      cards = cards.filter((c) => {
        if (!c.validity) return false
        return new Date(c.validity) < now
      })
    }

    const nextId = await generateNextStaffId()

    return NextResponse.json({
      success: true,
      total: cards.length,
      nextSuggestedId: nextId,
      staffCards: cards,
    })
  } catch (error: any) {
    console.error('API Error in GET /api/staff-cards:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch staff cards', message: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.first_name || !body.first_name.trim()) {
      return NextResponse.json(
        { success: false, error: 'First name is required' },
        { status: 400 }
      )
    }

    if (!body.last_name || !body.last_name.trim()) {
      return NextResponse.json(
        { success: false, error: 'Last name is required' },
        { status: 400 }
      )
    }

    const newCard = await createStaffCard({
      id: body.id,
      first_name: body.first_name,
      last_name: body.last_name,
      position: body.position,
      department: body.department,
      work_field: body.work_field,
      universities_in_charge: body.universities_in_charge,
      validity: body.validity,
      image_url: body.image_url,
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Staff card registered successfully',
        staffCard: newCard,
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('API Error in POST /api/staff-cards:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to register staff card', message: error.message },
      { status: 500 }
    )
  }
}
