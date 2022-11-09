import styled from 'styled-components';
import {
  themeBorderRadiusSelector,
  themeColorSelector,
  themeFontSizeSelector,
  themeFontWeightSelector,
  themePaddingSelector,
} from '../../../config/theme';
import { IColor } from '../../../interfaces/ITheme';

export const Tag = styled.div<{ color: any }>`
  width: fit-content;
  padding: 4px 5px;
  background-color: ${(props) => themeColorSelector(props.color || 'primary400')(props)};
  color: ${themeColorSelector('gray50')};
  border-radius: ${themeBorderRadiusSelector};
  font-weight: ${themeFontWeightSelector('bold')};
  font-size: ${themeFontSizeSelector('small')};
`;
