import type { ErrorRequestHandler, RequestHandler } from 'express'
import { Prisma } from '@prisma/client'
import { ZodError } from 'zod'
import { ApiError } from '../lib/errors'

// Fallback for any route that didn't match.
export const notFoundHandler: RequestHandler = (req, res) => {
  res.status(404).json({ error: `Not found: ${req.method} ${req.originalUrl}` })
}

// Central error handler — must keep all four args so Express treats it as one.
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ApiError) {
    res
      .status(err.status)
      .json({ error: err.message, ...(err.details ? { details: err.details } : {}) })
    return
  }

  if (err instanceof ZodError) {
    res.status(400).json({ error: 'Validation failed', details: err.flatten() })
    return
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // P2025: record required for update/delete was not found.
    if (err.code === 'P2025') {
      res.status(404).json({ error: 'Resource not found' })
      return
    }
    // P2003: foreign-key constraint failed (e.g. campusId references nothing).
    if (err.code === 'P2003') {
      res.status(400).json({ error: 'Invalid reference: related record does not exist' })
      return
    }
  }

  console.error('Unhandled error:', err)
  res.status(500).json({ error: 'Internal server error' })
}
