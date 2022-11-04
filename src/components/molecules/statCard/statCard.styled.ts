import styled from 'styled-components';
import { themeColorSelector, themePaddingSelector } from '../../../config/theme';

export const Container = styled.div`
  width: calc(100% - ${themePaddingSelector(4)} * 2);
  height: calc(100% - ${themePaddingSelector(2)} * 2);
  padding: ${themePaddingSelector(2)} ${themePaddingSelector(4)};
  background-color: ${themeColorSelector('primary600')};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
