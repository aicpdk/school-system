import NextNProgress from 'nextjs-progressbar';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, Container, Content } from '../styles/global.styles';
import 'animate.css';
import { theme } from '../config/theme';
import { IMenubarItem } from '../components/organisms/menubar/Menubar.types';
import { Menubar } from '../components/organisms/menubar';
import { getIronSession } from 'iron-session';
import App, { AppContext } from 'next/app';
import { sessionConfig } from '../config/session';
import { useRouter } from 'next/router';
import { IconEnum } from '../components/atoms/icon/icon.types';

// TODO: add the items to the database
const items: IMenubarItem[] = [
  {
    link: '/',
    text: 'Overview',
    icon: IconEnum.Dashboard,
  },
  {
    link: '/customers',
    text: 'Customers',
    icon: IconEnum.Customer,
  },
  {
    link: '/departments',
    text: 'Departments',
    icon: IconEnum.Department,
  },
  {
    link: '/invoices',
    text: 'Invoices',
    icon: IconEnum.Invoice,
  },
  {
    link: '/employees',
    text: 'Employees',
    icon: IconEnum.Employee,
  },
].sort((a, b) => {
  if (a.text > b.text) {
    return 1;
  }
  return -1;
});

function MyApp({ Component, pageProps: { session, ...pageProps }, user }: any) {
  const isAuthenticated = !!user;
  const router = useRouter();

  const showMenu = isAuthenticated && router.route !== '/404';
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <NextNProgress color={theme.colors.primary500} showOnShallow={false} height={4} />
      <Container>
        {showMenu && <Menubar items={items} />}
        <Content>
          <Component {...pageProps} />
        </Content>
      </Container>
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
