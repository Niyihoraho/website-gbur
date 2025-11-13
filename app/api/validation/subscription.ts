import { z } from 'zod'

// Subscription validation schema
export const subscriptionSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(255, 'First name is too long'),
  lastName: z.string().min(1, 'Last name is required').max(255, 'Last name is too long'),
  email: z.string().email('Please enter a valid email address').max(255, 'Email is too long'),
})

export type SubscriptionInput = z.infer<typeof subscriptionSchema>


