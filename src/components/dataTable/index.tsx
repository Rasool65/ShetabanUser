import { forwardRef, FunctionComponent, useEffect, useImperativeHandle, useState } from 'react';
import DataTable, { createTheme, TableStyles } from 'react-data-table-component';
import LoadingComponent from '../spinner/LoadingComponent';
import { CustomPagination } from './CustomPagination';
import { ICustomDataTableProp } from './ICustomDataTableProp';
import { ICustomDataTableRef } from './ICustomDataTableRef';

export const CustomDataTable = forwardRef<ICustomDataTableRef, ICustomDataTableProp>((props, ref) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [sortColumnState, setSortColumn] = useState<any>();
  const [sortDirectionState, setSortDirection] = useState<string>();

  useImperativeHandle(ref, () => ({
    reloadData: () => {
      props.onFetchData({
        page: currentPage,
        limit: perPage,
        sortColumn: sortColumnState,
        sortDirection: sortDirectionState,
      });
    },
  }));

  useEffect(() => {
    props.onFetchData({
      page: 1,
      limit: 10,
    });
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    props.onFetchData({
      page: 1,
      limit: perPage,
      sortColumn: sortColumnState,
      sortDirection: sortDirectionState,
    });
  }, [props.searchText]);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
    props.onFetchData({ page: page, limit: perPage, sortColumn: sortColumnState, sortDirection: sortDirectionState });
  };

  const handlePerPageChange = async (newPerPage: number) => {
    setCurrentPage(1);
    setPerPage(newPerPage);
    props.onFetchData({ page: 1, limit: newPerPage, sortColumn: sortColumnState, sortDirection: sortDirectionState });
  };

  const handleSort = (column: any, sortDirection: string) => {
    setSortColumn(column);
    setSortDirection(sortDirection);
    props.onFetchData({ page: currentPage, limit: perPage, sortColumn: column, sortDirection: sortDirection });
  };

  const customStyles: TableStyles = {
    headRow: {
      style: {
        backgroundColor: 'transparent',
      },
    },
    responsiveWrapper: {
      style: {
        border: 'solid 1px #e0e0e0',
        borderRadius: '5px',
        marginTop: '15px',
        borderBottomLeftRadius: '0',
        borderBottomRightRadius: '0',
      },
    },
    noData: {
      style: {
        padding: '15px',
      },
    },
  };

  return (
    <>
      <DataTable
        noHeader
        highlightOnHover
        columns={props.columns}
        data={props.data}
        progressPending={props.loading}
        progressComponent={LoadingComponent}
        sortServer
        onSort={handleSort}
        pagination
        paginationServer
        responsive
        customStyles={customStyles}
        paginationPerPage={perPage}
        noDataComponent="هیچ داده ای برای نمایش وجود ندارد"
        paginationComponent={() => {
          return (
            <CustomPagination
              perPage={perPage}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
              handlePerPageChange={handlePerPageChange}
              totalPages={props.totalPages}
            />
          );
        }}
      />
    </>
  );
});
