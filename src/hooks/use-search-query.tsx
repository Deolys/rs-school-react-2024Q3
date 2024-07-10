import { useEffect, useRef, useState } from 'react';

function saveSearchQueryToLS(key: string, query: string): void {
  window.localStorage.setItem(key, query);
  return;
}

function getSearchQueryFromLS(key: string): string {
  const savedQuery = window.localStorage.getItem(key) || '';
  return savedQuery;
}

function useOnUnmount(callback: () => void): void {
  const onUnmount = useRef<(() => void) | null>(null);
  onUnmount.current = callback;

  useEffect(() => {
    return () => onUnmount.current?.();
  }, []);
}

export default function useSearchQuery(key: string): [string, (query: string) => void] {
  const [searchQuery, setSearchQuery] = useState(getSearchQueryFromLS(key));

  useOnUnmount(() => {
    saveSearchQueryToLS(key, searchQuery);
  });

  return [searchQuery, setSearchQuery];
}
