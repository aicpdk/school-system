import type { NextPage } from "next";
import Head from "next/head";
import { WithPageProtection } from "../server/middlewares/WithPageProtection";

const Home: NextPage = () => {
  return <main className=""></main>;
};

export default Home;

export const getServerSideProps = WithPageProtection(async (context) => {
  return {
    props: {},
  };
});
