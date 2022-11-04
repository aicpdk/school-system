import * as Styled from './Text.styled';
import { ITextProps } from './Text.types';

export const Text = ({ size = 'regular', weight = 'normal', children, width, color = 'gray900' }: ITextProps) => {
  return (
    <Styled.Text width={width} weight={weight} size={size} color={color}>
      {children}
    </Styled.Text>
  );
};
