import { TableColumn } from 'react-data-table-component';

export interface ICustomDataTableProp {
  loading: boolean;
  columns: Array<TableColumn<any>>;
  totalPages: number;
  data: any[];
  onFetchData: Function;
  searchText?: string;
}
