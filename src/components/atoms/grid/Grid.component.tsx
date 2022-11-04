import styled from 'styled-components';
import { themePaddingSelector } from '../../../config/theme';
import { IGridItem } from './Grid.types';

const Wrapper = styled.div`
  width: calc(100% - ${themePaddingSelector(2)} * 2);
  height: calc(100% - ${themePaddingSelector(2)} * 2);

  padding: ${themePaddingSelector(2)};

  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
  gap: ${themePaddingSelector(2)};
`;

const Item = styled.article<IGridItem>`
  grid-column: ${(props) => props.gridColumn};
  grid-row: ${(props) => props.gridRow};
`;

export const Grid = {
  Wrapper,
  Item,
};
