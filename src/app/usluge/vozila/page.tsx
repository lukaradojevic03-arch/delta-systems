import type { Metadata } from 'next';
import Link from 'next/link';
import { getService } from '@/lib/site';
import { ImageReveal, Parallax } from '@/components/motion/Media';
import { LineReveal, Reveal, RuleReveal } from '@/components/motion/Reveal';
import { MetaList, PageHeader, SectionLabel } from '@/components/ui/Bits';
import { MethodMatrix } from '@/components/sections/MethodMatrix';

export const metadata: Metadata = {
  title: 'Vozila — dubinsko pranje sedišta i enterijera',
  description:
    'Dubinsko pranje sedišta, patosnica i tapacirunga, parno čišćenje tvrdih površina i dezinfekcija enterijera — sa pažnjom prema materijalima i detaljima.',
  alternates: { canonical: '/usluge/vozila' },
};

const service = getService('vozila')!;

export default function VozilaPage() {
  return (
    <>
      <PageHeader
        code={service.code}
        eyebrow="Usluga — Vozila"
        lines={['Enterijer', 'do vlakna.']}
        titleSize="text-[clamp(2.06rem,15.6cqi,5.85rem)]"
        lede={service.lede}
        meta={[
          { k: 'Sedišta', v: 'Dubinsko pranje' },
          { k: 'Tvrde površine', v: 'Parno čišćenje' },
          { k: 'Kabina', v: 'Dezinfekcija' },
        ]}
      />

      {/* ---------------------------------------------------------- */}
      {/*  Tri čina: stanje → tretman → rezultat                      */}
      {/* ---------------------------------------------------------- */}

      {/* ČIN 01 — STANJE */}
      <section className="edge pb-12 md:pb-18">
        <div className="md:grid md:grid-cols-12 md:gap-8">
          <div className="cq md:col-span-3">
            <div className="md:sticky md:top-28 md:self-start">
              <p className="t-meta-sm text-stone">Čin 01</p>
              <h2 className="t-display mt-3 text-[clamp(1.46rem,18.7cqi,2.5rem)]">
                Stanje
              </h2>
              <div className="rule-spectrum mt-5 w-14" />
              <p className="t-body mt-5 max-w-[28ch] text-slate pretty">
                Ono što se nakupi u kabini ne stoji na površini. Tekstil sedišta
                i patosnice rade isto što i tepih u stanu.
              </p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 md:col-span-8 md:col-start-5 md:mt-0">
            <ImageReveal
              src="/media/vozilo-prednja-pre.jpg"
              alt="Prednja sedišta vozila pre dubinskog pranja"
              ratio="752 / 960"
              sizes="(max-width: 768px) 46vw, 28vw"
              shear="right"
            />
            <div className="mt-8 md:mt-12">
              <ImageReveal
                src="/media/vozilo-zadnja-pre.jpg"
                alt="Zadnja klupa u vozilu pre čišćenja enterijera"
                ratio="752 / 960"
                sizes="(max-width: 768px) 46vw, 28vw"
                delay={0.12}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ČIN 02 — TRETMAN (bez fotografije: to je deo koji se ne vidi) */}
      <section className="relative bg-ink text-paper">
        <div className="edge py-14 md:py-24">
          <div className="grid gap-10 md:grid-cols-12 md:gap-8">
            <div className="cq md:col-span-3">
              <p className="t-meta-sm text-paper/45">Čin 02</p>
              <h2 className="t-display mt-3 text-[clamp(1.46rem,18.7cqi,2.5rem)]">
                Tretman
              </h2>
              <div className="rule-spectrum mt-5 w-14" />

            </div>

            <div className="cq md:col-span-7 md:col-start-6">
              <LineReveal
                as="p"
                lines={['Deo posla koji', 'se ne fotografiše.']}
                className="t-display text-[clamp(1.38rem,9.4cqi,3.28rem)]"
              />

              <Reveal delay={0.2} className="mt-8">
                <p className="t-lede max-w-[44ch] text-paper/85 pretty">
                  Sedišta i patosnice idu na ekstrakciju — rastvor ulazi u
                  vlakno i izlazi zajedno sa prljavštinom. Plastika, staklo i
                  detalji oko ventilacije rade se parom, bez hemikalija.
                </p>
              </Reveal>

              <Reveal delay={0.28} className="mt-8">
                <p className="t-body max-w-[46ch] text-paper/60 pretty">
                  Na kraju ide dubinska dezinfekcija cele kabine i ekstrakcija
                  vlage, da vozilo ne ostane vlažno posle tretmana.
                </p>
              </Reveal>

              <div className="mt-9 grid grid-cols-3 gap-3">
                <ImageReveal
                  src="/media/amb-tapaciranje.jpg"
                  alt="Tapacirano sedište sa vertikalnim šavovima"
                  ratio="1 / 1"
                  sizes="(max-width: 768px) 30vw, 14vw"
                  delay={0.06}
                />
                <ImageReveal
                  src="/media/mat-koza.jpg"
                  alt="Makro snimak zrna crne kože"
                  ratio="1 / 1"
                  sizes="(max-width: 768px) 30vw, 14vw"
                  delay={0.12}
                />
                <ImageReveal
                  src="/media/mat-velur-petrol.jpg"
                  alt="Tamnozeleni velur u naborima"
                  ratio="1 / 1"
                  sizes="(max-width: 768px) 30vw, 14vw"
                  delay={0.18}
                />
              </div>
              <Reveal delay={0.24}>
                <p className="t-meta-sm mt-3 text-paper/45">
                  Materijali u kabini — tekstil, koža, tapacirung
                </p>
              </Reveal>

              <Reveal delay={0.34} className="mt-9">
                <MetaList
                  invert
                  items={service.surfaces.map((s) => ({
                    k: s.label,
                    v: s.method,
                  }))}
                />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ČIN 03 — REZULTAT */}
      <section className="edge py-12 md:py-20">
        <div className="md:grid md:grid-cols-12 md:gap-8">
          <div className="cq md:col-span-3">
            <div className="md:sticky md:top-28 md:self-start">
              <p className="t-meta-sm text-stone">Čin 03</p>
              <h2 className="t-display mt-3 text-[clamp(1.46rem,18.7cqi,2.5rem)]">
                Rezultat
              </h2>
              <div className="rule-spectrum mt-5 w-14" />
              <p className="t-body mt-5 max-w-[28ch] text-slate pretty">
                Čist enterijer. Bolji osećaj u svakoj vožnji.
              </p>
              <Reveal delay={0.12} className="mt-7">
                <Link href="/rezultati" className="btn btn-line">
                  Svi rezultati
                </Link>
              </Reveal>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 md:col-span-8 md:col-start-5 md:mt-0">
            <div className="mt-8 md:mt-12">
              <ImageReveal
                src="/media/vozilo-zadnja-posle.jpg"
                alt="Zadnja klupa u vozilu posle dubinskog pranja i dezinfekcije"
                ratio="752 / 960"
                sizes="(max-width: 768px) 46vw, 28vw"
                shear="left"
              />
            </div>
            <ImageReveal
              src="/media/vozilo-prednja-posle.jpg"
              alt="Prednja sedišta vozila posle dubinskog pranja"
              ratio="752 / 960"
              sizes="(max-width: 768px) 46vw, 28vw"
              delay={0.12}
            />
          </div>
        </div>
      </section>

      {/* Šta imate → šta se radi */}
      <section className="bg-azure-50">
        <div className="edge py-14 md:py-20">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="cq md:col-span-6">
              <SectionLabel code={`${service.code}.5`}>Provera</SectionLabel>
              <LineReveal
                as="h2"
                delay={0.08}
                lines={['Deo kabine,', 'pa postupak.']}
                className="t-display mt-5 text-[clamp(1.4rem,12cqi,3rem)]"
              />
            </div>
            <div className="md:col-span-5 md:col-start-8 md:pt-4">
              <Reveal delay={0.16}>
                <p className="t-body max-w-[40ch] text-slate pretty">
                  Tekstil i tvrde površine ne idu istim postupkom. Izaberite deo
                  kabine i vidite šta se radi.
                </p>
              </Reveal>
            </div>
          </div>
          <div className="mt-10 md:mt-12">
            <MethodMatrix filter="Vozilo" />
          </div>
        </div>
      </section>

      {/* Zone enterijera */}
      <section className="bg-paper-warm">
        <div className="edge py-14 md:py-20">
          <SectionLabel code={`${service.code}.4`}>Zone</SectionLabel>

          <div className="mt-10 grid gap-10 md:grid-cols-12 md:gap-8">
            <div className="cq md:col-span-5">
              <LineReveal
                as="h2"
                lines={['Sve što se', 'dodiruje.']}
                className="t-display text-[clamp(1.55rem,17.2cqi,2.96rem)]"
              />
              <Reveal delay={0.16} className="mt-6">
                <p className="t-body max-w-[34ch] text-slate pretty">
                  Obim se dogovara pre dolaska — od pojedinačnih sedišta do
                  cele kabine.
                </p>
              </Reveal>
              <Reveal delay={0.24} className="mt-8">
                <Parallax amount={18}>
                  <ImageReveal
                    src="/media/detalj-sediste.jpg"
                    alt="Detalj tekstilnog sedišta posle dubinskog pranja"
                    ratio="960 / 768"
                    sizes="(max-width: 768px) 100vw, 34vw"
                  />
                </Parallax>
              </Reveal>
            </div>

            <div className="md:col-span-6 md:col-start-7">
              <RuleReveal spectrum />
              <ul className="mt-2">
                {service.items.map((item, i) => (
                  <Reveal
                    as="li"
                    key={item}
                    delay={i * 0.06}
                    className="flex items-baseline gap-5 border-b border-ink/12 py-4"
                  >
                    <span className="t-meta-sm w-10 shrink-0 text-stone">
                      Z.{String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="t-lede text-ink">{item}</span>
                  </Reveal>
                ))}
              </ul>

              <Reveal delay={0.3} className="mt-10">
                <Link href="/kontakt" className="btn btn-blue shear-l">
                  Zakaži čišćenje
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
