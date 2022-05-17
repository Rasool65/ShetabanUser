export interface ICustomPaginationProp {
  currentPage: number;
  perPage: number;
  totalPages: number;
  handlePageChange: Function;
  handlePerPageChange: Function;
}
