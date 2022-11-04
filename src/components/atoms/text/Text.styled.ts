import styled from 'styled-components';
import { themeColorSelector, themeFontSizeSelector, themeFontWeightSelector } from '../../../config/theme';
import { ITextStyledProps } from './Text.types';

export const Text = styled.p<ITextStyledProps>`
  width: ${(props) => props.width === 'full' && '100%'};
  padding: 0;
  margin: 0;
  font-size: ${(props) => themeFontSizeSelector(props.size)(props)};
  font-weight: ${(props) => themeFontWeightSelector(props.weight)(props)};
  color: ${(props) => themeColorSelector(props.color)(props)};
`;
