import styled from 'styled-components';
import { themePaddingSelector, themeShadowSelector } from '../../../config/theme';

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${themePaddingSelector(2)};
  box-shadow: ${themeShadowSelector('low')};
`;

export const CardItem = styled.div`
  width: 100%;
`;
