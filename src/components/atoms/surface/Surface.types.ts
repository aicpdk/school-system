import React from 'react';
import { IPadding, IShadow } from '../../../interfaces/ITheme';

export interface ISurfaceProps {
  children: React.ReactNode;
  padding?: keyof IPadding;
  fill?: boolean;
  shadow: keyof IShadow;
}
