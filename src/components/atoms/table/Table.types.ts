export interface ITableProps<T> {
  columns: Array<keyof T>;
  data: T[];
  spacing: {
    [key in keyof T]?: string;
  };
  onClick: (data: T, index: number) => void;
}
