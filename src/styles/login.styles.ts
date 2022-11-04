import styled from 'styled-components';
import { themePaddingSelector } from '../config/theme';

export const Page = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${themePaddingSelector(4)};
  justify-content: center;
  align-items: center;
`;

export const Buttons = styled.div`
  display: flex;
  width: 100%;
  gap: ${themePaddingSelector(2)};
  flex-direction: column;
  justify-content: center;
`;
