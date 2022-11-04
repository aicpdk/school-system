import styled from 'styled-components';
import { themeBorderRadiusSelector, themeColorSelector } from '../../../config/theme';

export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  min-height: 120px;
  overflow: hidden;
  gap: 1px;
  background-color: ${themeColorSelector('gray200')};
  border-radius: ${themeBorderRadiusSelector};
`;
