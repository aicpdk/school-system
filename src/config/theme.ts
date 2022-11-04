import { IColor, IFontSize, IFontWeight, IPadding, IShadow, ITheme } from '../interfaces/ITheme';
import tinyColor from 'tinycolor2';

const colors: IColor = {
  primary50: '#E1ECFF',
  primary100: '#BCCCFF',
  primary200: '#90A7F2',
  primary300: '#6686E2',
  primary400: '#416BD6',
  primary500: '#0052CC',
  primary600: '#004AC3',
  primary700: '#0040B5',
  primary800: '#0036A9',
  primary900: '#002292',
  primaryA100: '#739FFF',
  primaryA200: '#006EFF',
  primaryA400: '#005DFF',
  primaryA700: '#0051FF',

  error50: '#F3C5CA',
  error100: '#F0A7AC',
  error200: '#DB7471',
  error300: '#CF4D4B',
  error400: '#D62625',
  error500: '#D60000',
  error600: '#C70004',
  error700: '#B50000',
  error800: '#A90000',
  error900: '#9B0000',
  errorA100: '#9B0000',
  errorA200: '#9B0000',
  errorA400: '#9B0000',
  errorA700: '#9B0000',

  warning50: '#FFFFD9',
  warning100: '#FFFFB7',
  warning200: '#FFFF8C',
  warning300: '#FFFF65',
  warning400: '#FFFF3F',
  warning500: '#FFFF01',
  warning600: '#FFEB00',
  warning700: '#FFD200',
  warning800: '#FFB900',
  warning900: '#FF8B00',
  warningA100: '#FFFF7E',
  warningA200: '#FAFF00',
  warningA400: '#FDFF00',
  warningA700: '#FFEA00',

  success50: '#E3FCE3',
  success100: '#C6EFC4',
  success200: '#A3DC9E',
  success300: '#7FCD79',
  success400: '#66C15F',
  success500: '#4BB543',
  success600: '#42A73B',
  success700: '#34932F',
  success800: '#278225',
  success900: '#166416',
  successA100: '#B4FEC4',
  successA200: '#60F7A6',
  successA400: '#00ED6B',
  successA700: '#01CE43',

  gray50: '#FFFFFF',
  gray100: '#F9F9F9',
  gray200: '#F3F3F3',
  gray300: '#E5E5E5',
  gray400: '#C1C1C1',
  gray500: '#A3A3A3',
  gray600: '#797979',
  gray700: '#666666',
  gray800: '#474747',
  gray900: '#262626',
  grayA100: '#A3A3A3',
  grayA200: '#A3A3A3',
  grayA400: '#A3A3A3',
  grayA700: '#A3A3A3',
};

const shadowColor = `0deg 0% 75%`;
export const theme: ITheme = {
  colors,
  borderRadius: '6px',
  padding: {
    2: '8px',
    4: '16px',
    8: '32px',
  },
  font: {
    weight: {
      normal: 'normal',
      bold: 'bold',
      bolder: 'bolder',
    },
    size: {
      small: '0.833rem',
      regular: '1rem',
      large: '1.2rem',
      xLarge: '1.44rem',
      xxLarge: '2.074rem',
    },
  },
  shadow: {
    low: `0px 1px 1.4px hsl(${shadowColor} / 0.1), 0px 3.3px 4.6px -0.7px hsl(${shadowColor} / 0.33)`,
    medium: `0px 1px 1.4px hsl(${shadowColor} / 0.14), 0px 16.5px 22.9px -0.7px hsl(${shadowColor} / 0.46)`,
    high: `0px 1px 1.4px hsl(${shadowColor} / 0.17), 0px 19.2px 26.6px -0.4px hsl(${shadowColor} / 0.44), 0.1px 65px 90.2px -0.7px hsl(${shadowColor} / 0.7)`,
  },
};

interface IThemeProps {
  theme: ITheme;
}

export const themePaddingSelector = (size: keyof IPadding) => (props: IThemeProps) => props.theme.padding[size];
export const themeColorSelector = (color: keyof IColor) => (props: IThemeProps) => props.theme.colors[color];
export const themeFontSizeSelector = (font: keyof IFontSize) => (props: IThemeProps) => props.theme.font.size[font];
export const themeFontWeightSelector = (font: keyof IFontWeight) => (props: IThemeProps) => props.theme.font.weight[font];
export const themeBorderRadiusSelector = (props: IThemeProps) => props.theme.borderRadius;
export const themeShadowSelector = (shadow: keyof IShadow) => (props: IThemeProps) => props.theme.shadow[shadow];

export const getHoverColor = (color: string) => {
  const hex = tinyColor(color).darken(10).toHex().toString();
  return `#${hex}`;
};
