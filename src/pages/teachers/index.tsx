import { GetServerSideProps } from 'next';
import { withPageSessionMiddleware } from '../../middlewares/PageSessionMiddleware';

export const TeacherPage = () => {
  return <div>TeacherPage</div>;
};

export default TeacherPage;

const serverSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = req.session;

  return {
    props: {},
  };
};
export const getServerSideProps = withPageSessionMiddleware(serverSideProps);
