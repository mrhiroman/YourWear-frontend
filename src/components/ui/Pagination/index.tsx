import React from 'react';

import styles from './Pagination.module.sass';
import ReactPaginate from 'react-paginate';

type PaginationProps = {
  currentPage: number,
  onChangePage: (page: number) => void,
  pageCount: number
};

export const Pagination = ({ onChangePage, currentPage, pageCount }: PaginationProps) => {
  return (
    <div>
      <ReactPaginate
        className={styles.pagination}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        forcePage={currentPage - 1}
      />
    </div>
  );
};
