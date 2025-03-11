// components/PreloaderWrapper.tsx (Client Component)
'use client';

import Preloader from '@/sections/Preloader';
import { useEffect } from 'react';


export default function PreloaderWrapper({ children }: { 
  children: React.ReactNode 
}) {
  useEffect(() => {
    document.body.classList.add('loading');
    return () => document.body.classList.remove('loading');
  }, []);

  return (
    <>
      <Preloader />
      {children}
    </>
  );
}