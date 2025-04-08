// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!
    }),
  ],
  callbacks: {
    session({ session, token, user }) {
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // REQUIRED for App Router
});

export { handler as GET, handler as POST };
