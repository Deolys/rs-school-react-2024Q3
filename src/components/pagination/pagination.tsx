import { useMemo, type JSX, useEffect } from 'react';
import { getStartEndNums } from './get-start-end-nums';
import classes from './pagination.module.scss';
import { useAppSelector } from '../../store/hooks';
import useActions from '../../hooks/use-actions';
import { useSearchParams } from 'react-router-dom';

export function Pagination(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get('page');
  const { data: paginationData, status } = useAppSelector((state) => state.cards.pagination);
  const currentPage = useAppSelector((state) => state.cards.currentPage);
  const { setCurrentPage } = useActions();
  const onPageChange = (page: number): void => {
    searchParams.set('page', `${page}`);
    setSearchParams(searchParams);
    setCurrentPage(page);
  };

  useEffect(() => {
    if (pageParam && currentPage !== +pageParam) {
      setCurrentPage(+pageParam);
    }
  }, [searchParams, currentPage, pageParam, setCurrentPage]);

  const totalPageCount = paginationData?.last_visible_page || 0;
  const { startPage, endPage } = useMemo(() => {
    return getStartEndNums(totalPageCount, currentPage);
  }, [totalPageCount, currentPage]);

  let showStartDots, showEndDots, showStartNumber, showEndNumber;

  if (totalPageCount > 5) {
    showStartDots = currentPage > 3;
    showEndDots = currentPage < totalPageCount - 2;

    showStartNumber = showStartDots || currentPage > 2;
    showEndNumber = showEndDots || currentPage >= totalPageCount - 2;
  }

  const pageNums = Array.from({ length: endPage + 1 - startPage }, (_, index) => startPage + index);
  const showPagination = paginationData?.items?.count !== 0 && status === 'success';

  return (
    <>
      {showPagination && (
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
      )}
    </>
  );
}

export default Pagination;
