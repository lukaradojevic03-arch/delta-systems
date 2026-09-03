import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { services } from '@/lib/site';
import { PageHeader, SectionLabel, MetaList } from '@/components/ui/Bits';
import { ServiceRows } from '@/components/sections/ServiceRows';
import { ImageReveal, Parallax } from '@/components/motion/Media';
import { LineReveal, Reveal } from '@/components/motion/Reveal';

export const metadata: Metadata = {
  title: 'Usluge — dubinsko čišćenje nameštaja i vozila',
  description:
    'Dve celine: nameštaj i vozila. Dubinsko pranje upijajućih površina, parno čišćenje onih koje ne upijaju, dezinfekcija i brzo sušenje.',
  alternates: { canonical: '/usluge' },
};

export default function UslugePage() {
  return (
    <>
      <PageHeader
        code="02"
        eyebrow="Usluge"
        lines={['Dve celine.', 'Jedan metod.']}
        titleSize="text-[clamp(1.89rem,12.5cqi,5.85rem)]"
        lede={
          <>
            Nameštaj i vozila razlikuju se po pristupu i pristupačnosti, ne po
            standardu. Redosled tretmana je isti — menja se materijal.
          </>
        }
        meta={[
          { k: 'Celine', v: 'Nameštaj / Vozila' },
          { k: 'Metod', v: '4 koraka' },
          { k: 'Područje', v: 'Beograd' },
        ]}
      />

      <section className="edge pb-14 md:pb-20">
        <ServiceRows detailed />
      </section>

      {/* Gde se to radi — ambijent, puna širina */}
      <section className="relative">
        <div className="grid gap-px bg-ink/10 sm:grid-cols-3">
          {[
            {
              src: '/media/amb-dnevna-siva.jpg',
              alt: 'Dnevna soba sa svetlom tapaciranom garniturom',
              k: 'A.01',
              t: 'Stan i kuća',
              s: 'Garniture, fotelje, tepisi',
            },
            {
              src: '/media/amb-dusek.jpg',
              alt: 'Spavaća soba sa dušekom i tapaciranim uzglavljem',
              k: 'A.02',
              t: 'Spavaći deo',
              s: 'Dušeci, uzglavlja, tekstil',
            },
            {
              src: '/media/amb-sediste.jpg',
              alt: 'Tapacirano sedište iz blizine',
              k: 'A.03',
              t: 'Enterijer vozila',
              s: 'Sedišta, patosnice, tapacirung',
            },
          ].map((x, i) => (
            <Reveal key={x.k} delay={i * 0.08} className="cq group relative">
              <div className="relative aspect-[4/3] overflow-hidden bg-ink">
                <Image
                  src={x.src}
                  alt={x.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  quality={78}
                  className="object-cover transition-transform duration-[1400ms] ease-delta group-hover:scale-[1.06]"
                />
                <span
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(14,17,22,0) 0%, rgba(14,17,22,0.55) 42%, rgba(14,17,22,0.93) 100%)',
                  }}
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="t-meta-sm block text-paper/50">{x.k}</span>
                  <span className="t-display mt-1 block text-[clamp(1.15rem,5.4cqi,1.9rem)] text-paper">
                    {x.t}
                  </span>
                  <span className="t-meta-sm mt-1.5 block text-paper/65">{x.s}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Matrica površina — tehnički pregled, ne marketinški grid */}
      <section className="bg-ink text-paper">
        <div className="edge py-14 md:py-20">
          <SectionLabel code="02.1" invert>
            Površina → metod
          </SectionLabel>

          <div className="mt-10 grid gap-12 md:mt-14 md:grid-cols-12 md:gap-8">
            <div className="cq md:col-span-5">
              <LineReveal
                as="h2"
                lines={['Metod se bira', 'po materijalu.']}
                className="t-display text-[clamp(1.46rem,11.7cqi,3.28rem)]"
              />
              <Reveal delay={0.18} className="mt-7">
                <p className="t-body max-w-[38ch] text-paper/70 pretty">
                  Podela je jednostavna: ono što upija radi se ekstrakcijom, ono
                  što ne upija radi se parom. Sve ostalo su detalji — i oni
                  odlučuju.
                </p>
              </Reveal>

              <Reveal delay={0.26} className="mt-10">
                <Parallax amount={22}>
                  <ImageReveal
                    src="/media/detalj-tkanina.jpg"
                    alt="Detalj tkanine na sedećem delu garniture"
                    ratio="900 / 600"
                    shear="right"
                    sizes="(max-width: 768px) 100vw, 34vw"
                  />
                </Parallax>
              </Reveal>
            </div>

            <div className="md:col-span-6 md:col-start-7">
              {services.map((s, i) => (
                <Reveal key={s.slug} delay={i * 0.12} className="mb-12 last:mb-0">
                  <p className="t-meta text-paper/55">
                    {s.code} — {s.title}
                  </p>
                  <MetaList
                    invert
                    className="mt-4"
                    items={s.surfaces.map((x) => ({ k: x.label, v: x.method }))}
                  />
                  <Link
                    href={`/usluge/${s.slug}`}
                    className="link-delta t-meta mt-5 inline-block text-paper/80"
                  >
                    {s.title} — detaljno →
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper-warm">
        <div className="edge py-14 md:py-20">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="cq md:col-span-6">
              <LineReveal
                as="h2"
                lines={['Niste sigurni', 'šta vam treba?']}
                className="t-display text-[clamp(1.46rem,10.9cqi,3.12rem)]"
              />
            </div>
            <div className="md:col-span-4 md:col-start-8">
              <Reveal delay={0.15}>
                <p className="t-body text-slate pretty">
                  Pošaljite fotografiju predmeta i opis zaprljanja. Materijal i
                  tip tretmana utvrđujemo po njoj.
                </p>
              </Reveal>
              <Reveal delay={0.22} className="mt-7">
                <Link href="/kontakt" className="btn btn-spectrum shear-l">
                  Pošalji upit
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
