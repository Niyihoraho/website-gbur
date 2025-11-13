import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { subscriptionSchema } from '@/app/api/validation/subscription'

// POST /api/subscribe - Create a new subscription
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = subscriptionSchema.parse(body)

    // Check if email already exists
    const existingSubscription = await prisma.subscription.findUnique({
      where: { email: validatedData.email },
    })

    if (existingSubscription) {
      // If subscription exists but is inactive, reactivate it
      if (!existingSubscription.isActive) {
        const reactivated = await prisma.subscription.update({
          where: { email: validatedData.email },
          data: {
            firstName: validatedData.firstName,
            lastName: validatedData.lastName,
            isActive: true,
            subscribedAt: new Date(),
            unsubscribedAt: null,
          },
        })
        return NextResponse.json(
          { 
            message: 'Subscription reactivated successfully',
            subscription: reactivated 
          },
          { status: 200 }
        )
      }
      
      // If already active, return success without creating duplicate
      return NextResponse.json(
        { 
          message: 'You are already subscribed to our newsletter',
          subscription: existingSubscription 
        },
        { status: 200 }
      )
    }

    // Create new subscription
    const subscription = await prisma.subscription.create({
      data: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        isActive: true,
        subscribedAt: new Date(),
      },
    })

    return NextResponse.json(
      { 
        message: 'Subscription created successfully',
        subscription 
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error creating subscription:', error)
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
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to create subscription', 
        message: error.message 
      },
      { status: 500 }
    )
  }
}


