import NextAuth, { type NextAuthOptions, type User } from "next-auth";
import bcrypt from "bcrypt";
import { prisma } from "@db/client";
import CredentialProvider from "next-auth/providers/credentials";
console.log(CredentialProvider);

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  providers: [
    CredentialProvider({
      name: "Credentials",
      authorize: async (credentials): Promise<User> => {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: { username: credentials.username },
        });

        if (!user) {
          throw new Error("Username or Password does not exist");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("Username or Password does not exist");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
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
