'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';
import { useEffect } from 'react';

export function ProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.configure({ showSpinner: false });

    const handleStart = () => NProgress.start();
    const handleStop = () => NProgress.done();

    // We need to use a mutation observer to listen for route changes
    // in the Next.js App Router, as the router events are not
    // consistently firing in all cases.
    const observer = new MutationObserver((mutations) => {
        const url = window.location.pathname + window.location.search;
        const previousUrl = sessionStorage.getItem('previousUrl');
        if (url !== previousUrl) {
            sessionStorage.setItem('previousUrl', url);
            handleStop();
        }
    });

    const htmlElement = document.querySelector('html');
    if (htmlElement) {
        observer.observe(htmlElement, {
          childList: true,
          subtree: true,
        });
    }

    // Fallback for initial load
    handleStart();

    // Fallback for when the page is fully loaded
    const handleLoad = () => {
        handleStop();
    };
    
    if (document.readyState === 'complete') {
        handleLoad();
    } else {
        window.addEventListener('load', handleLoad);
        return () => window.removeEventListener('load', handleLoad);
    }

    return () => {
        observer.disconnect();
    };

  }, []);

  // Also trigger on pathname/searchParams change for client-side navigation
  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  return null;
}
