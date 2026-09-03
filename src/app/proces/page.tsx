import type { Metadata } from 'next';
import Link from 'next/link';
import { pillars } from '@/lib/site';
import { DepthProcess } from '@/components/sections/DepthProcess';
import { ImageReveal, Parallax } from '@/components/motion/Media';
import { LineReveal, Reveal } from '@/components/motion/Reveal';
import { MetaList, PageHeader, SectionLabel } from '@/components/ui/Bits';

export const metadata: Metadata = {
  title: 'Proces — od upita do predaje',
  description:
    'Sedam koraka dubinskog čišćenja: procena materijala, pretretman, dubinsko pranje, para i dezinfekcija, ekstrakcija vlage i provera detalja.',
  alternates: { canonical: '/proces' },
};

export default function ProcesPage() {
  return (
    <>
      <PageHeader
        code="03"
        eyebrow="Proces"
        lines={['Od površine', 'nadole.']}
        titleSize="text-[clamp(2.2rem,17cqi,7.5rem)]"
        lede={
          <>
            Redosled je uvek isti. Menja se materijal, a sa njim i jačina,
            temperatura i sredstvo. Ništa se ne preskače zato što se ne vidi.
          </>
        }
        meta={[
          { k: 'Koraka', v: '07' },
          { k: 'Slojeva', v: 'Površina / Vlakno / Dubina' },
          { k: 'Kraj', v: 'Provera detalja' },
        ]}
      />

      <section className="pb-16 md:pb-24">
        <DepthProcess />
      </section>

      {/* Metod — četiri stuba kao tehnički rezime */}
      <section className="bg-ink text-paper">
        <div className="edge py-20 md:py-28">
          <SectionLabel code="03.1" invert>
            Metod
          </SectionLabel>

          <div className="mt-10 grid gap-12 md:mt-16 md:grid-cols-12 md:gap-8">
            <div className="cq md:col-span-5">
              <LineReveal
                as="h2"
                lines={['Četiri stvari', 'koje moraju', 'da se poklope.']}
                className="t-display text-[clamp(1.6rem,15cqi,3.8rem)]"
              />
              <Reveal delay={0.2} className="mt-8">
                <Parallax amount={20}>
                  <ImageReveal
                    src="/media/detalj-velur-posle.jpg"
                    alt="Makro detalj velura posle dubinskog pranja"
                    ratio="880 / 720"
                    shear="right"
                    sizes="(max-width: 768px) 100vw, 34vw"
                  />
                </Parallax>
              </Reveal>
            </div>

            <div className="md:col-span-6 md:col-start-7">
              <ul>
                {pillars.map((p, i) => (
                  <Reveal
                    as="li"
                    key={p.code}
                    delay={i * 0.08}
                    className="cq border-t border-paper/15 py-6 last:border-b"
                  >
                    <p className="t-meta-sm text-paper/45">{p.code}</p>
                    <h3 className="t-display mt-2 text-[clamp(1.4rem,9cqi,2.4rem)]">
                      {p.title}
                    </h3>
                    <p className="t-body mt-3 max-w-[44ch] text-paper/70 pretty">
                      {p.body}
                    </p>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Šta je potrebno pre dolaska */}
      <section className="bg-paper-warm">
        <div className="edge py-20 md:py-28">
          <div className="grid gap-10 md:grid-cols-12 md:gap-8">
            <div className="cq md:col-span-5">
              <SectionLabel code="03.2">Pre dolaska</SectionLabel>
              <LineReveal
                as="h2"
                delay={0.08}
                lines={['Kratka lista.']}
                className="t-display mt-6 text-[clamp(1.8rem,18cqi,3.8rem)]"
              />
              <Reveal delay={0.18} className="mt-6">
                <p className="t-body max-w-[34ch] text-slate pretty">
                  Ništa komplikovano — samo ono što ubrzava posao i skraćuje
                  vreme sušenja.
                </p>
              </Reveal>
            </div>

            <div className="md:col-span-6 md:col-start-7">
              <Reveal delay={0.16}>
                <MetaList
                  items={[
                    { k: 'Fotografija', v: 'Predmet i zaprljanje' },
                    { k: 'Materijal', v: 'Ako je poznat' },
                    { k: 'Pristup', v: 'Slobodan prostor oko predmeta' },
                    { k: 'Sitnice', v: 'Sklonjene sa i ispod predmeta' },
                    { k: 'Provetravanje', v: 'Otvoren prozor tokom sušenja' },
                  ]}
                />
              </Reveal>

              <Reveal delay={0.26} className="mt-10 flex flex-wrap gap-3">
                <Link href="/kontakt" className="btn btn-ink shear-l">
                  Pošalji upit
                </Link>
                <Link href="/rezultati" className="btn btn-line">
                  Rezultati
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
