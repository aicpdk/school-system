import App, { type AppType } from "next/app";
import { type Session } from "next-auth";
import { getSession, SessionProvider } from "next-auth/react";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";

import { Navigation } from "../components/navigation";
import Head from "next/head";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>AICP</title>
        <meta name="description" content="AICP" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-screen w-screen flex-col overflow-hidden">
        <Navigation items={[]} />
        <main className="h-full w-full">
          <Component {...pageProps} />
        </main>
      </div>
    </SessionProvider>
  );
};

MyApp.getInitialProps = async (context: any) => {
  const appProps = await App.getInitialProps(context);
  const session = await getSession(context);

  return {
    ...appProps,
    session,
  };
};

export default trpc.withTRPC(MyApp);
