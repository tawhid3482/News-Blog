/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { DefaultSession, DefaultUser, JWT } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      userId: string;
      name: string;
      email: string;
      role: string;
      backendToken: string;
      profilePhoto?: string | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
    name: string;
    email: string;
    role: string;
    backendToken: string;
    profilePhoto?: string | null;
  }
}

