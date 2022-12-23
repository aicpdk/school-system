import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import { prisma } from "../../../server/db/client";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  providers: [
    CredentialProvider({
      name: "Credentials",
      authorize: async (credentials) => {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const account = await prisma.account.findUnique({
          where: { username: credentials.username },
        });

        if (!account) {
          throw new Error("Username or Password does not exist");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          account.password
        );

        if (!isValid) {
          throw new Error("Username or Password does not exist");
        }

        const person = await prisma.person.findUnique({
          where: {
            id: account.personId,
          },
        });

        if (!person) throw new Error("Person not found");

        return {
          id: "",
          accountId: account.id,
          personId: person.id,
          name: person.name,
          email: person.email,
          image: person.image,
        };
      },
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      type: "credentials",
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 2 * 24 * 60 * 60, // 2 days
  },
  secret: process.env.NEXTAUTH_CREDENTIAL_SECRET,
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: ({ session, token }): any => {
      return {
        ...session,
        user: token.user,
      };
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

export default NextAuth(authOptions);
