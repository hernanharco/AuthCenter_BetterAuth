import { PrismaClient } from "@prisma/client";

// Evita crear múltiples instancias en desarrollo
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["warn", "error"], // opcional, para debug
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
