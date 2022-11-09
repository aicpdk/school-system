import { Person, RoleType } from '@prisma/client';
import { GetServerSideProps, NextPage } from 'next';
import { withPageSessionMiddleware } from '../../middlewares/PageSessionMiddleware';
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
  FilterFn,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { Table, TablePagination, TableSearch, Tbody, Td, Th, Thead, Tr } from '../../components/atoms/table';
import { useQuery } from '@tanstack/react-query';
import { Text } from '../../components/atoms/text';
import { PeopleClientService } from '../../services/app/people.service';
import { BasicContentLayout, BasicHeaderLayout, BasicLayout } from '../../layouts/basic';

import { rankItem } from '@tanstack/match-sorter-utils';
import { Tag } from '../../components/atoms/tag';
import { IPersonWithRoles } from '../../interfaces/IPerson';
import { IColor } from '../../interfaces/ITheme';

export const PeoplePage: NextPage = () => {
  const peopleClientService = new PeopleClientService();
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
    queryKey: ['people'],
    queryFn: () => peopleClientService.getPeople(),
  });

  const roleColors = new Map<RoleType, keyof IColor>();
  roleColors.set('ADMIN', 'error700');
  roleColors.set('TEACHER', 'primary500');
  roleColors.set('STUDENT', 'success800');

  const columns = useMemo(
    () => [
      columnHelper.accessor('firstname', {
        header: 'Firstname',
      }),
      columnHelper.accessor('roles', {
        header: 'Role',
        cell: ({ getValue }) =>
          getValue()?.map((value, index) => (
            <Tag color={roleColors.get(value)} key={index}>
              {value}
            </Tag>
          )),
      }),
      columnHelper.accessor('lastname', {
        header: 'Lastname',
      }),
      columnHelper.accessor('phone', {
        header: 'Phone',
        cell: ({ getValue }) => (getValue() ? <a href={`tlf:${getValue()?.replaceAll(' ', '').replaceAll('+', '00')}`}>{getValue()}</a> : 'null'),
      }),
      columnHelper.accessor('age', {
        header: 'Age',
        cell: ({ getValue }) => getValue()?.toString(),
      }),
    ],
    [columnHelper]
  );
  const people = useMemo(() => data, [data]);
  const table = useReactTable({
    data: people,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      globalFilter,
      pagination: {
        pageSize,
        pageIndex,
      },
    },
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: fuzzyFilter,
    autoResetPageIndex: true,
  });

  return (
    <BasicLayout>
      <BasicHeaderLayout>
        <Text size="xLarge" weight="bolder">
          People
        </Text>
      </BasicHeaderLayout>
      <BasicContentLayout>
        <TableSearch value={globalFilter} onChange={(event) => setGlobalFilter(event.target.value)} />
        <Table>
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell, index) => (
                  <Td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
        <TablePagination
          isNextDisabled={!table.getCanNextPage()}
          isPrevDisabled={!table.getCanPreviousPage()}
          onNext={() => table.nextPage()}
          onPrev={() => table.previousPage()}
        />
      </BasicContentLayout>
    </BasicLayout>
  );
};

export default PeoplePage;

const serverSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = req.session;

  return {
    props: {},
  };
};
export const getServerSideProps = withPageSessionMiddleware(serverSideProps);
