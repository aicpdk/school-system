import { IColor } from '../../../interfaces/ITheme';

export interface ITagProps {
  children: any;
  color?: keyof IColor;
}
