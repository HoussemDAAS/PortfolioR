// components/GlobalStyles.tsx
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function GlobalStyles() {
  const pathname = usePathname();

  useEffect(() => {
    // Add any global DOM manipulation here
    document.documentElement.style.setProperty(
      '--scrollbar-width', 
      window.innerWidth - document.documentElement.clientWidth + 'px'
    );
  }, [pathname]);

  return null;
}