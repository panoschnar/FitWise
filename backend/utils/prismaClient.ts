// utils/prismaClient.ts
import { PrismaClient } from '@prisma/client'

declare global {
  // This prevents multiple instances of Prisma in development
  // (Next.js, nodemon, etc. re-import modules on reload)
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query', 'error', 'warn'], // optional: logs queries and errors
  })

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}
