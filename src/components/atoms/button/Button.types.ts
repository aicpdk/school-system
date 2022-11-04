import { MouseEventHandler } from 'react';

export interface IButtonStyledProps {
  variant?: 'text' | 'ghost' | 'filled';
  width?: 'fit' | 'full';
}

export interface IButtonProps extends IButtonStyledProps {
  children?: string;
  isLoading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
