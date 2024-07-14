interface StartEndPageNums {
  startPage: number;
  endPage: number;
}

export function getStartEndNums(totalPageCount: number, currentPage: number): StartEndPageNums {
  let startPage: number, endPage: number;
  if (totalPageCount <= 5) {
    startPage = 1;
    endPage = totalPageCount;
  } else {
    startPage = Math.max(1, Math.min(currentPage - 1, totalPageCount - 3));
    endPage = Math.min(startPage + 3, totalPageCount);
  }
  return { startPage, endPage };
}
