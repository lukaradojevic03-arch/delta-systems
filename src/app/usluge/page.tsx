import type { Metadata } from 'next';
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
        titleSize="text-[clamp(2.2rem,16cqi,7.5rem)]"
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

      <section className="edge pb-20 md:pb-28">
        <ServiceRows detailed />
      </section>

      {/* Matrica površina — tehnički pregled, ne marketinški grid */}
      <section className="bg-ink text-paper">
        <div className="edge py-20 md:py-28">
          <SectionLabel code="02.1" invert>
            Površina → metod
          </SectionLabel>

          <div className="mt-10 grid gap-12 md:mt-14 md:grid-cols-12 md:gap-8">
            <div className="cq md:col-span-5">
              <LineReveal
                as="h2"
                lines={['Metod se bira', 'po materijalu.']}
                className="t-display text-[clamp(1.7rem,15cqi,4.2rem)]"
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
        <div className="edge py-20 md:py-28">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="cq md:col-span-6">
              <LineReveal
                as="h2"
                lines={['Niste sigurni', 'šta vam treba?']}
                className="t-display text-[clamp(1.7rem,14cqi,4rem)]"
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
                <Link href="/kontakt" className="btn btn-ink shear-l">
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
