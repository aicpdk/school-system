import { ITableProps } from './Table.types';
import * as Styled from './Table.styled';
import { useMemo } from 'react';

export function Table<T>({ columns, data, onClick, spacing }: ITableProps<T>) {
  const columnRow = (
    <Styled.Columns>
      <Styled.Row data-type="head">
        {columns.map((column, index) => (
          <Styled.Column width={spacing[column] as string} key={`column_${index}`}>
            {column.toString()?.at(0)?.toUpperCase()}
            {column.toString()?.slice(1)}
          </Styled.Column>
        ))}
      </Styled.Row>
    </Styled.Columns>
  );

  const dataRows = data.map((data: any, rowIndex: number) => {
    const columnRows = columns.map((value, cellIndex) => {
      return <Styled.DataCell key={`datarow_${rowIndex}_datacell_index_${cellIndex}`}>{data[value]}</Styled.DataCell>;
    });

    return (
      <Styled.Row onClick={() => onClick(data, rowIndex)} key={`datarow_${rowIndex}`}>
        {columnRows}
      </Styled.Row>
    );
  });

  return (
    <Styled.Table>
      {columnRow}
      <Styled.Rows>{dataRows}</Styled.Rows>
    </Styled.Table>
  );
}

export const TableRow = Styled.Row;
export const TableCell = Styled.DataCell;
