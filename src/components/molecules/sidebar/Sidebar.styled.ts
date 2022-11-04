import styled, { css } from 'styled-components';
import { themeColorSelector, themePaddingSelector, themeShadowSelector } from '../../../config/theme';
import { IStyledSidebarContentProps, IStyledSidebarProps } from './Sidebar.types';

export const Container = styled.aside<IStyledSidebarProps>`
  width: calc(${(props) => (typeof props.width === 'string' ? props.width : props.width + 'px')} - ${themePaddingSelector(2)} * 2);
  height: calc(100vh - ${themePaddingSelector(2)} * 2);
  position: absolute;
  top: 0px;
  right: 0px;

  background-color: ${themeColorSelector('surface')};
  border: 1px solid ${themeColorSelector('borderPassive')};
  z-index: 99;

  transition: transform 0.2s ease-in-out;
  transform: translateX(${(props) => (props.isOpen ? '0%' : '100%')});

  padding: ${themePaddingSelector(2)};
`;

export const SidebarHeader = styled.div`
  width: 100%;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${themeColorSelector('borderPassive')};
  padding-bottom: ${themePaddingSelector(2)};
`;

export const SidebarHeaderCloseButton = styled.div`
  width: 20px;
  height: 20px;
  & > * {
    font-size: 30px;
    transform: translate(-5px, -5px);
  }

  &:hover  {
    cursor: pointer;
  }
`;

export const SidebarBackground = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0px;
  right: 0px;
  border-left: 1px solid ${themeColorSelector('borderPassive')};
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 98;
`;

export const SidebarContent = styled.div<IStyledSidebarContentProps>`
  width: calc(100% - ${themePaddingSelector(2)} * 2);
  height: calc(100% - ${themePaddingSelector(2)} * 3 - 40px);
  padding-top: ${themePaddingSelector(2)};

  ${(props) =>
    !!props.flexDirection &&
    css`
      display: flex;
      flex-direction: ${props.flexDirection};
      gap: ${themePaddingSelector(props.gap || 2)(props)};
      justify-content: ${props.justifyContent};
      align-items: ${props.alignItems};
    `}
`;
