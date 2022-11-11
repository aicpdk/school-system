import styled from 'styled-components';
import { themePaddingSelector } from '../../../config/theme';
import { IStyledListProps } from './list.types';

export const ListContainer = styled.div<IStyledListProps>`
  display: flex;
  flex-direction: ${(props) => props.direction};
  gap: ${(props) => themePaddingSelector(props.gap)(props)};
`;
