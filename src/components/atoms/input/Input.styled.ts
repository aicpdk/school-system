import styled from 'styled-components';
import { getHoverColor, themeBorderRadiusSelector, themeColorSelector, themeFontSizeSelector, themePaddingSelector } from '../../../config/theme';
import { IInputFieldProps } from './Input.types';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${themePaddingSelector(2)};
`;

export const Input = styled.input<IInputFieldProps>`
  border-width: 1px;
  border-style: solid;

  border-radius: ${themeBorderRadiusSelector};
  font-size: ${themeFontSizeSelector('regular')};
  padding: ${themePaddingSelector(2)};
  color: ${themeColorSelector('text')};

  &:focus {
    border-color: ${themeColorSelector('primary')};
  }
`;

export const Description = styled.div`
  font-size: ${themeFontSizeSelector('small')};
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${themePaddingSelector(4)};
`;

export const Label = styled.label`
  font-size: ${themeFontSizeSelector('large')};
  color: ${themeColorSelector('text')};
`;
