import { FunctionComponent, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { ISchoolCardProps } from './schoolCard.types';
import * as Styled from './schoolCard.styled';
import { Text } from '../../atoms/text';
import { Card, CardItem } from '../../atoms/card';

export const SchoolCard: FunctionComponent<ISchoolCardProps> = ({}) => {
  return (
    <Card>
      <CardItem></CardItem>
      <CardItem></CardItem>
    </Card>
  );
};
