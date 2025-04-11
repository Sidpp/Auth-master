import { PrismaClient } from "@prisma/client";

declare global {
  // Extend the NodeJS global type with a prisma property to avoid redeclaration
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// The actual Prisma Client instance
export const db = globalThis.prisma || new PrismaClient();

// For hot reloading (e.g., in development), we store it on the global object
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}
