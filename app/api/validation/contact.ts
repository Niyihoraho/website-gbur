import { z } from 'zod'

// Contact message validation schema
export const contactMessageSchema = z.object({
  fullName: z.string().min(1, 'Full name is required').max(255, 'Full name is too long'),
  email: z.string().email('Please enter a valid email address').max(255, 'Email is too long'),
  phoneNumber: z.string().max(50, 'Phone number is too long').optional().nullable(),
  subject: z.enum(['general', 'inquiry', 'support', 'feedback', 'partnership', 'other'], {
    errorMap: () => ({ message: 'Please select a valid subject' }),
  }),
  message: z.string().min(10, 'Message must be at least 10 characters long'),
})

export type ContactMessageInput = z.infer<typeof contactMessageSchema>

// Map form subject values to database enum values
export const mapSubjectToEnum = (formSubject: string): 'general' | 'inquiry' | 'support' | 'feedback' | 'partnership' | 'other' => {
  const mapping: Record<string, 'general' | 'inquiry' | 'support' | 'feedback' | 'partnership' | 'other'> = {
    general: 'general',
    ministry: 'inquiry', // Map "ministry" to "inquiry"
    partnership: 'partnership',
    donation: 'general', // Map "donation" to "general"
    campus: 'inquiry', // Map "campus" to "inquiry"
    other: 'other',
  }
  
  return mapping[formSubject] || 'other'
}


