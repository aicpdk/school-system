import { useQuery } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { BasicContentLayout, BasicHeaderLayout, BasicLayout } from '../../layouts/basic';
import { withPageSessionMiddleware } from '../../middlewares/PageSessionMiddleware';
import { SchoolClientService } from '../../services/app/school.service';
import { Text } from '../../components/atoms/text';
import { Surface } from '../../components/atoms/surface';

export const SchoolPage = () => {
  const schoolClientService = new SchoolClientService();

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['people'],
    queryFn: () => schoolClientService.getAll(),
  });

  console.log(data);

  return (
    <BasicLayout>
      <BasicHeaderLayout>
        <Text size="xLarge" weight="bolder">
          Schools
        </Text>
      </BasicHeaderLayout>
      <BasicContentLayout flexDirection="column" gap={2}>
        <Surface shadow="low" padding={2} fill={false}>
          <Text size="xLarge" weight="bolder">
            Schools
          </Text>
        </Surface>
      </BasicContentLayout>
    </BasicLayout>
  );
};

export default SchoolPage;

const serverSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = req.session;

  return {
    props: {},
  };
};
export const getServerSideProps = withPageSessionMiddleware(serverSideProps);
