import { FunctionComponent, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { IStatCardProps } from './statCard.types';
import * as Styled from './statCard.styled';
import { Text } from '../../atoms/text';

export const StatCard: FunctionComponent<IStatCardProps> = ({ label, amount, prevAmount, type }) => {
  return (
    <Styled.Container>
      <Text size="large" weight="bold" color="primary200">
        {label}
      </Text>
      <Text size="xLarge" weight="bold" color="gray50">
        {`${amount}`}
      </Text>
      <Text size="large" weight="bold" color="primary200">
        {`+ ${amount - prevAmount}`}
      </Text>
    </Styled.Container>
  );
};
