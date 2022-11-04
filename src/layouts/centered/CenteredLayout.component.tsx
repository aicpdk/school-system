import { FunctionComponent } from 'react';
import { ICenteredLayoutProps } from './CenteredLayout.types';
import * as Styled from './CenteredLayout.styled';

export const CenteredLayout: FunctionComponent<ICenteredLayoutProps> = ({ children }) => {
  return <Styled.CenteredLayoutContainer>{children}</Styled.CenteredLayoutContainer>;
};

export const CenteredLayoutContent = Styled.CenteredLayoutContent;
