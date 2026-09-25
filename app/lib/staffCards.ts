import { prisma } from './prisma'

export interface StaffCard {
  id: string
  first_name: string
  last_name: string
  position: string | null
  department: string | null
  work_field: string | null
  universities_in_charge: string[]
  validity: string | Date | null
  image_url: string | null
}

export interface StaffCardInput {
  id?: string
  first_name: string
  last_name: string
  position?: string | null
  department?: string | null
  work_field?: string | null
  universities_in_charge?: string[]
  validity?: string | Date | null
  image_url?: string | null
}

export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    const envUrl = process.env.NEXT_PUBLIC_SITE_URL.trim().replace(/\/$/, '')
    if (envUrl && !envUrl.includes('localhost') && !envUrl.includes('127.0.0.1')) {
      return envUrl
    }
  }
  if (typeof window !== 'undefined') {
    const origin = window.location.origin.trim().replace(/\/$/, '')
    if (
      !origin.includes('localhost') &&
      !origin.includes('127.0.0.1') &&
      !origin.includes('0.0.0.0') &&
      (origin.includes('gburwanda.com') || origin.includes('www.gburwanda.com'))
    ) {
      return origin
    }
  }
  return 'https://www.gburwanda.com'
}

export function getVerificationUrl(id: string): string {
  const baseUrl = getSiteUrl()
  return `${baseUrl}/verify/${encodeURIComponent(id.trim().toUpperCase())}`
}

const DEFAULT_PHOTO_MAP: Record<string, string> = {
  'GBUR-2026-001': '/cards/samson.jpg',
  'GBUR-2026-002': '/cards/Alex.jpg',
  'GBUR-2026-003': '/cards/Enos.png',
  'GBUR-2026-004': '/cards/suzan.jpg',
  'GBUR-2026-005': '/cards/David dukuze.png',
  'GBUR-2026-006': '/cards/Heroic.png',
  'GBUR-2026-007': '/cards/Xavier.jpg',
  'GBUR-2026-008': '/cards/aime.jpg',
  'GBUR-2026-009': '/cards/Nuliathe.png',
  'GBUR-2026-010': '/cards/Emeline.jpg',
  'GBUR-2026-011': '/cards/Isimbi.png',
  'GBUR-2026-012': '/cards/Isaac.jpg',
  'GBUR-2026-013': '/cards/Ivan.jpg',
  'GBUR-2026-014': '/cards/Patrick.jpg',
  'GBUR-2026-015': '/cards/Byiringiro.jpg',
  'GBUR-2026-016': '/cards/Sadoki.png',
}

function resolveImageUrl(card: StaffCard): string | null {
  if (card.image_url && card.image_url.trim()) {
    return card.image_url.trim()
  }
  if (DEFAULT_PHOTO_MAP[card.id]) {
    return DEFAULT_PHOTO_MAP[card.id]
  }
  return null
}

export async function getAllStaffCards(): Promise<StaffCard[]> {
  try {
    const records = await prisma.$queryRawUnsafe<StaffCard[]>(`
      SELECT 
        id, 
        first_name, 
        last_name, 
        position, 
        department, 
        work_field, 
        universities_in_charge, 
        validity, 
        image_url
      FROM public.staff_card
      ORDER BY id ASC
    `)

    return (records || []).map((card) => ({
      ...card,
      universities_in_charge: card.universities_in_charge || [],
      image_url: resolveImageUrl(card),
    }))
  } catch (error) {
    console.error('Error in getAllStaffCards:', error)
    throw error
  }
}

export async function getStaffCardById(id: string): Promise<StaffCard | null> {
  try {
    const trimmedId = id.trim().toUpperCase()
    const records = await prisma.$queryRawUnsafe<StaffCard[]>(
      `
      SELECT 
        id, 
        first_name, 
        last_name, 
        position, 
        department, 
        work_field, 
        universities_in_charge, 
        validity, 
        image_url
      FROM public.staff_card
      WHERE UPPER(TRIM(id)) = UPPER(TRIM($1))
      LIMIT 1
    `,
      trimmedId
    )

    if (!records || records.length === 0) {
      return null
    }

    const card = records[0]
    return {
      ...card,
      universities_in_charge: card.universities_in_charge || [],
      image_url: resolveImageUrl(card),
    }
  } catch (error) {
    console.error(`Error in getStaffCardById for ${id}:`, error)
    throw error
  }
}

export async function generateNextStaffId(): Promise<string> {
  const currentYear = new Date().getFullYear()
  const yearPrefix = `GBUR-${currentYear}-`

  try {
    const records = await prisma.$queryRawUnsafe<{ id: string }[]>(`
      SELECT id FROM public.staff_card ORDER BY id DESC
    `)

    let maxNum = 0
    for (const r of records || []) {
      const match = r.id.match(/^GBUR-\d{4}-(\d+)$/)
      if (match) {
        const num = parseInt(match[1], 10)
        if (num > maxNum) maxNum = num
      }
    }

    const nextNum = maxNum + 1
    const padded = String(nextNum).padStart(3, '0')
    return `${yearPrefix}${padded}`
  } catch {
    return `${yearPrefix}001`
  }
}

export async function createStaffCard(data: StaffCardInput): Promise<StaffCard> {
  const finalId = data.id && data.id.trim() && data.id !== 'Auto-Generated on Save' && data.id !== 'AUTO'
    ? data.id.trim().toUpperCase()
    : await generateNextStaffId()

  const universities = Array.isArray(data.universities_in_charge)
    ? data.universities_in_charge
    : []

  const validityDate = data.validity ? new Date(data.validity).toISOString().split('T')[0] : null
  const imageUrl = data.image_url ? data.image_url.trim() : null

  await prisma.$executeRawUnsafe(
    `
    INSERT INTO public.staff_card (
      id, first_name, last_name, position, department, work_field, universities_in_charge, validity, image_url
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8::DATE, $9
    )
    ON CONFLICT (id) DO UPDATE SET
      first_name = EXCLUDED.first_name,
      last_name = EXCLUDED.last_name,
      position = EXCLUDED.position,
      department = EXCLUDED.department,
      work_field = EXCLUDED.work_field,
      universities_in_charge = EXCLUDED.universities_in_charge,
      validity = EXCLUDED.validity,
      image_url = EXCLUDED.image_url
  `,
    finalId,
    data.first_name.trim(),
    data.last_name.trim(),
    data.position?.trim() || 'Campus Staff',
    data.department?.trim() || 'Students Ministry',
    data.work_field?.trim() || 'GBUR Head Office',
    universities,
    validityDate,
    imageUrl
  )

  const created = await getStaffCardById(finalId)
  if (!created) {
    throw new Error('Failed to retrieve newly created staff card')
  }
  return created
}

export async function deleteStaffCard(id: string): Promise<boolean> {
  try {
    await prisma.$executeRawUnsafe(
      `DELETE FROM public.staff_card WHERE UPPER(TRIM(id)) = UPPER(TRIM($1))`,
      id
    )
    return true
  } catch (error) {
    console.error('Error deleting staff card:', error)
    return false
  }
}
