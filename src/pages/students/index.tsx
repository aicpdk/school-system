import { GetServerSideProps } from 'next';
import { withPageSessionMiddleware } from '../../middlewares/PageSessionMiddleware';

export const Students = () => {
  return <div>Students</div>;
};

export default Students;

const serverSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = req.session;

  return {
    props: {},
  };
};
export const getServerSideProps = withPageSessionMiddleware(serverSideProps);
