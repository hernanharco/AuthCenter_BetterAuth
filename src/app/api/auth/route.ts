// src/app/api/auth/[...better-auth]/route.ts

import { auth } from "@/lib/auth";

// Las rutas GET y POST serán manejadas por la instancia de BetterAuth
export const GET = auth;
export const POST = auth;