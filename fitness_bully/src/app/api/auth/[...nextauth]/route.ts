// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getUserID } from "../../db/Users/UserHelpers";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!
    }),
  ],
  callbacks: {

    async session({ session, token }) {
      // This runs every time `useSession()` or getSession() is called
      //console.log(session)
      if (token?.email) {
        const result = await getUserID(token.email);
        console.log(`result `)
        console.log(result?.User)
        session.user.user_id= result?.User; // Add custom ID to session
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // REQUIRED for App Router
});



export { handler as GET, handler as POST };
