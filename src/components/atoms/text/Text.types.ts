import { IColor, IFontSize, IFontWeight } from '../../../interfaces/ITheme';

export interface ITextStyledProps {
  width?: 'full';
  size: keyof IFontSize;
  weight: keyof IFontWeight;
  color: keyof IColor;
  children?: string;
}

export interface ITextProps {
  width?: 'full';
  size?: keyof IFontSize;
  weight?: keyof IFontWeight;
  color?: keyof IColor;
  children?: string;
}
