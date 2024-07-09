import type { JSX } from 'react';
import { PaginationData } from '@services/interfaces';
import { getStartEndNums } from './get-start-end-nums';
import classes from './pagination.module.scss';

interface PaginationProps {
  paginationData: PaginationData | null;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  paginationData,
  currentPage,
  onPageChange,
}: PaginationProps): JSX.Element {
  const totalPageCount = paginationData?.last_visible_page || 0;
  const showStartDots = currentPage > 3;
  const showEndDots = currentPage < totalPageCount - 3;

  const { startPage, endPage } = getStartEndNums(totalPageCount, currentPage);

  const pageNums = Array.from({ length: endPage + 1 - startPage }, (_, index) => startPage + index);

  return (
    <nav className={classes.pagination}>
      {currentPage > 1 && (
        <button className={classes.sideButton} onClick={() => onPageChange(currentPage - 1)}>
          Previous
        </button>
      )}
      {showStartDots && (
        <button className={classes.paginationButton} onClick={() => onPageChange(1)}>
          1
        </button>
      )}
      {showStartDots && <span>...</span>}
      {pageNums.map((number) => (
        <button
          className={classes.paginationButton}
          key={number}
          disabled={number === currentPage}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}
      {showEndDots && <span>...</span>}
      {showEndDots && (
        <button className={classes.paginationButton} onClick={() => onPageChange(totalPageCount)}>
          {totalPageCount}
        </button>
      )}
      {paginationData?.has_next_page && (
        <button className={classes.sideButton} onClick={() => onPageChange(currentPage + 1)}>
          Next
        </button>
      )}
    </nav>
  );
}

export default Pagination;
