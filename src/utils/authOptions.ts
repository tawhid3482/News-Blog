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
        const { data } = await axios.post("http://localhost:5000/api/s1/auth/social-login", {
          name: user.name,
          email: user.email,
          profilePhoto: user.image,
          gender: "OTHER",
          password: "pass123",
        });

        token.token = data.token; 
        token.data = data.data; 

      } catch (err) {
        console.error("JWT login error:", err);
      }
    }
    return token;
  },

  async session({ session, token }) {
    session.user = token.data as typeof session.user;
    session.token = token.token as typeof session.token;
    return session;
  },
},

};
