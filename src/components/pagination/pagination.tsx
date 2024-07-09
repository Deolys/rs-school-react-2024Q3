import type { JSX } from 'react';
import { PaginationData } from '@services/interfaces';

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

  let startPage: number, endPage: number;

  if (totalPageCount <= 5) {
    startPage = 1;
    endPage = totalPageCount;
  } else {
    if (currentPage <= 3) {
      startPage = 1;
      endPage = 4;
    } else if (currentPage + 2 >= totalPageCount) {
      startPage = totalPageCount - 3;
      endPage = totalPageCount;
    } else {
      startPage = currentPage - 1;
      endPage = currentPage + 2;
    }
  }

  const pageNums = Array.from({ length: endPage + 1 - startPage }, (_, index) => startPage + index);

  return (
    <nav>
      {currentPage > 1 && <button onClick={() => onPageChange(currentPage - 1)}>Previous</button>}
      {showStartDots && <button onClick={() => onPageChange(1)}>1</button>}
      {showStartDots && <span>...</span>}
      {pageNums.map((number) => (
        <button key={number} disabled={number === currentPage} onClick={() => onPageChange(number)}>
          {number}
        </button>
      ))}
      {showEndDots && <span>...</span>}
      {showEndDots && (
        <button onClick={() => onPageChange(totalPageCount)}>{totalPageCount}</button>
      )}
      {paginationData?.has_next_page && (
        <button onClick={() => onPageChange(currentPage + 1)}>Next</button>
      )}
    </nav>
  );
}

export default Pagination;
