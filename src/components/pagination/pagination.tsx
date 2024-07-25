'use client';

import type { JSX } from 'react';
import { getStartEndNums } from './get-start-end-nums';
import classes from './pagination.module.scss';
import { PaginationData } from '@/services/interfaces';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import useActions from '@/hooks/use-actions';

interface PaginationProps {
  paginationData?: PaginationData;
}

export function Pagination({ paginationData }: PaginationProps): JSX.Element {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const { setCurrentPage } = useActions();
  const queryParam = params.get('q');
  const currentPage = Number(params.get('page')) || 1;
  const totalPageCount = paginationData?.last_visible_page || 0;
  const { startPage, endPage } = getStartEndNums(totalPageCount, currentPage);
  let showStartDots = false;
  let showEndDots = false;
  let showStartNumber = false;
  let showEndNumber = false;

  const onPageChange = (page: number): void => {
    const newSearchParams = new URLSearchParams({ page: `${page}` });
    if (queryParam) {
      newSearchParams.set('q', queryParam);
    }
    router.push(`${pathname}?${newSearchParams.toString()}`);
    setCurrentPage(page);
  };

  if (totalPageCount > 5) {
    showStartDots = currentPage > 3;
    showEndDots = currentPage < totalPageCount - 2;

    showStartNumber = showStartDots || currentPage > 2;
    showEndNumber = showEndDots || currentPage >= totalPageCount - 2;
  }

  const pageNums = Array.from({ length: endPage + 1 - startPage }, (_, index) => startPage + index);

  return (
    <nav className={classes.pagination}>
      {currentPage > 1 && (
        <button className={classes.sideButton} onClick={() => onPageChange(currentPage - 1)}>
          Previous
        </button>
      )}
      {showStartNumber && (
        <button
          className={classes.paginationButton}
          disabled={currentPage === 1}
          onClick={() => onPageChange(1)}
        >
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
      {showEndNumber && (
        <button
          className={classes.paginationButton}
          disabled={totalPageCount === currentPage}
          onClick={() => onPageChange(totalPageCount)}
        >
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
