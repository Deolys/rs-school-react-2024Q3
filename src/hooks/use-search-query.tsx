import { useEffect, useRef, useState } from 'react';

function getSearchQueryFromLS(key: string, initialValue: string = ''): string {
  try {
    const savedQuery = window.localStorage.getItem(key);
    return savedQuery ? JSON.parse(savedQuery) : initialValue;
  } catch (error) {
    console.error('Error saving value to localStorage', error);
    return initialValue;
  }
}

function useOnUnmount(callback: () => void): void {
  const onUnmount = useRef<(() => void) | null>(null);
  onUnmount.current = callback;

  useEffect(() => {
    return () => onUnmount.current?.();
  }, []);
}

export default function useSearchQuery(
  key: string,
  initialValue: string,
): [string, (query: string) => void] {
  const [searchQuery, setSearchQuery] = useState(getSearchQueryFromLS(key, initialValue));

  const setValue = (value: string): void => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      setSearchQuery(value);
    } catch (error) {
      console.error('Error saving value to localStorage', error);
    }
  };

  useOnUnmount(() => {
    setValue(searchQuery);
  });

  return [searchQuery, setValue];
}
