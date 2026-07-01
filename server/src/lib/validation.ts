import { z } from 'zod'

const requiredText = (label: string) => z.string().trim().min(1, `${label} is required`)

// imageUrl is optional; an empty string is allowed (the route substitutes the
// default image), otherwise it must be a valid URL.
const optionalImageUrl = z
  .union([z.literal(''), z.string().trim().url('imageUrl must be a valid URL')])
  .optional()

// ---- Campus -----------------------------------------------------------------

export const campusCreateSchema = z.object({
  name: requiredText('name'),
  address: requiredText('address'),
  description: requiredText('description'),
  imageUrl: optionalImageUrl,
})

// PUT is treated as a partial update: any subset of fields, each validated if present.
export const campusUpdateSchema = campusCreateSchema.partial()

// ---- Student ----------------------------------------------------------------

export const studentCreateSchema = z.object({
  firstName: requiredText('firstName'),
  lastName: requiredText('lastName'),
  email: z.string().trim().email('email must be a valid email address'),
  gpa: z.number().min(0, 'gpa must be between 0 and 4').max(4, 'gpa must be between 0 and 4'),
  // null = unenrolled; omitted = unchanged (on update) / unenrolled (on create).
  campusId: z.number().int().positive().nullable().optional(),
})

export const studentUpdateSchema = studentCreateSchema.partial()

export type CampusCreateInput = z.infer<typeof campusCreateSchema>
export type CampusUpdateInput = z.infer<typeof campusUpdateSchema>
export type StudentCreateInput = z.infer<typeof studentCreateSchema>
export type StudentUpdateInput = z.infer<typeof studentUpdateSchema>
