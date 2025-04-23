// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth({
  pages: {
    signIn: "/login", // redirects if not signed in
  },
  callbacks: {
    authorized({ token }) {
      // Only allow access if token exists (i.e. the user is signed in)
      return !!token;
    },
  },
});

export const config = {
  matcher: [
    "/((?!login|_next|api/auth).*)", // protects everything except login, _next, and auth routes
  ],
};
