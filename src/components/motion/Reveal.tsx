'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn, EASE } from '@/lib/cn';

/* ------------------------------------------------------------------ */
/*  Reveal — blok koji ulazi odozdo pri prvom pojavljivanju            */
/* ------------------------------------------------------------------ */

export function Reveal({
  children,
  delay = 0,
  y = 22,
  className,
  as = 'div',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'span';
}) {
  const reduce = useReducedMotion();
  const Cmp = motion[as];

  return (
    <Cmp
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </Cmp>
  );
}

/* ------------------------------------------------------------------ */
/*  LineReveal — tipografski reveal: svaki red iza svoje maske         */
/*  Prelomi su namerni (editorial), pa se redovi prosleđuju ručno.     */
/* ------------------------------------------------------------------ */

export function LineReveal({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
  as: Tag = 'h2',
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
}) {
  const reduce = useReducedMotion();

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        // Okidač stoji na maski, ne na sadržaju: sadržaj je izvan vidljivog
        // okvira maske, pa ga IntersectionObserver nikada ne bi prijavio.
        <motion.span
          key={i}
          className={cn('block overflow-hidden', lineClassName)}
          // Prostor za kvačice na velikim slovima (Č, Ć, Š, Ž, Đ) i za
          // donje produžetke — line-height je 0.88, pa bi ih maska odsekla.
          // Negativne margine vraćaju prored na projektovanu vrednost.
          style={{ marginTop: '-0.26em', marginBottom: '-0.24em' }}
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, margin: '0px 0px -8% 0px' }}
          transition={{
            duration: 1,
            delay: delay + i * stagger,
            ease: EASE,
          }}
        >
          <motion.span
            className="block"
            style={{ paddingTop: '0.26em', paddingBottom: '0.24em' }}
            variants={
              reduce
                ? { hidden: { opacity: 0 }, shown: { opacity: 1 } }
                : {
                    hidden: { y: '105%', opacity: 0 },
                    shown: { y: '0%', opacity: 1 },
                  }
            }
          >
            {line}
          </motion.span>
        </motion.span>
      ))}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/*  RuleReveal — spectrum hairline koja se izvlači                     */
/* ------------------------------------------------------------------ */

export function RuleReveal({
  className,
  delay = 0,
  spectrum = false,
}: {
  className?: string;
  delay?: number;
  spectrum?: boolean;
}) {
  return (
    <motion.div
      className={cn(
        'origin-left',
        spectrum ? 'rule-spectrum' : 'h-px bg-current opacity-20',
        className,
      )}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    />
  );
}
