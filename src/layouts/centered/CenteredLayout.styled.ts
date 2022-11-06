import * as Styled from '../../components/atoms/surface/Surface.styled';
import styled from 'styled-components';
import { mediaQuery, themePaddingSelector } from '../../config/theme';

export const CenteredLayoutContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CenteredLayoutContent = styled(Styled.Container)`
  @media ${mediaQuery.mobile} {
    padding: 0;
    padding-top: ${themePaddingSelector(8)};
    width: 100%;
    height: 100%;
  }
`;
