// src/components/Breadcrumb.tsx
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string; // el último item no lleva href (es la página actual)
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 text-sm">
      <Link
        href="/"
        className="flex items-center gap-1 [color:var(--text-muted)] hover:text-blue-400 transition-colors"
      >
        <Home size={14} />
      </Link>

      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1.5">
            <ChevronRight size={14} className="[color:var(--text-faint)]" />
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="[color:var(--text-muted)] hover:text-blue-400 transition-colors font-medium"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-blue-400 font-semibold">{item.label}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}