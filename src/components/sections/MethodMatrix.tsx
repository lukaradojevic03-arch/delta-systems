'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { cn, EASE } from '@/lib/cn';

/**
 * „Šta imate → šta se radi" — mali alat umesto još jednog bloka teksta.
 *
 * Sadržaj je izveden isključivo iz dokumentovanog metoda (dubinsko pranje,
 * para, sušenje, dezinfekcija). Nema rokova, cena ni obećanja.
 */

type Entry = {
  id: string;
  label: string;
  group: 'Nameštaj' | 'Vozilo';
  absorbs: boolean;
  method: string;
  what: string;
  after: string;
};

const ENTRIES: Entry[] = [
  {
    id: 'garnitura',
    label: 'Garnitura ili sofa',
    group: 'Nameštaj',
    absorbs: true,
    method: 'Dubinsko pranje',
    what: 'Sedišta, nasloni, bočne strane, ivice i šavovi. Fleke i zone najveće upotrebe idu na pretretman, pa onda ekstrakcija.',
    after: 'Ton tkanine se ujednačava po celoj površini. Vlaga se izvlači u istom prolazu, pa se garnitura ranije vraća u upotrebu.',
  },
  {
    id: 'fotelja',
    label: 'Fotelja ili tabure',
    group: 'Nameštaj',
    absorbs: true,
    method: 'Dubinsko pranje',
    what: 'Ceo komad, uključujući donji deo i prostor oko nogara gde se prljavština najviše zadržava.',
    after: 'Mrlje izlaze iz vlakna umesto da se razmazuju po njemu.',
  },
  {
    id: 'dusek',
    label: 'Dušek',
    group: 'Nameštaj',
    absorbs: true,
    method: 'Dubinsko pranje + dezinfekcija',
    what: 'Obe strane i bočne trake. Posle ekstrakcije ide dubinska dezinfekcija.',
    after: 'Uklanjaju se bakterije, virusi i alergeni — deo koji se ne vidi, a najviše znači kod alergija.',
  },
  {
    id: 'tepih',
    label: 'Tepih ili staza',
    group: 'Nameštaj',
    absorbs: true,
    method: 'Dubinsko pranje',
    what: 'Vlakno se otvara, prljavština se veže za rastvor i izvlači zajedno sa njim.',
    after: 'Prašina i mast koje su se slegle u osnovu tepiha izlaze napolje, ne ostaju ispod.',
  },
  {
    id: 'stolice',
    label: 'Trpezarijske stolice',
    group: 'Nameštaj',
    absorbs: true,
    method: 'Dubinsko pranje',
    what: 'Sedište i naslon; kod kombinovanih modela drveni i plastični delovi idu parom.',
    after: 'Masne mrlje oko sedišta se uklanjaju bez razmazivanja po tkanini.',
  },
  {
    id: 'podloge',
    label: 'Koža, plastika, staklo',
    group: 'Nameštaj',
    absorbs: false,
    method: 'Parno čišćenje',
    what: 'Radi temperatura, ne sredstvo. Para skida naslage sa površine koja ne upija.',
    after: 'Bez hemijskog taloga koji kasnije hvata prašinu.',
  },
  {
    id: 'sedista',
    label: 'Sedišta u vozilu',
    group: 'Vozilo',
    absorbs: true,
    method: 'Dubinsko pranje',
    what: 'Prednja sedišta, zadnja klupa, bočne strane i prostor između sedišta.',
    after: 'Tekstil se vraća na ujednačen ton; miris odlazi zajedno sa izvorom.',
  },
  {
    id: 'patosnice',
    label: 'Patosnice i prtljažnik',
    group: 'Vozilo',
    absorbs: true,
    method: 'Dubinsko pranje',
    what: 'Delovi koji primaju najviše spolja — blato, so, pesak.',
    after: 'Vlakno se prazni do osnove, a vlaga izvlači da kabina ne ostane vlažna.',
  },
  {
    id: 'kabina',
    label: 'Tvrde površine kabine',
    group: 'Vozilo',
    absorbs: false,
    method: 'Parno čišćenje',
    what: 'Tapacirung vrata, konzola, otvori ventilacije i detalji do kojih se teško dolazi.',
    after: 'Bez hemikalija u zatvorenom prostoru u kojem se posle sedi.',
  },
];

export function MethodMatrix({ filter }: { filter?: 'Nameštaj' | 'Vozilo' }) {
  const list = filter ? ENTRIES.filter((e) => e.group === filter) : ENTRIES;
  const [active, setActive] = useState(list[0].id);
  const current = list.find((e) => e.id === active) ?? list[0];

  return (
    <div className="grid gap-6 md:grid-cols-12 md:gap-8">
      {/* izbor */}
      <div className="md:col-span-5">
        <p className="t-meta-sm mb-4 text-slate">Izaberite predmet</p>
        <ul className="flex flex-wrap gap-2 md:flex-col md:gap-0">
          {list.map((e) => {
            const on = e.id === current.id;
            return (
              <li key={e.id} className="md:w-full">
                <button
                  type="button"
                  onClick={() => setActive(e.id)}
                  aria-pressed={on}
                  className={cn(
                    'group flex w-full items-center justify-between gap-3 text-left transition-colors duration-500',
                    'rounded-none px-4 py-3 md:border-t md:border-ink/12 md:px-0 md:py-3.5 md:last:border-b',
                    on
                      ? 'bg-azure-700 text-paper md:bg-transparent md:text-ink'
                      : 'bg-azure-50 text-slate hover:text-ink md:bg-transparent',
                  )}
                >
                  <span
                    className={cn(
                      'font-sans text-[0.9375rem] transition-transform duration-500 ease-delta md:text-[1.0625rem]',
                      on && 'md:translate-x-1.5 md:font-medium',
                    )}
                  >
                    {e.label}
                  </span>
                  <span
                    className={cn(
                      't-meta-sm hidden shrink-0 transition-opacity duration-500 md:block',
                      on ? 'text-azure-700 opacity-100' : 'opacity-0',
                    )}
                    aria-hidden="true"
                  >
                    →
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* rezultat */}
      <div className="md:col-span-6 md:col-start-7">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="relative bg-azure-50 p-6 sm:p-8"
          >
            <span
              className="absolute inset-y-0 left-0 w-[3px] bg-azure-600"
              aria-hidden="true"
            />

            <div className="flex flex-wrap items-center gap-3">
              <span
                className={cn(
                  't-meta-sm px-2.5 py-1.5',
                  current.absorbs
                    ? 'bg-azure-700 text-paper'
                    : 'bg-ink text-paper',
                )}
              >
                {current.absorbs ? 'Upija' : 'Ne upija'}
              </span>
              <span className="t-meta text-azure-800">{current.method}</span>
            </div>

            <h3 className="t-display mt-5 text-[clamp(1.25rem,3.4vw,1.9rem)] text-ink">
              {current.label}
            </h3>

            <dl className="mt-5 space-y-4">
              <div>
                <dt className="t-meta-sm text-slate">Šta se radi</dt>
                <dd className="t-body mt-1.5 text-ink/85 pretty">{current.what}</dd>
              </div>
              <div>
                <dt className="t-meta-sm text-slate">Šta se dobija</dt>
                <dd className="t-body mt-1.5 text-ink/85 pretty">{current.after}</dd>
              </div>
            </dl>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
