import '@tanstack/react-table';

declare module '@tanstack/react-table' {
  // adding classname to headers for column widths
  interface ColumnMeta<TData extends RowData, TValue> {
    headerClassName?: string;
  }
}
