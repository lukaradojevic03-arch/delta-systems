'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { faqs } from '@/lib/site';
import { cn, EASE } from '@/lib/cn';

/** Česta pitanja · otvoreno prvo, ostalo na klik. */
export function Faq({ limit }: { limit?: number }) {
  const list = limit ? faqs.slice(0, limit) : faqs;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="border-t border-ink/12">
      {list.map((f, i) => {
        const on = open === i;
        return (
          <li key={f.q} className="border-b border-ink/12">
            <h3>
              <button
                type="button"
                onClick={() => setOpen(on ? null : i)}
                aria-expanded={on}
                className="group flex w-full items-start gap-6 py-5 text-left md:py-6"
              >
                <span
                  className={cn(
                    'flex-1 font-sans text-[1.0625rem] leading-snug tracking-[-0.012em] transition-colors duration-500 md:text-[1.1875rem]',
                    on ? 'text-ink' : 'text-ink/75 group-hover:text-ink',
                  )}
                >
                  {f.q}
                </span>

                <span
                  className="relative mt-2 block h-[11px] w-[11px] shrink-0"
                  aria-hidden="true"
                >
                  <span className="absolute left-0 top-[5px] h-px w-full bg-azure-700" />
                  <span
                    className={cn(
                      'absolute left-[5px] top-0 h-full w-px bg-azure-700 transition-transform duration-500 ease-delta',
                      on ? 'scale-y-0' : 'scale-y-100',
                    )}
                  />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {on && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.42, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="t-body max-w-[62ch] pb-6 pr-8 text-slate pretty">
                    {f.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
