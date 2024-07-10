import { useEffect, useState } from 'react';

function saveSearchQueryToLS(key: string, query: string): void {
  window.localStorage.setItem(key, query);
  return;
}

function getSearchQueryFromLS(key: string): string {
  const savedQuery = window.localStorage.getItem(key) || '';
  return savedQuery;
}

export default function useSearchQuery(key: string): [string, (query: string) => void] {
  const [searchQuery, setSearchQuery] = useState(getSearchQueryFromLS(key));

  useEffect(() => {
    return () => saveSearchQueryToLS(key, searchQuery);
  }, [key, searchQuery]);

  return [searchQuery, setSearchQuery];
}
