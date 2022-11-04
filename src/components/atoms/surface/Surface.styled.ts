import styled, { css } from 'styled-components';
import { themeBorderRadiusSelector, themeColorSelector, themePaddingSelector, themeShadowSelector } from '../../../config/theme';
import { ISurfaceProps } from './Surface.types';

export const Container = styled.div<ISurfaceProps>`
  padding: ${(props) => themePaddingSelector(props.padding || 2)(props)};
  background-color: ${themeColorSelector('gray50')};
  border-radius: ${themeBorderRadiusSelector};
  box-shadow: ${(props) => themeShadowSelector(props.shadow)(props)};
  ${(props) =>
    props.fill === true &&
    css`
      width: calc(100% - ${themePaddingSelector(props.padding || 2)(props)} * 2);
      height: calc(100% - ${themePaddingSelector(props.padding || 2)(props)} * 2);
    `}
`;
