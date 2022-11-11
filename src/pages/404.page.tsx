import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { withPageSessionMiddleware } from '../middlewares/PageSessionMiddleware';

const Home: NextPage = () => {
  return (
    <div>
      <div>this page does not exist</div>
    </div>
  );
};

export default Home;
