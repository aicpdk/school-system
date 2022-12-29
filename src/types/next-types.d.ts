import { getServerSideProps } from "../pages";

type Protected = (context: any) => Promise<
  Promise<
    GetServerSidePropsResult<{
      [key: string]: any;
    }>
  >
>;

type Public = (context: any) => Promise<
  Promise<
    GetServerSidePropsResult<{
      [key: string]: any;
    }>
  >
>;

export type InferGetServerSideProps<T> = T extends Protected
  ? string
  : T extends Public
  ? number
  : never;

type getServerSidePropsType = typeof getServerSideProps;

type s = InferGetServerSideProps<typeof getServerSideProps>;
