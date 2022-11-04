import { IStatsListProps } from './StatsList.types';
import * as Styled from './StatsList.styled';

export const StatsList: React.FC<IStatsListProps> = ({ children }) => {
  return <Styled.Container>{children}</Styled.Container>;
};
