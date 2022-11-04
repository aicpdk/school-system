import { IInputGroupProps } from './Input.types';
import * as Styled from './Input.styled';

export const InputGroup = ({ children }: IInputGroupProps) => {
  return <Styled.Container>{children}</Styled.Container>;
};

export const InputField = Styled.Input;
export const InputLabel = Styled.Label;
export const Description = Styled.Description;
