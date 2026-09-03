'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn, EASE } from '@/lib/cn';

/**
 * Traka materijala — puna širina, bez ivica.
 *
 * Fotografije su licencirane atmosferske/materijalne snimke (Pexels).
 * Nikada ne nose oznaku PRE/POSLE i nikada se ne predstavljaju kao
 * rezultati klijenta — služe da se vidi na kojim se površinama radi.
 */

const MATERIALS = [
  {
    code: 'MT.01',
    label: 'Velur',
    method: 'Dubinsko pranje',
    src: '/media/mat-velur-rose.jpg',
    alt: 'Nabori velura u toplom bakarnom tonu',
  },
  {
    code: 'MT.02',
    label: 'Štof',
    method: 'Dubinsko pranje',
    src: '/media/mat-velur-bordo.jpg',
    alt: 'Rebrasta tapacirna tkanina u bordo tonu',
  },
  {
    code: 'MT.03',
    label: 'Koža',
    method: 'Parno čišćenje',
    src: '/media/mat-koza.jpg',
    alt: 'Makro snimak zrna crne kože',
  },
  {
    code: 'MT.04',
    label: 'Vuna i tepih',
    method: 'Dubinsko pranje',
    src: '/media/mat-vuna.jpg',
    alt: 'Grubo tkano vuneno vlakno iz blizine',
  },
];

export function MaterialBand({ className }: { className?: string }) {
  return (
    <section
      className={cn('relative bg-ink', className)}
      aria-labelledby="materijali-naslov"
    >
      <h2 id="materijali-naslov" className="sr-only">
        Materijali na kojima radimo
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4">
        {MATERIALS.map((m, i) => (
          <motion.figure
            key={m.code}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.9, delay: i * 0.08, ease: EASE }}
            className="cq group relative aspect-[5/6] overflow-hidden sm:aspect-[4/3] lg:aspect-[3/4]"
          >
            <Image
              src={m.src}
              alt={m.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
              quality={80}
              className="object-cover transition-transform duration-[1400ms] ease-delta group-hover:scale-[1.07]"
            />

            {/* gradijent samo radi čitljivosti oznake */}
            <span
              className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4"
              style={{
                background:
                  'linear-gradient(180deg, rgba(14,17,22,0) 0%, rgba(14,17,22,0.55) 42%, rgba(14,17,22,0.93) 100%)',
              }}
              aria-hidden="true"
            />

            <figcaption className="absolute inset-x-0 bottom-0 p-4 md:p-5">
              <span className="t-meta-sm block text-paper/50">{m.code}</span>
              <span className="t-display mt-2 block text-[clamp(1.05rem,4.6cqi,1.7rem)] text-paper">
                {m.label}
              </span>
              <span className="t-meta-sm mt-1.5 block text-paper/65">
                {m.method}
              </span>
              <span
                className="rule-spectrum mt-3 block w-full origin-left scale-x-0 transition-transform duration-[900ms] ease-delta group-hover:scale-x-100"
                aria-hidden="true"
              />
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
