import type { Metadata } from 'next';
import { pillars } from '@/lib/site';
import { DepthProcess } from '@/components/sections/DepthProcess';
import { ImageReveal, Parallax } from '@/components/motion/Media';
import { LineReveal, Reveal } from '@/components/motion/Reveal';
import { MetaList, PageHeader, SectionLabel } from '@/components/ui/Bits';
import { Comparison } from '@/components/sections/Comparison';

export const metadata: Metadata = {
  title: 'Proces · Od upita do predaje',
  description:
    'Sedam koraka dubinskog čišćenja: procena materijala, pretretman, dubinsko pranje, para i dezinfekcija, ekstrakcija vlage i provera detalja.',
  alternates: { canonical: '/proces' },
};

export default function ProcesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Proces"
        lines={['Od površine', 'nadole.']}
        titleSize="text-[clamp(1.89rem,13.3cqi,5.85rem)]"
        lede={
          <>
            Redosled je uvek isti. Menja se materijal, a sa njim i jačina,
            temperatura i sredstvo. Ništa se ne preskače zato što se ne vidi.
          </>
        }
      />

      {/* Tri sloja · materijalni ključ za lenjir dubine */}
      <section className="edge pb-12 md:pb-16">
        <div className="grid grid-cols-3 gap-3 md:gap-5">
          {[
            {
              src: '/media/mat-koza.jpg',
              alt: 'Makro snimak zrna kože',
              t: 'Površina',
            },
            {
              src: '/media/mat-velur-rose.jpg',
              alt: 'Nabori velura izbliza',
              t: 'Vlakno',
            },
            {
              src: '/media/mat-vuna.jpg',
              alt: 'Grubo tkano vuneno vlakno',
              t: 'Osnova',
            },
          ].map((x, i) => (
            <Reveal key={x.t} delay={i * 0.1} className="cq">
              <ImageReveal
                src={x.src}
                alt={x.alt}
                ratio="4 / 3"
                shear={i === 1 ? 'right' : undefined}
                sizes="(max-width: 768px) 30vw, 30vw"
              />
              <div className="mt-3 flex items-center gap-3">
                <span className="block h-px w-5 bg-azure-400" aria-hidden="true" />
                <span className="t-meta text-azure-700">{x.t}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="pb-12 md:pb-18">
        <DepthProcess />
      </section>

      {/* Metod · četiri stuba kao tehnički rezime */}
      <section className="bg-ink text-paper">
        <div className="edge py-14 md:py-20">
          <SectionLabel invert>
            Metod
          </SectionLabel>

          <div className="mt-10 grid gap-12 md:mt-16 md:grid-cols-12 md:gap-8">
            <div className="cq md:col-span-5">
              <LineReveal
                as="h2"
                lines={['Četiri stvari', 'koje moraju', 'da se poklope.']}
                className="t-display text-[clamp(1.38rem,11.7cqi,2.96rem)]"
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
                    <h3 className="t-display text-[clamp(1.2rem,7cqi,1.87rem)]">
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

      {/* Dokle koji postupak stiže */}
      <section className="bg-azure-50">
        <div className="edge py-14 md:py-20">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="cq md:col-span-5">
              <SectionLabel>Razlika</SectionLabel>
              <LineReveal
                as="h2"
                delay={0.08}
                lines={['Zašto se ovo', 'ne rešava', 'usisivačem.']}
                className="t-display mt-5 text-[clamp(1.4rem,12cqi,3rem)]"
              />
            </div>
            <div className="md:col-span-6 md:col-start-7 md:pt-4">
              <Reveal delay={0.16}>
                <p className="t-body max-w-[44ch] text-slate pretty">
                  Redovno usisavanje je neophodno, ali radi samo na površini.
                  Ispod nje se sloj nastavlja i raste.
                </p>
              </Reveal>
            </div>
          </div>
          <Comparison className="mt-10 md:mt-12" />
        </div>
      </section>

      {/* Šta je potrebno pre dolaska */}
      <section className="bg-paper-warm">
        <div className="edge py-14 md:py-20">
          <div className="grid gap-10 md:grid-cols-12 md:gap-8">
            <div className="cq md:col-span-5">
              <SectionLabel>Pre dolaska</SectionLabel>
              <LineReveal
                as="h2"
                delay={0.08}
                lines={['Kratka lista.']}
                className="t-display mt-6 text-[clamp(1.55rem,14cqi,2.96rem)]"
              />
              <Reveal delay={0.18} className="mt-6">
                <p className="t-body max-w-[34ch] text-slate pretty">
                  Ništa komplikovano, samo ono što ubrzava posao i skraćuje
                  vreme sušenja.
                </p>
              </Reveal>
            </div>

            <div className="md:col-span-6 md:col-start-7">
              <Reveal delay={0.16}>
                <MetaList
                  columns={2}
                  items={[
                    { k: 'Fotografija', v: 'Predmet i zaprljanje' },
                    { k: 'Materijal', v: 'Ako je poznat' },
                    { k: 'Pristup', v: 'Slobodan prostor oko predmeta' },
                    { k: 'Sitnice', v: 'Sklonjene sa i ispod predmeta' },
                    { k: 'Provetravanje', v: 'Otvoren prozor tokom sušenja' },
                  ]}
                />
              </Reveal>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
