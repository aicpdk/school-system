import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import * as Styled from '../../styles/login.styles';
import { Text } from '../../components/atoms/text';

import { withPageRedirectMiddleware } from '../../middlewares/PageRedirectMiddleware';
import * as Inputter from '../../components/atoms/input';
import { Button } from '../../components/atoms/button';
import { useFetch } from '../../hooks/useFetch';
import { BasicContentLayout, BasicLayout } from '../../layouts/basic';
import { CenteredLayout, CenteredLayoutContent } from '../../layouts/centered';

// TODO Manage error

const Home: NextPage = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [{ isLoading }, call] = useFetch('/api/auth/login');
  const router = useRouter();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    <CenteredLayout>
      <CenteredLayoutContent shadow="high" padding={8}>
        <BasicContentLayout>
          <Styled.Form
            action="/api/auth/login"
            method="POST"
            onSubmit={async (event) => {
              event.preventDefault();
              if (isLoading) return;
              const response = await call({
                data: credentials,
                method: 'POST',
              });
              if (response?.status === 200) {
                router.push('/');
              }
            }}
          >
            <Text size="xLarge">Login</Text>
            <Inputter.InputGroup>
              <Inputter.InputLabel>Username</Inputter.InputLabel>
              <Inputter.InputField name="username" onChange={handleChange} value={credentials.username} />
              {/* <Inputter.Description>this is a description</Inputter.Description> */}
            </Inputter.InputGroup>
            <Inputter.InputGroup>
              <Inputter.InputLabel>Password</Inputter.InputLabel>
              <Inputter.InputField name="password" type="password" onChange={handleChange} value={credentials.password} />
              {/* <Inputter.Description>this is a description</Inputter.Description> */}
            </Inputter.InputGroup>
            <Styled.Buttons>
              <Button isLoading={isLoading} width="full">
                Login
              </Button>
            </Styled.Buttons>
          </Styled.Form>
        </BasicContentLayout>
      </CenteredLayoutContent>
    </CenteredLayout>
  );
};

export default Home;

const serverSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};

export const getServerSideProps = withPageRedirectMiddleware(serverSideProps);
