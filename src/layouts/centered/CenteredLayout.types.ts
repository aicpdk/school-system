import { ReactElement } from 'react';
import { CenteredLayoutContent } from './CenteredLayout.styled';

export interface ICenteredLayoutProps {
  children: ReactElement<typeof CenteredLayoutContent>;
}
