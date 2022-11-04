import { ReactElement } from 'react';
import { IPadding } from '../../interfaces/ITheme';
import { Content, Header } from './Basic.styled';

export interface IBasicLayoutContentProps {
  flexDirection?: 'row' | 'column';
  gap?: keyof IPadding;
}

export interface IBasicLayoutProps {
  children: Array<ReactElement<typeof Content | typeof Header>>;
}
