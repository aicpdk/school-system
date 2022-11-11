import { ReactElement } from 'react';
import { CardItem } from './card.styled';

export interface ICardProps {
  children: ReactElement<typeof CardItem>[] | ReactElement<typeof CardItem>;
}
