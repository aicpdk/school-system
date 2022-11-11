import NextNProgress from 'nextjs-progressbar';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, Container, Content } from './global.styles';
import 'animate.css';
import { theme } from '../config/theme';
import { IMenubarItem } from '../components/organisms/menubar/Menubar.types';
import { Menubar } from '../components/organisms/menubar';
import { getIronSession } from 'iron-session';
import App, { AppContext } from 'next/app';
import { sessionConfig } from '../config/session';
import { useRouter } from 'next/router';
import { IconEnum } from '../components/atoms/icon/icon.types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

// TODO: add the items to the database
const items: IMenubarItem[] = [
  {
    link: '/',
    text: 'Overview',
    icon: IconEnum.Dashboard,
  },
  {
    link: '/schools',
    text: 'Schools',
    icon: IconEnum.Department,
  },
  {
    link: '/people',
    text: 'People',
    icon: IconEnum.Employee,
  },
  {
    link: '/classes',
    text: 'Class',
    icon: IconEnum.Employee,
  },
  {
    link: '/api/auth/logout',
    text: 'Logout',
    icon: IconEnum.Employee,
  },
];

function MyApp({ Component, pageProps: { session, ...pageProps }, user }: any) {
  const isAuthenticated = !!user;
  const router = useRouter();

  const showMenu = isAuthenticated && router.route !== '/404';
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <NextNProgress color={theme.colors.primary500} showOnShallow={false} height={4} />
        <Container>
          {showMenu && <Menubar items={items} />}
          <Content>
            <Component {...pageProps} />
          </Content>
        </Container>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  if (appContext.ctx.req && appContext.ctx.res) {
    const { user } = await getIronSession(appContext.ctx.req, appContext.ctx.res, sessionConfig);

    return {
      ...appProps,
      user,
    };
  }

  // here as server-side's already given a valid user, client side should handle the case when navigating
  return appProps;
};

export default MyApp;
