import { z } from 'zod'

// Blog category validation schema
export const blogCategorySchema = z.object({
  name: z.string().min(1, 'Category name is required').max(255, 'Category name is too long'),
  slug: z.string().min(1, 'Slug is required').max(255, 'Slug is too long'),
  order: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
})

// Blog post validation schema
export const createBlogPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title is too long'),
  slug: z.string().min(1, 'Slug is required').max(255, 'Slug is too long'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().optional().nullable(),
  featuredImage: z
    .string()
    .refine(
      (val) => !val || val.startsWith('/') || val.startsWith('http://') || val.startsWith('https://'),
      'Image must be a valid URL or path starting with /'
    )
    .optional()
    .nullable(),
  categoryId: z.number().int().positive('Category ID must be a positive integer'),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  publishedAt: z.string().datetime().optional().nullable(),
})

export const updateBlogPostSchema = createBlogPostSchema.partial().extend({
  id: z.number().int().positive('ID must be a positive integer'),
})

export const blogPostQuerySchema = z
  .object({
    status: z.enum(['draft', 'published', 'archived']).optional(),
    categoryId: z.preprocess(
      (val) => (val === undefined || val === null || val === '' ? undefined : val),
      z.string().regex(/^\d+$/).transform(Number).optional()
    ),
    limit: z.preprocess(
      (val) => (val === undefined || val === null || val === '' ? undefined : val),
      z.string().regex(/^\d+$/).transform(Number).optional()
    ),
    offset: z.preprocess(
      (val) => (val === undefined || val === null || val === '' ? undefined : val),
      z.string().regex(/^\d+$/).transform(Number).optional()
    ),
  })
  .passthrough()

export type CreateBlogPostInput = z.infer<typeof createBlogPostSchema>
export type UpdateBlogPostInput = z.infer<typeof updateBlogPostSchema>
export type BlogPostQuery = z.infer<typeof blogPostQuerySchema>

