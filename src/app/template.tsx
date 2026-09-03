'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { nav } from '@/lib/site';
import { EASE, EASE_SHEAR } from '@/lib/cn';

/**
 * Prelaz između stranica.
 *
 * Dve ukošene ploče (isti ugao kao Δ rez u vizuelnom identitetu)
 * izlaze naviše i otkrivaju novu stranicu. Bez generičkog crnog fade-a.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  const entry =
    nav.find((n) => (n.href === '/' ? pathname === '/' : pathname.startsWith(n.href))) ??
    null;

  if (reduce) {
    return <div key={pathname}>{children}</div>;
  }

  return (
    <div key={pathname}>
      <div className="pointer-events-none fixed inset-0 z-[80] overflow-hidden">
        <motion.div
          className="absolute inset-x-[-10%] top-[-14%] h-[128%] bg-ink"
          style={{ transform: 'skewY(-4deg)' }}
          initial={{ y: '0%' }}
          animate={{ y: '-135%' }}
          transition={{ duration: 0.78, ease: EASE_SHEAR, delay: 0.06 }}
        />
        <motion.div
          className="absolute inset-x-[-10%] top-[-14%] flex h-[128%] items-center justify-center bg-ink-soft"
          style={{ transform: 'skewY(-4deg)' }}
          initial={{ y: '0%' }}
          animate={{ y: '-135%' }}
          transition={{ duration: 0.78, ease: EASE_SHEAR }}
        >
          <motion.span
            className="t-meta text-paper/70"
            style={{ transform: 'skewY(4deg)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.6, times: [0, 0.4, 1], ease: 'linear' }}
          >
            {entry ? `${entry.code} · ${entry.label}` : 'Delta Systems'}
          </motion.span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.42, ease: EASE }}
      >
        {children}
      </motion.div>
    </div>
  );
}
