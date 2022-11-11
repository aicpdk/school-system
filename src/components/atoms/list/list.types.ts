import React from 'react';
import { IPadding } from '../../../interfaces/ITheme';

export interface IStyledListProps {
  direction: 'horizontal' | 'vertical';
  gap: keyof IPadding;
}

export interface IListProps<T> extends IStyledListProps {
  data: T[];
  renderer: (data: T, index: number) => React.ReactNode;
}
