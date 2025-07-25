import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"


declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      [x: string]: ReactNode;
      user_id?: string | number;
      /** The user's postal address. */
      address: string;
    }
  }
}




declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    idToken?: string
    user_id: string| number;
  }
}