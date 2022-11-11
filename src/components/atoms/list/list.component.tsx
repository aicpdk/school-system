import { IListProps } from './list.types';
import * as Styled from './list.styled';

export function List<T>({ data, direction = 'horizontal', gap = 2, renderer }: IListProps<T>): JSX.Element {
  return (
    <Styled.ListContainer direction={direction} gap={gap}>
      {data.map((data, index) => renderer(data, index))}
    </Styled.ListContainer>
  );
}
