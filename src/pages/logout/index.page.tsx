import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { withPageSessionMiddleware } from '../../middlewares/PageSessionMiddleware';
// TODO Manage error

const LogoutPage: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    const logout = async () => fetch('/api/auth/logout', { method: 'POST' });
    logout().then((res) => {
      router.push('/');
    });
  }, []);
  return <></>;
};

export default LogoutPage;

const serverSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};

export const getServerSideProps = withPageSessionMiddleware(serverSideProps);
