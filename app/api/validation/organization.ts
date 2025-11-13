import { z } from 'zod'

// Region validation schema
export const regionSchema = z.object({
  name: z.string().min(1, 'Region name is required').max(255, 'Region name is too long'),
})

// University validation schema
export const universitySchema = z.object({
  name: z.string().min(1, 'University name is required').max(255, 'University name is too long'),
  regionId: z.number().int().positive('Region ID must be a positive integer'),
})

// SmallGroup validation schema
export const smallGroupSchema = z.object({
  name: z.string().min(1, 'Small group name is required').max(255, 'Small group name is too long'),
  type: z.enum(['student', 'graduate']).default('student'),
  province: z
    .preprocess(
      (val) => (val === '' || val === null || val === undefined ? null : val),
      z.union([z.string().max(255), z.null()])
    )
    .optional()
    .nullable(),
  district: z
    .preprocess(
      (val) => (val === '' || val === null || val === undefined ? null : val),
      z.union([z.string().max(255), z.null()])
    )
    .optional()
    .nullable(),
  sector: z
    .preprocess(
      (val) => (val === '' || val === null || val === undefined ? null : val),
      z.union([z.string().max(255), z.null()])
    )
    .optional()
    .nullable(),
  address: z
    .preprocess(
      (val) => (val === '' || val === null || val === undefined ? null : val),
      z.union([z.string().max(500), z.null()])
    )
    .optional()
    .nullable(),
  cellLeaderName: z
    .preprocess(
      (val) => (val === '' || val === null || val === undefined ? null : val),
      z.union([z.string().max(255), z.null()])
    )
    .optional()
    .nullable(),
  WhatappNumber: z
    .preprocess(
      (val) => (val === '' || val === null || val === undefined ? null : val),
      z.union([z.string().max(50), z.null()])
    )
    .optional()
    .nullable(),
})

// RegionalStaff validation schema
export const regionalStaffSchema = z.object({
  regionId: z.number().int().positive('Region ID must be a positive integer'),
  name: z.string().min(1, 'Name is required').max(255, 'Name is too long'),
  phone: z
    .preprocess(
      (val) => (val === '' || val === null || val === undefined ? null : val),
      z.union([z.string().max(50), z.null()])
    )
    .optional()
    .nullable(),
  WhatappNumber: z
    .preprocess(
      (val) => (val === '' || val === null || val === undefined ? null : val),
      z.union([z.string().max(50), z.null()])
    )
    .optional()
    .nullable(),
})

