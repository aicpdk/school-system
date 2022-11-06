import styled from 'styled-components';
import { themeColorSelector, themeFontSizeSelector } from '../../../config/theme';

export const Link = styled.a`
  font-size: ${themeFontSizeSelector('regular')};
  text-decoration: none;
  color: ${themeColorSelector('gray50')};
`;
