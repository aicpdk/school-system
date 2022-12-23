import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

export const WithPageProtection =
  (handler: GetServerSideProps) =>
  async (context: GetServerSidePropsContext) => {
    const session = await getSession(context);

    console.log(session);

    if (!session) {
      return {
        redirect: {
          destination: "/api/auth/signin",
          permanent: true,
        },
      };
    }

    return handler(context);
  };
