import type { NextPage } from "next";
import { WithPageProtection } from "../../server/middlewares/WithPageProtection";
import type { InferGetServerSideProps } from "../../types/next-types";

export const ClassPage: NextPage<
  InferGetServerSideProps<typeof getServerSideProps>
> = () => {
  return <div>all classes</div>;
};

export default ClassPage;

export const getServerSideProps = WithPageProtection(async () => {
  return {
    props: {},
  };
});
