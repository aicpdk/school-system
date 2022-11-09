import styled, { css } from 'styled-components';
import { themeColorSelector, themePaddingSelector } from '../../config/theme';
import { IBasicLayoutContentProps } from './Basic.types';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${themeColorSelector('gray50')};
`;

export const Header = styled.header`
  width: calc(100% - ${themePaddingSelector(2)} * 2);
  min-height: 40px;
  padding: ${themePaddingSelector(2)};
  background-color: ${themeColorSelector('gray50')};
  border-bottom: 1px solid ${themeColorSelector('gray200')};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderButtons = styled.div`
  display: flex;
  gap: ${themePaddingSelector(2)};
  justify-content: center;
  align-items: center;
`;

export const Content = styled.main<IBasicLayoutContentProps>`
  /* width: calc(100% - ${themePaddingSelector(2)} * 2); */
  width: calc(100%);
  height: 100%;
  background-color: ${themeColorSelector('gray50')};

  ${(props) =>
    props.flexDirection &&
    css`
      display: flex;
      flex-direction: ${props.flexDirection};
      gap: ${!!props.gap && themePaddingSelector(props.gap)(props)};
    `}
`;
