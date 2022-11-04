import { ISurfaceProps } from './Surface.types';
import * as Styled from './Surface.styled';

export const Surface = ({ children, padding, fill = false, shadow }: ISurfaceProps) => {
  return (
    <Styled.Container shadow={shadow} padding={padding} fill={fill}>
      {children}
    </Styled.Container>
  );
};
