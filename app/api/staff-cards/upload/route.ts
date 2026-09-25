import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

const MAX_FILE_SIZE = 15 * 1024 * 1024 // 15MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No image file provided' }, { status: 400 })
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file format. Only JPG, PNG, and WebP images are allowed.' },
        { status: 400 }
      )
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'Image exceeds maximum 15MB size limit' },
        { status: 400 }
      )
    }

    const cardsDir = join(process.cwd(), 'public', 'cards')
    if (!existsSync(cardsDir)) {
      await mkdir(cardsDir, { recursive: true })
    }

    const timestamp = Date.now()
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const filename = `staff_${timestamp}_${safeName}`
    const filepath = join(cardsDir, filename)

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filepath, buffer)

    return NextResponse.json({
      success: true,
      path: `/cards/${filename}`,
      filename,
    })
  } catch (error: any) {
    console.error('Error uploading staff photo:', error)
    return NextResponse.json(
      { error: 'Failed to upload photo', message: error.message },
      { status: 500 }
    )
  }
}
