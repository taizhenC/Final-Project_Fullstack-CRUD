import { ApiError } from './errors'

// Fallback image used when a campus is created/updated without an imageUrl
// (ARCHITECTURE.md §6 "Default images"). Swap for a hosted asset later.
export const DEFAULT_CAMPUS_IMAGE = 'https://placehold.co/600x400?text=Campus'

// Parse a route `:id` param into a positive integer, or throw a 400.
// Express 5 types params as `string | string[]`, so normalize first.
export function parseId(raw: string | string[], label = 'id'): number {
  const value = Array.isArray(raw) ? raw[0] : raw
  const id = Number(value)
  if (!Number.isInteger(id) || id <= 0) {
    throw new ApiError(400, `Invalid ${label}: must be a positive integer`)
  }
  return id
}
