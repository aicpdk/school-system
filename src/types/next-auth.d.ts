import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User extends DefaultSession["user"] {
    accountId: string;
    personId: string;
  }

  interface Session {
    user?: {
      accountId: string;
      personId: string;
    } & DefaultSession["user"];
  }
}
