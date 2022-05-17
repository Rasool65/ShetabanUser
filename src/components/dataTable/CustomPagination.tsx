import { FunctionComponent, useState } from 'react';
import { RefreshCw } from 'react-feather';
import ReactPaginate from 'react-paginate';
import { Button, Input, NavLink } from 'reactstrap';
import { ICustomPaginationProp } from './ICustomPaginationProp';

export const CustomPagination: FunctionComponent<ICustomPaginationProp> = (props) => {
  return (
    <div className="custom-pagination">
      <ReactPaginate
        previousLabel=""
        nextLabel=""
        forcePage={props.currentPage - 1}
        onPageChange={(page) => props.handlePageChange(page.selected + 1)}
        pageCount={props.totalPages}
        breakLabel="..."
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        activeClassName="active"
        pageClassName="page-item"
        breakClassName="page-item"
        nextLinkClassName="page-link"
        pageLinkClassName="page-link"
        breakLinkClassName="page-link"
        previousLinkClassName="page-link"
        nextClassName="page-item next-item"
        previousClassName="page-item prev-item"
        containerClassName="pagination react-paginate justify-content-center pe-1 mt-1"
      />
      <Input
        type="select"
        name="select"
        value={props.perPage}
        onChange={(e) => {
          props.handlePerPageChange(e.target.value);
        }}
      >
        <option>10</option>
        <option>15</option>
        <option>20</option>
        <option>25</option>
        <option>30</option>
      </Input>
      <Button
        outline
        size="sm"
        color="default"
        onClick={() => {
          props.handlePageChange(props.currentPage);
        }}
      >
        <RefreshCw size={15} />
      </Button>
    </div>
  );
};
