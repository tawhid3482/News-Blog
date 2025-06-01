/* eslint-disable @typescript-eslint/no-explicit-any */
// src/utils/authOptions.ts
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import axios from "axios";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        try {
          const { data } = await axios.post(
            "https://news-blog-server-production-ba38.up.railway.app/api/s1/auth/social-login",
            {
              name: user?.name,
              email: user?.email,
              profilePhoto: user?.image,
              gender: "OTHER",
            },
            {
              withCredentials: true,
            }
          );

          // Don't overwrite token — just add new properties
          token.accessToken = data.token;
          token.refreshToken = data.refreshToken;
          token.userData = data.data;

          // ⚠️ Warning: storeUserInfo should only be used on **client side**
          // Don't use this on server callback like here
          // storeUserInfo({ accessToken: data.token });
        } catch (err: any) {
          console.error("JWT login error:", err.response?.data || err.message);
        }
      }
      return token;
    },

    async session({ session, token }) {
      (session as any).accessToken = token.accessToken;
      (session as any).refreshToken = token.refreshToken;
      session.user = token.userData as typeof session.user;
      return session;
    },
  },
};
