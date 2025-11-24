import createAuthInstance from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";

// Provider de ejemplo: Google
import Google from "better-auth/providers/google";

export const auth = betterAuth({
  appName: "studioautcenter",

  // Conecta a la base de datos
  database: prismaAdapter(prisma),

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    jwt: true,
    expiration: 60 * 60 * 24 * 30, // 30 días
  },
});
