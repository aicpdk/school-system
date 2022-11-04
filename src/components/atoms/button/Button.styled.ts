import styled, { css } from 'styled-components';
import { getHoverColor, themeBorderRadiusSelector, themeColorSelector, themeFontSizeSelector, themePaddingSelector } from '../../../config/theme';
import { IButtonStyledProps } from './Button.types';

const filledVariant = css`
  background-color: ${themeColorSelector('primary500')};
  padding: ${themePaddingSelector(2)} ${themePaddingSelector(4)};
  border: none;
  color: ${themeColorSelector('gray50')};

  &:hover {
    background-color: ${(props) => getHoverColor(themeColorSelector('primary500')(props))};
  }
`;

const ghostVariant = css`
  background-color: transparent;
  padding: ${themePaddingSelector(2)} ${themePaddingSelector(4)};
  border: 1px solid ${themeColorSelector('primary500')};
  color: ${themeColorSelector('primary500')};

  &:hover {
    color: ${(props) => getHoverColor(themeColorSelector('primary500')(props))};
    border-color: ${(props) => getHoverColor(themeColorSelector('primary500')(props))};
  }
`;

const textVariant = css`
  background-color: ${themeColorSelector('primary500')};
  border: none;
  color: ${themeColorSelector('primary500')};
  padding: none;

  &:hover {
    color: ${(props) => getHoverColor(themeColorSelector('primary500')(props))};
  }
`;

const variantSelector = (props: IButtonStyledProps) => {
  switch (props.variant) {
    case 'text':
      return textVariant;
    case 'ghost':
      return ghostVariant;
    default:
      return filledVariant;
  }
};

export const Button = styled.button<IButtonStyledProps>`
  width: ${(props) => (props.width === 'full' ? '100%' : 'fit-content')};
  border-radius: ${themeBorderRadiusSelector};
  font-size: ${themeFontSizeSelector('regular')};
  transition: all 0.3s ease-in-out;
  ${variantSelector}

  &:hover {
    cursor: pointer;
  }
`;
