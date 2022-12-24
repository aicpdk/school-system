import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    accountId: string;
    personId: string;
    name: string;
    email: string;
    isVerified: boolean;
  }

  interface Session {
    user?: {
      accountId: string;
      personId: string;
    } & DefaultSession["user"];
  }
}
