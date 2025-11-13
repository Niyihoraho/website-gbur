import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { contactMessageSchema, mapSubjectToEnum } from '@/app/api/validation/contact'
import { MessageSubject } from '@prisma/client'

// POST /api/contact - Create a new contact message
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Map form subject to enum value
    const mappedSubject = mapSubjectToEnum(body.subject)
    
    // Prepare data with mapped subject
    const dataToValidate = {
      ...body,
      subject: mappedSubject,
    }
    
    const validatedData = contactMessageSchema.parse(dataToValidate)

    // Create new message
    const message = await prisma.message.create({
      data: {
        fullName: validatedData.fullName,
        email: validatedData.email,
        phoneNumber: validatedData.phoneNumber || null,
        subject: validatedData.subject as MessageSubject,
        message: validatedData.message,
        status: 'unread',
      },
    })

    return NextResponse.json(
      { 
        message: 'Contact message sent successfully',
        id: message.id 
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error creating contact message:', error)
    console.error('Error details:', JSON.stringify(error, null, 2))
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: error.errors 
        },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to send message', 
        message: error.message 
      },
      { status: 500 }
    )
  }
}


