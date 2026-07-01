import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const MAX_TAGS_VISIBLE = 3;

export function TagList({ tags }: { tags: string[] }) {
  const [expanded, setExpanded] = useState(false);
  const hidden = tags.length - MAX_TAGS_VISIBLE;
  const visible = expanded ? tags : tags.slice(0, MAX_TAGS_VISIBLE);

  return (
    <div className="flex flex-wrap gap-1.5 mb-4">
      <AnimatePresence initial={false}>
        {visible.map((tag) => (
          <m.span
            key={tag}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.15 }}
            className="px-2 py-0.5 rounded-md text-[11px] font-medium border
              [background:var(--bg-card)] [border-color:var(--border-subtle)] [color:var(--text-muted)]"
          >
            {tag}
          </m.span>
        ))}
      </AnimatePresence>

      {/* Botón +N / Ver menos */}
      {tags.length > MAX_TAGS_VISIBLE && (
        <button
          onClick={(e) => { e.stopPropagation(); setExpanded((v) => !v); }}
          className="px-2 py-0.5 rounded-md text-[11px] font-bold border transition-all duration-200
            text-blue-400 border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20"
        >
          {expanded ? (
            <span className="flex items-center gap-0.5">
              <ChevronDown size={10} className="rotate-180" /> menos
            </span>
          ) : (
            `+${hidden}`
          )}
        </button>
      )}
    </div>
  );
}
