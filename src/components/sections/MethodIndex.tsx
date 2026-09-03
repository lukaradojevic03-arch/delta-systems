'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { pillars } from '@/lib/site';
import { cn, EASE } from '@/lib/cn';

/**
 * Metod · nije mreža od četiri kartice.
 * Desktop: indeks levo, sadržaj se menja desno.
 * Mobilni: uspravna lista, sve otvoreno (bez skrivenog sadržaja iza tapa).
 */
export function MethodIndex() {
  const [i, setI] = useState(0);
  const active = pillars[i];

  return (
    <div className="grid gap-10 md:grid-cols-12 md:gap-8">
      {/* indeks · desktop */}
      <ul className="cq hidden md:col-span-5 md:block">
        {pillars.map((p, idx) => (
          <li key={p.code}>
            <button
              type="button"
              onMouseEnter={() => setI(idx)}
              onFocus={() => setI(idx)}
              onClick={() => setI(idx)}
              aria-current={idx === i}
              className="group flex w-full items-baseline gap-5 border-t border-ink/12 py-5 text-left last:border-b"
            >
              <span
                className={cn(
                  't-meta-sm transition-colors duration-500',
                  idx === i ? 'text-ink' : 'text-stone',
                )}
              >
                {p.code}
              </span>
              <span
                className={cn(
                  't-display text-[clamp(0.95rem,6.2cqi,2.18rem)] transition-all duration-700 ease-delta',
                  idx === i
                    ? 'translate-x-1.5 text-ink'
                    : 'text-ink/35 group-hover:text-ink/70',
                )}
              >
                {p.title}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {/* sadržaj · desktop */}
      <div className="hidden md:col-span-6 md:col-start-7 md:block">
        <div className="relative min-h-[280px] border-t border-ink/12 pt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.code}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <p className="t-meta text-stone">{active.code}</p>
              <p className="t-lede mt-5 max-w-[36ch] text-ink">{active.body}</p>
              <div className="rule-spectrum my-7 w-16" />
              <p className="t-body max-w-[44ch] text-slate pretty">{active.detail}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* mobilni · sve vidljivo */}
      <ul className="md:hidden">
        {pillars.map((p) => (
          <li key={p.code} className="cq border-t border-ink/12 py-6 last:border-b">
            <p className="t-meta-sm text-stone">{p.code}</p>
            <h3 className="t-display mt-2 text-[clamp(1.2rem,7cqi,1.72rem)]">
              {p.title}
            </h3>
            <p className="t-body mt-3 text-ink/85 pretty">{p.body}</p>
            <p className="t-body mt-2 text-slate pretty">{p.detail}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
