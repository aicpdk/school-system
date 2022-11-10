import React from 'react';
import * as Styled from './Tag.styled';
import { ITagProps } from './Tag.types';

export const Tag: React.FC<ITagProps> = ({ children, color }) => {
  return <Styled.Tag color={color}>{children}</Styled.Tag>;
};
