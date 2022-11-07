import styled, { createGlobalStyle } from 'styled-components';
import { themeColorSelector } from '../config/theme';

export const GlobalStyles = createGlobalStyle`
  html, 
  body, 
  #__next {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-size: 16px;
    overflow: hidden;
  }

  #__next {
    height: 100vh;
    width: 100vw;

    
  }

  *:focus {
    outline: none;
}
`;

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: row;
  gap: 0;
`;

export const Content = styled.div`
  width: 100%;
  background-color: ${themeColorSelector('gray50')};
`;
