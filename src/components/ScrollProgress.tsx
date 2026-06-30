"use client";

import { motion } from 'framer-motion';
import { useScrollState } from '@/hooks/useScrollState';

export default function ScrollProgress() {
  const { scrollProgress } = useScrollState()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 z-[100] origin-left"
      style={{ scaleX: scrollProgress / 100 }}
      initial={{ scaleX: 0 }}
    />
  );
}
