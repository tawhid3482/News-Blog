/* eslint-disable @typescript-eslint/no-unused-vars */
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
    async jwt({ token, user, account, profile }) {
      // Runs on initial sign in
      if (account && user) {
        try {
          const { data } = await axios.post(
            "http://localhost:5000/api/s1/auth/social-login",
            {
              name: user.name,
              email: user.email,
              profilePhoto: user.image,
              gender: "OTHER",
              password: "pass123",
            }
          );

            console.log('backend response', data)


          token.backendToken = data.token;
          token.role = data.data.role;
          token.userId = data.data.id;
          token.name = data.data.name;
          token.email = data.data.email;
          token.profilePhoto = data.data.profilePhoto;
        } catch (err) {
          console.error("JWT login error:", err);
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.backendToken = token.backendToken as string;
        session.user.role = token.role as string;
        session.user.userId = token.userId as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.profilePhoto = token.profilePhoto as string;
      }

      return session;
    },
  },
};
