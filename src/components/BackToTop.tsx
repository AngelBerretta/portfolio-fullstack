"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useScrollState } from '@/hooks/useScrollState';

export default function BackToTop() {
  const { showBackToTop } = useScrollState()

  return (
    <AnimatePresence>
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-6 z-40 p-3 rounded-xl bg-indigo-500/90 backdrop-blur-sm text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-500 hover:scale-110 hover:shadow-indigo-500/50 transition-all duration-300 lg:hidden"
          aria-label="Volver arriba"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}