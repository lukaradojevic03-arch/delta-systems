'use client';

import { motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';
import { steps } from '@/lib/site';
import { cn, EASE } from '@/lib/cn';

/**
 * Proces kao spuštanje kroz slojeve — ne kao „01 / 02 / 03" mreža.
 * Uspravni lenjir prati skrol i pokazuje na kom je sloju trenutni korak.
 */
export function DepthProcess() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 55%', 'end 85%'],
  });
  const fill = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 34,
    mass: 0.3,
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const i = Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length)));
    setActive(i);
  });

  const layers = ['Površina', 'Vlakno', 'Dubina'];

  return (
    <div ref={ref} className="edge grid gap-10 md:grid-cols-12 md:gap-8">
      {/* lenjir dubine */}
      <div className="hidden md:col-span-3 md:block">
        <div className="sticky top-28 self-start">
          <p className="t-meta-sm text-stone">Sloj</p>

          <div className="mt-5 flex gap-4">
            <div className="relative h-[320px] w-px bg-ink/15">
              <motion.div
                className="absolute left-0 top-0 w-px origin-top"
                style={{
                  scaleY: fill,
                  height: '100%',
                  background:
                    'linear-gradient(180deg,#F0B48A,#E0899F,#A78BC8,#8E9FD4)',
                }}
              />
              {/* podeoci */}
              <div className="depth-ticks absolute -left-3 top-0 h-full w-2 opacity-60" />
            </div>

            <div className="flex h-[320px] flex-col justify-between">
              {layers.map((l) => (
                <span
                  key={l}
                  className={cn(
                    't-meta-sm transition-colors duration-500',
                    steps[active].depth === l ? 'text-ink' : 'text-stone/70',
                  )}
                >
                  {l}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 border-t border-ink/12 pt-4">
            <p className="t-meta-sm text-stone">Korak</p>
            <p className="t-display mt-2 text-[2.4rem] leading-none">
              {steps[active].code}
            </p>
          </div>
        </div>
      </div>

      {/* koraci */}
      <ol className="cq md:col-span-8 md:col-start-5">
        {steps.map((s, i) => (
          <motion.li
            key={s.code}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px -15% 0px' }}
            transition={{ duration: 0.8, ease: EASE }}
            className="border-t border-ink/12 py-9 last:border-b md:py-14"
          >
            <div className="flex items-baseline gap-5">
              <span className="t-meta-sm w-8 shrink-0 text-stone">{s.code}</span>
              <span className="t-meta-sm text-stone">{s.depth}</span>
            </div>

            <h3 className="t-display mt-4 text-[clamp(1.7rem,11cqi,4rem)]">
              {s.title}
            </h3>

            <p className="t-body mt-5 max-w-[52ch] text-slate pretty">{s.body}</p>

            {i === steps.length - 1 && (
              <div className="rule-spectrum mt-8 w-24" />
            )}
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
