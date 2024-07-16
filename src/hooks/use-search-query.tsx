import { useState } from 'react';

function getValueFromLS(key: string, initialValue: string = ''): string {
  try {
    const savedQuery = window.localStorage.getItem(key);
    return savedQuery ? JSON.parse(savedQuery) : initialValue;
  } catch (error) {
    console.error('Error saving value to localStorage', error);
    return initialValue;
  }
}

export default function useSearchQuery(
  key: string,
  initialValue: string,
): [string, (query: string) => void] {
  const [searchQuery, setSearchQuery] = useState(getValueFromLS(key, initialValue));

  const setValue = (value: string): void => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      setSearchQuery(value);
    } catch (error) {
      console.error('Error saving value to localStorage', error);
    }
  };

  return [searchQuery, setValue];
}
