import { GetServerSideProps } from 'next';
import { withPageSessionMiddleware } from '../../middlewares/PageSessionMiddleware';

export const SchoolPage = () => {
  return <div>SchoolPage</div>;
};

export default SchoolPage;

const serverSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = req.session;

  return {
    props: {},
  };
};
export const getServerSideProps = withPageSessionMiddleware(serverSideProps);
