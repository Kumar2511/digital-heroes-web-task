import { useEffect } from 'react';

/**
 * Scrolls to top on route change, unless a hash anchor is present.
 */
export function useScrollToTop(pathname: string): void {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
}
