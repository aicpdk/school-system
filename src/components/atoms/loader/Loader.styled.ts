import styled from 'styled-components';

export const Container = styled.div`
  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
      tranform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      tranform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  & > * {
    animation: spin 0.6s infinite ease-in-out;
  }
`;
