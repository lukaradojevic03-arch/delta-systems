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
  /** cqi koeficijent naslova · bira se prema dužini najdužeg reda */
  titleSize = 'text-[clamp(1.89rem,13.3cqi,5.85rem)]',
}: {
  code: string;
  eyebrow: string;
  lines: string[];
  lede: ReactNode;
  meta?: { k: string; v: string }[];
  titleSize?: string;
}) {
  return (
    <header className="edge pb-9 pt-[104px] md:pb-14 md:pt-[136px]">
      <Reveal>
        <p className="t-meta text-stone">
          {code} · {eyebrow}
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
              <MetaList className="mt-8" items={meta} />
            </Reveal>
          )}
        </div>
      </div>

      <RuleReveal className="mt-8 md:mt-10" delay={0.35} spectrum />
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
/*  Diptih · dva kadra koja se ne poklapaju, pa se ne lažira klizač    */
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
  columns = 1,
}: {
  items: { k: string; v: string }[];
  invert?: boolean;
  className?: string;
  /** 2 kada kolona ima dovoljno širine */
  columns?: 1 | 2;
}) {
  return (
    <dl
      className={cn(
        'grid gap-x-8 gap-y-5',
        columns === 2 && 'sm:grid-cols-2',
        className,
      )}
    >
      {items.map((m) => (
        <div
          key={m.k}
          className={cn(
            'border-l-2 pl-4',
            invert ? 'border-azure-400/60' : 'border-azure-200',
          )}
        >
          <dt
            className={cn(
              't-meta-sm',
              invert ? 'text-paper/50' : 'text-slate',
            )}
          >
            {m.k}
          </dt>
          <dd
            className={cn(
              'mt-1.5 font-sans text-[0.9375rem] leading-snug tracking-[-0.008em] md:text-base',
              invert ? 'text-paper' : 'text-ink',
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
/*  Skala dubine · ponavljajući motiv (površina → vlakno → dubina)     */
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
