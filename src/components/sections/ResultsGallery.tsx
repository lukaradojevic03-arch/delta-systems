'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import type { CaseStudy } from '@/lib/site';
import { cases } from '@/lib/site';
import { cn, EASE } from '@/lib/cn';
import { DeltaSlider } from '@/components/ui/DeltaSlider';
import { Diptych, MetaList } from '@/components/ui/Bits';

const FILTERS = ['Sve', 'Nameštaj', 'Vozila'] as const;
type Filter = (typeof FILTERS)[number];

export function ResultsGallery() {
  const [filter, setFilter] = useState<Filter>('Sve');

  const list = useMemo(
    () => (filter === 'Sve' ? cases : cases.filter((c) => c.category === filter)),
    [filter],
  );

  return (
    <>
      <div className="edge flex flex-wrap items-center gap-x-8 gap-y-3 border-b border-ink/12 pb-5">
        <span className="t-meta-sm text-stone">Filter</span>
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={cn(
              't-meta link-delta transition-colors duration-500',
              filter === f ? 'text-ink' : 'text-stone hover:text-ink',
            )}
          >
            {f}
          </button>
        ))}
        <span className="t-meta-sm ml-auto text-stone">
          {String(list.length).padStart(2, '0')} slučaj
          {list.length === 1 ? '' : 'a'}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          {list.map((c, i) => (
            <CaseEntry key={c.id} data={c} variant={i % 3} />
          ))}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

/* ------------------------------------------------------------------ */

function CaseEntry({ data, variant }: { data: CaseStudy; variant: number }) {
  const meta = [
    { k: 'Kategorija', v: data.category },
    { k: 'Materijal', v: data.material },
    { k: 'Tretman', v: data.treatment },
  ];

  const Head = (
    <div className="cq">
      <span className="t-meta block text-stone">{data.code}</span>
      <h2 className="t-display mt-2 text-[clamp(1.38rem,9.4cqi,3.12rem)]">
        {data.title}
      </h2>
    </div>
  );

  const Media = data.compare ? (
    <DeltaSlider
      before={data.compare.before.src}
      after={data.compare.after.src}
      beforeAlt={data.compare.before.alt}
      afterAlt={data.compare.after.alt}
      ratio={data.compare.ratio}
      sizes={variant === 1 ? '(max-width: 768px) 100vw, 72vw' : '(max-width: 768px) 100vw, 52vw'}
      label={`${data.title} — poređenje pre i posle`}
    />
  ) : (
    <Diptych
      frames={data.frames ?? []}
      sizes={variant === 1 ? '(max-width: 768px) 46vw, 34vw' : '(max-width: 768px) 46vw, 26vw'}
    />
  );

  /* Varijanta 0 — medij desno, podaci levo */
  if (variant === 0) {
    return (
      <section className="edge border-b border-ink/12 py-12 md:py-18">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            {Head}
            <p className="t-body mt-6 max-w-[32ch] text-slate pretty">{data.note}</p>
            <MetaList className="mt-8" items={meta} />
          </div>
          <div className="md:col-span-7 md:col-start-6">{Media}</div>
        </div>
      </section>
    );
  }

  /* Varijanta 1 — široki medij, podaci ispod u dve kolone */
  if (variant === 1) {
    return (
      <section className="edge border-b border-ink/12 py-12 md:py-18">
        {Head}
        <div className="mt-8 md:mt-10">{Media}</div>
        <div className="mt-8 grid gap-8 md:grid-cols-12">
          <p className="t-lede md:col-span-5 text-ink/80 pretty">{data.note}</p>
          <MetaList className="md:col-span-4 md:col-start-9" items={meta} />
        </div>
      </section>
    );
  }

  /* Varijanta 2 — medij levo sa uvlakom, podaci desno */
  return (
    <section className="edge border-b border-ink/12 py-12 md:py-18">
      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-6 md:col-start-2">{Media}</div>
        <div className="md:col-span-4 md:col-start-9 md:pt-10">
          {Head}
          <p className="t-body mt-6 max-w-[32ch] text-slate pretty">{data.note}</p>
          <MetaList className="mt-8" items={meta} />
        </div>
      </div>
    </section>
  );
}
