import Image from 'next/image';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { LineReveal, Reveal, RuleReveal } from '@/components/motion/Reveal';

/* ------------------------------------------------------------------ */
/*  Zaglavlje stranice                                                 */
/* ------------------------------------------------------------------ */

export function PageHeader({
  code,
  eyebrow,
  lines,
  lede,
  meta,
  /** cqi koeficijent naslova — bira se prema dužini najdužeg reda */
  titleSize = 'text-[clamp(2.2rem,17cqi,7.5rem)]',
}: {
  code: string;
  eyebrow: string;
  lines: string[];
  lede: ReactNode;
  meta?: { k: string; v: string }[];
  titleSize?: string;
}) {
  return (
    <header className="edge pb-12 pt-[132px] md:pb-20 md:pt-[188px]">
      <Reveal>
        <p className="t-meta text-stone">
          {code} — {eyebrow}
        </p>
      </Reveal>

      <div className="mt-6 grid gap-8 md:mt-10 md:grid-cols-12 md:gap-10">
        <div className="cq md:col-span-8">
          <LineReveal
            as="h1"
            lines={lines}
            delay={0.08}
            className={cn('t-display', titleSize)}
          />
        </div>

        <div className="md:col-span-4 md:col-start-9 md:pt-3">
          <Reveal delay={0.22}>
            <p className="t-lede max-w-[42ch] text-ink/80 pretty">{lede}</p>
          </Reveal>

          {meta && (
            <Reveal delay={0.3}>
              <dl className="mt-8 space-y-2.5">
                {meta.map((m) => (
                  <div
                    key={m.k}
                    className="flex items-baseline gap-4 border-t border-ink/12 pt-2.5"
                  >
                    <dt className="t-meta-sm w-28 shrink-0 text-stone">{m.k}</dt>
                    <dd className="t-meta-sm text-ink">{m.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          )}
        </div>
      </div>

      <RuleReveal className="mt-14 md:mt-20" delay={0.35} spectrum />
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Oznaka sekcije                                                     */
/* ------------------------------------------------------------------ */

export function SectionLabel({
  code,
  children,
  className,
  invert = false,
}: {
  code: string;
  children: ReactNode;
  className?: string;
  invert?: boolean;
}) {
  return (
    <Reveal className={cn('flex items-baseline gap-4', className)}>
      <span className={cn('t-meta-sm', invert ? 'text-paper/45' : 'text-stone')}>
        {code}
      </span>
      <span className={cn('t-meta', invert ? 'text-paper/80' : 'text-ink')}>
        {children}
      </span>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Diptih — dva kadra koja se ne poklapaju, pa se ne lažira klizač    */
/* ------------------------------------------------------------------ */

export function Diptych({
  frames,
  ratio = '752 / 960',
  className,
  sizes = '(max-width: 768px) 46vw, 24vw',
}: {
  frames: { src: string; alt: string; state: 'PRE' | 'POSLE' }[];
  ratio?: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <div className={cn('grid grid-cols-2 gap-2 md:gap-3', className)}>
      {frames.map((f, i) => (
        <Reveal key={f.src} delay={i * 0.12}>
          <figure className="relative">
            <div
              className="relative overflow-hidden bg-paper-bone grain"
              style={{ aspectRatio: ratio }}
            >
              <Image
                src={f.src}
                alt={f.alt}
                fill
                sizes={sizes}
                quality={84}
                className="object-cover"
              />
              <span
                className={cn(
                  't-meta-sm absolute left-0 top-0 px-2.5 py-1.5 backdrop-blur-[2px]',
                  f.state === 'PRE'
                    ? 'bg-ink/85 text-paper'
                    : 'bg-paper/90 text-ink',
                )}
              >
                {f.state === 'PRE' ? 'Pre' : 'Posle'}
              </span>
            </div>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Tehnički red metapodataka                                          */
/* ------------------------------------------------------------------ */

export function MetaList({
  items,
  invert = false,
  className,
}: {
  items: { k: string; v: string }[];
  invert?: boolean;
  className?: string;
}) {
  return (
    <dl className={cn('space-y-0', className)}>
      {items.map((m) => (
        <div
          key={m.k}
          className={cn(
            'flex items-baseline justify-between gap-6 border-t py-2.5',
            invert ? 'border-paper/15' : 'border-ink/12',
          )}
        >
          <dt className={cn('t-meta-sm', invert ? 'text-paper/45' : 'text-stone')}>
            {m.k}
          </dt>
          <dd
            className={cn(
              't-meta-sm text-right',
              invert ? 'text-paper/90' : 'text-ink',
            )}
          >
            {m.v}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* ------------------------------------------------------------------ */
/*  Skala dubine — ponavljajući motiv (površina → vlakno → dubina)     */
/* ------------------------------------------------------------------ */

export function DepthScale({
  invert = false,
  className,
}: {
  invert?: boolean;
  className?: string;
}) {
  const marks = ['Površina', 'Vlakno', 'Osnova'];
  return (
    <div className={cn('flex gap-3', className)} aria-hidden="true">
      <div
        className={cn(
          'w-3 shrink-0',
          invert ? 'depth-ticks-invert' : 'depth-ticks',
        )}
      />
      <div className="flex flex-col justify-between py-0.5">
        {marks.map((m) => (
          <span
            key={m}
            className={cn('t-meta-sm', invert ? 'text-paper/40' : 'text-stone')}
          >
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}
