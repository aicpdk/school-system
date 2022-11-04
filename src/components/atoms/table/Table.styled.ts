import styled from 'styled-components';
import { themeBorderRadiusSelector, themeColorSelector, themePaddingSelector } from '../../../config/theme';
import tinycolor from 'tinycolor2';

const coloredRowColor = new tinycolor('lightGray').lighten(15).toHex().padStart(7, '#');

export const Table = styled.table`
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
  table-layout: fixed;

  border-radius: ${themeBorderRadiusSelector};
  overflow: hidden;
  border: 1px solid ${themeColorSelector('borderPassive')};
`;

export const Columns = styled.thead`
  background-color: ${themeColorSelector('primary')};
`;

export const Rows = styled.tbody`
  border: none;
  overflow-y: auto;
  overflow-x: hidden;

  & > :nth-child(even) {
    background-color: ${coloredRowColor};
  }

  & > :not(:nth-child(even)) {
    background-color: white;
  }
`;

export const Row = styled.tr`
  height: 40px;
  transition: all 0.1s ease-in-out;

  &:not([data-type='head']):hover {
    background-color: ${themeColorSelector('borderActive')};
    cursor: pointer;
  }
`;

export const Column = styled.th<{ width: string }>`
  color: ${themeColorSelector('activeText')};
  width: calc(100% - ${themePaddingSelector(2)} * 2);
  padding: ${themePaddingSelector(2)} ${themePaddingSelector(2)};
  text-align: left;
`;

export const DataCell = styled.td`
  width: calc(100% - ${themePaddingSelector(2)} * 2);
  padding: ${themePaddingSelector(2)} ${themePaddingSelector(2)};
  height: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
