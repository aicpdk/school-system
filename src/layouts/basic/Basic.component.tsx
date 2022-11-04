import { FunctionComponent } from 'react';
import * as Styled from './Basic.styled';
import { IBasicLayoutProps } from './Basic.types';

export const BasicLayout: FunctionComponent<IBasicLayoutProps> = ({ children }) => {
  return <Styled.Container>{children}</Styled.Container>;
};

export const BasicHeaderLayout = Styled.Header;
export const BasicContentLayout = Styled.Content;
export const BasicHeaderButtonLayout = Styled.HeaderButtons;
