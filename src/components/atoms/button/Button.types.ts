import { MouseEventHandler, ReactElement } from 'react';
import { IIconProps } from '../icon/icon.types';

export interface IButtonStyledProps {
  variant?: 'text' | 'ghost' | 'filled';
  width?: 'fit' | 'full';
  disabled?: boolean;
}

export interface IButtonProps extends IButtonStyledProps {
  children?: string | ReactElement<IIconProps>;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
