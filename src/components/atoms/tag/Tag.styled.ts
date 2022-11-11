import styled from 'styled-components';
import {
  themeBorderRadiusSelector,
  themeColorSelector,
  themeFontSizeSelector,
  themeFontWeightSelector,
  themePaddingSelector,
} from '../../../config/theme';

export const Tag = styled.div<{ color: any }>`
  width: fit-content;
  padding: 3px 4px;
  background-color: ${(props) => themeColorSelector(props.color || 'primary400')(props)};
  color: ${themeColorSelector('gray50')};
  border-radius: ${themeBorderRadiusSelector};
  font-weight: ${themeFontWeightSelector('bold')};
  font-size: ${themeFontSizeSelector('small')};
`;
