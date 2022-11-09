import { IButtonProps } from './Button.types';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import * as Styled from './Button.styled';
import { Loader } from '../loader';
import { theme } from '../../../config/theme';

export const Button = ({ children = 'Button', isLoading, variant = 'filled', width = 'fit', onClick, disabled = false }: IButtonProps) => {
  const loaderColors = {
    filled: theme.colors.gray50,
    ghost: theme.colors.primary500,
    text: theme.colors.primary500,
  };

  return (
    <Styled.Button disabled={disabled} onClick={onClick} variant={variant} width={width} type="submit">
      {isLoading ? <Loader color={loaderColors[variant]} /> : children}
    </Styled.Button>
  );
};
