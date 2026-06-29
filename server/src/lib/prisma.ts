import { PrismaClient } from '@prisma/client'

// Shared PrismaClient singleton. Reused across hot reloads in dev so we don't
// open a new connection pool on every file change.
//
// NOTE (integration): this may overlap with the teammate's DB setup. If their
// schema package exports its own client, import that here and delete this file.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
