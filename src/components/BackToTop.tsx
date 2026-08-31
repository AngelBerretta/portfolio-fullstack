"use client";

import { ArrowUp } from 'lucide-react';
import { useScrollState } from '@/hooks/useScrollState';

export default function BackToTop() {
  const { showBackToTop } = useScrollState();

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Volver arriba"
      aria-hidden={!showBackToTop}
      tabIndex={showBackToTop ? 0 : -1}
      data-visible={showBackToTop}
      className="back-to-top-btn fixed bottom-8 right-6 z-40 p-3 rounded-xl bg-indigo-500/90 backdrop-blur-sm text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-500 hover:shadow-indigo-500/50 lg:hidden"
    >
      <ArrowUp size={20} />
    </button>
  );
}