import React, { ReactElement } from 'react';
import { Column, DataCell, Row, TBody, THead } from './Table.styled';

export interface ITableProps {
  children: ReactElement<typeof Column | typeof DataCell | typeof Row | typeof TBody | typeof THead>[];
}

export interface ITableSearchProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ITableFooterProps {
  isNextDisabled: boolean;
  isPrevDisabled: boolean;
  onNext: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onPrev: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
