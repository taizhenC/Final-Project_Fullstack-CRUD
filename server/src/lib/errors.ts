import type { NextFunction, Request, RequestHandler, Response } from 'express'

// An error carrying an HTTP status code, thrown by routes/middleware and turned
// into a JSON response by the central error handler.
export class ApiError extends Error {
  status: number
  details?: unknown

  constructor(status: number, message: string, details?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.details = details
  }
}

// Wraps an async route handler so a rejected promise is forwarded to Express's
// error handler instead of crashing the process.
export function asyncHandler(handler: RequestHandler): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(handler(req, res, next)).catch(next)
  }
}
