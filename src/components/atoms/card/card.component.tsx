import { ICardProps } from './card.types';
import * as Styled from './card.styled';

export const Card: React.FC<ICardProps> = ({ children }) => {
  return <Styled.CardContainer>{children}</Styled.CardContainer>;
};

export const CardItem = Styled.CardItem;
