import React from 'react';
import * as Styled from './Link.styled';
import NextLink from 'next/link';
import { ILinkProps } from './Link.types';

export const Link = ({ children, link }: ILinkProps) => {
  return (
    <NextLink href={link} passHref>
      {children}
    </NextLink>
  );
};
