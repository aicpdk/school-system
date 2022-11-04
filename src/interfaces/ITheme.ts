export interface ITheme {
  colors: IColor;
  borderRadius: string;
  padding: IPadding;
  font: IFont;
  shadow: IShadow;
}

export interface IShadow {
  low: string;
  medium: string;
  high: string;
}

type colorType = 'primary' | 'error' | 'warning' | 'gray' | 'success';
type colorGradient = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | 'A100' | 'A200' | 'A400' | 'A700';

type IColorKey = `${colorType}${colorGradient}`;

export type IColor = {
  [key in IColorKey]: string;
};

export interface IPadding {
  2: '8px';
  4: '16px';
  8: '32px';
}

export interface IFont {
  weight: IFontWeight;
  size: IFontSize;
}

export interface IFontWeight {
  normal: 'normal';
  bold: 'bold';
  bolder: 'bolder';
}

export interface IFontSize {
  small: '0.833rem';
  regular: '1rem';
  large: '1.2rem';
  xLarge: '1.44rem';
  xxLarge: '2.074rem';
}
