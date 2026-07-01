import type { RequestHandler } from 'express'
import type { ZodTypeAny } from 'zod'
import { ApiError } from '../lib/errors'

// Validate req.body against a zod schema. On success, replaces req.body with the
// parsed value (trimmed, with unknown keys stripped). On failure, throws a 400
// carrying the field-level details.
export function validateBody(schema: ZodTypeAny): RequestHandler {
  return (req, _res, next) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      next(new ApiError(400, 'Validation failed', result.error.flatten()))
      return
    }
    req.body = result.data
    next()
  }
}
