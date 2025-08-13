
'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';
import { useEffect } from 'react';

// To handle start nprogress on link click
if (typeof window !== 'undefined') {
  const originalPushState = window.history.pushState;
  window.history.pushState = function (...args) {
    NProgress.start();
    return originalPushState.apply(window.history, args);
  };

  const originalReplaceState = window.history.replaceState;
  window.history.replaceState = function (...args) {
    NProgress.start();
    return originalReplaceState.apply(window.history, args);
  };

  window.addEventListener('popstate', () => {
    NProgress.start();
  });
}


export function ProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);
  
  // This useEffect will run only once on component mount
  useEffect(() => {
    // Stop the progress bar on initial load
    NProgress.done();
  }, [])

  return null;
}
