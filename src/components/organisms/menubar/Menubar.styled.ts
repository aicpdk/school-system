import styled from 'styled-components';
import { themeBorderRadiusSelector, themeColorSelector, themePaddingSelector, themeShadowSelector } from '../../../config/theme';
import { Container as IconContainer } from '../../atoms/icon/icon.styled';

const getWidth = ({ open = false }) => (open ? '200px' : '10px');

export const Container = styled.div<{ open: boolean }>`
  min-width: ${getWidth};
  max-width: ${getWidth};
  width: ${getWidth};
  height: '100%';
  transition: width 300s ease-in-out;
  background-color: ${themeColorSelector('gray50')};

  padding: ${(props) => `0px ${themePaddingSelector(2)(props)}`};
  box-shadow: ${themeShadowSelector('low')};
  border-right: 1px solid ${themeColorSelector('gray200')};
  z-index: 1;
`;

export const Item = styled.a<{ isActive: boolean }>`
  font: ${themeColorSelector('gray900')};
  text-decoration: none;
  font-style: none;
  width: calc(100% - ${themePaddingSelector(2)} * 2);
  height: 40px;
  background-color: ${(props) => props.isActive && themeColorSelector('primary50')};
  color: ${themeColorSelector('gray900')};
  border-radius: ${themeBorderRadiusSelector};
  display: flex;
  align-items: center;
  pointer-events: ${(props) => props.isActive && 'none'};
  padding: 0px ${themePaddingSelector(2)};
  transition: all 0.15s ease-in-out;

  display: flex;
  gap: ${themePaddingSelector(2)};
  justify-content: flex-start;
  align-items: center;

  & > ${IconContainer} {
    width: 25px;
  }

  &:hover {
    cursor: pointer;
    background-color: ${(props) => !props.isActive && themeColorSelector('gray200')};
  }
`;

export const Navigation = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${themePaddingSelector(2)};
`;
