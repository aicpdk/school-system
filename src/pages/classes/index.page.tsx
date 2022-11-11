import { RoleType } from '@prisma/client';
import { GetServerSideProps, NextPage } from 'next';
import { withPageSessionMiddleware } from '../../middlewares/PageSessionMiddleware';
import * as Styled from './classes.styled';
import { createColumnHelper, FilterFn } from '@tanstack/react-table';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Text } from '../../components/atoms/text';
import { ClassClientService } from '../../services/app/class.service';
import { BasicContentLayout, BasicHeaderLayout, BasicLayout } from '../../layouts/basic';

import { rankItem } from '@tanstack/match-sorter-utils';
import { IPersonWithRoles } from '../../interfaces/IPerson';

interface IClassesPageProps {
  personId: string;
}

export const ClassesPage: NextPage<IClassesPageProps> = ({ personId }) => {
  const classClientService = new ClassClientService();
  const [globalFilter, setGlobalFilter] = useState('');
  const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 19 });
  const columnHelper = createColumnHelper<IPersonWithRoles>();

  const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value);

    // Store the itemRank info
    addMeta({
      itemRank,
    });

    // Return if the item should be filtered in/out
    return itemRank.passed;
  };

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['classes'],
    queryFn: () => classClientService.getAll(),
  });

  console.log(data);

  return (
    <BasicLayout>
      <BasicHeaderLayout>
        <Text size="xLarge" weight="bolder">
          Classes
        </Text>
      </BasicHeaderLayout>
      <BasicContentLayout></BasicContentLayout>
    </BasicLayout>
  );
};

export default ClassesPage;

const serverSideProps: GetServerSideProps<IClassesPageProps> = async ({ req }) => {
  return {
    props: {
      personId: req.session.person.personId,
    },
  };
};
export const getServerSideProps = withPageSessionMiddleware(serverSideProps);
