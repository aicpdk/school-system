import { ReactElement } from 'react';
import { StatCard } from '../../molecules/statCard';

export interface IStatsListProps {
  children: Array<ReactElement<typeof StatCard>>;
}
