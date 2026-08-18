import { useCallback } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export function useRecentSearches(max = 8) {
  const [searches, setSearches] = useLocalStorage<string[]>('ch-recent-searches', []);

  const addSearch = useCallback(
    (term: string) => {
      const trimmed = term.trim();
      if (!trimmed) return;
      setSearches((prev) => [trimmed, ...prev.filter((s) => s !== trimmed)].slice(0, max));
    },
    [max, setSearches]
  );

  const clearSearches = useCallback(() => setSearches([]), [setSearches]);

  return { searches, addSearch, clearSearches };
}
