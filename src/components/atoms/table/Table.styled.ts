import styled from 'styled-components';
import {
  themeBorderRadiusSelector,
  themeColorSelector,
  themeFontSizeSelector,
  themeFontWeightSelector,
  themePaddingSelector,
} from '../../../config/theme';
import tinycolor from 'tinycolor2';
import { InputField } from '../input';

const coloredRowColor = new tinycolor('lightGray').lighten(15).toHex().padStart(7, '#');

export const Table = styled.table`
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
  table-layout: fixed;

  border-radius: ${themeBorderRadiusSelector};
  border: 1px solid ${themeColorSelector('gray200')};
`;

export const Row = styled.tr`
  height: 23px;
  transition: all 0.1s ease-in-out;
`;

export const THead = styled.thead``;

export const DataCell = styled.td`
  width: calc(100% - ${themePaddingSelector(2)} * 2);
  height: inherit;
  padding: ${themePaddingSelector(2)} ${themePaddingSelector(2)};
  border: 1px solid ${themeColorSelector('gray200')};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow-y: auto;
`;

export const TBody = styled.tbody`
  width: 100%;
  border: none;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 70%;

  & > :not(:nth-child(even)) {
    background-color: white;
  }

  & > ${Row}:hover {
    background-color: ${themeColorSelector('gray300')};
    cursor: pointer;
  }
`;

export const Column = styled.th`
  color: ${themeColorSelector('gray900')};
  width: calc(100% - ${themePaddingSelector(2)} * 2);
  padding: ${themePaddingSelector(2)} ${themePaddingSelector(2)};
  border: 1px solid ${themeColorSelector('gray200')};
  text-align: left;
`;

export const TableInputContainer = styled.div`
  width: calc(100% - ${themePaddingSelector(2)} * 2);
  height: 40px;
  border-top: 1px solid;
  border-left: 1px solid;
  border-right: 1px solid;
  border-color: ${themeColorSelector('gray200')};

  display: flex;
  align-items: center;
  padding: 0px ${themePaddingSelector(2)};
`;

export const TableInput = styled(InputField)`
  border: none;
  padding: 0;

  color: ${themeColorSelector('gray900')};
  font-weight: ${themeFontWeightSelector('bold')};
`;

export const TablePaginationContainer = styled.div`
  width: 100%;
  min-height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${themePaddingSelector(2)};
  border-bottom: 1px solid;
  border-left: 1px solid;
  border-right: 1px solid;
  border-color: ${themeColorSelector('gray200')};
`;

export const LeftPagination = styled.div``;
export const RightPagination = styled.div``;
