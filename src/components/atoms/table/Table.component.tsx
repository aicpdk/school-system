import { ITableFooterProps, ITableProps, ITableSearchProps } from './Table.types';
import { Table as StyledTable, Column, DataCell, Row, TBody, THead, TablePaginationContainer, TableInputContainer, TableInput } from './Table.styled';
import { Button } from '../button';
import { Icon } from '../icon';
import { IconEnum } from '../icon/icon.types';
import { theme } from '../../../config/theme';

export const Table = ({ children }: ITableProps) => {
  return <StyledTable>{children}</StyledTable>;
};

export const TableSearch: React.FC<ITableSearchProps> = ({ value, onChange }) => {
  return (
    <TableInputContainer>
      <TableInput placeholder="Search..." width={'100%'} value={value} onChange={onChange} />
    </TableInputContainer>
  );
};

export const TablePagination: React.FC<ITableFooterProps> = ({ isNextDisabled, isPrevDisabled, onNext, onPrev }) => {
  return (
    <TablePaginationContainer>
      <Button disabled={isPrevDisabled} variant="text" onClick={onPrev}>
        <Icon name={IconEnum.ArrowLeft} disabled={isPrevDisabled} color={theme.colors.primary500} size={20} />
      </Button>
      <Button disabled={isNextDisabled} variant="text" onClick={onNext}>
        <Icon name={IconEnum.ArrowRight} disabled={isNextDisabled} color={theme.colors.primary500} size={20} />
      </Button>
    </TablePaginationContainer>
  );
};

export const Th = Column;
export const Td = DataCell;
export const Tr = Row;
export const Tbody = TBody;
export const Thead = THead;
