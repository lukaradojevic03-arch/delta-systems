import Image from 'next/image';
import Link from 'next/link';
import { cases, pillars, site } from '@/lib/site';
import { DeltaSlider } from '@/components/ui/DeltaSlider';
import { ImageReveal, Parallax } from '@/components/motion/Media';
import { LineReveal, Reveal, RuleReveal } from '@/components/motion/Reveal';
import { MetaList, SectionLabel } from '@/components/ui/Bits';
import { MaterialBand } from '@/components/sections/MaterialBand';
import { MethodIndex } from '@/components/sections/MethodIndex';
import { ServiceRows } from '@/components/sections/ServiceRows';

const tabure = cases[0];
const garnitura = cases[1];

export default function HomePage() {
  return (
    <>
      {/* ============================================================ */}
      {/*  01 · PAŽNJA                                                 */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden">
        <div className="edge pb-12 pt-[100px] md:pb-16 md:pt-[132px]">
          <Reveal>
            <p className="t-meta text-stone">
              {site.city} · Dubinsko čišćenje nameštaja i vozila
            </p>
          </Reveal>

          <div className="mt-6 grid gap-8 md:mt-9 md:grid-cols-12 md:gap-8">
            {/* naslov + uvod */}
            <div className="cq md:col-span-8">
              <LineReveal
                as="h1"
                delay={0.06}
                lines={[
                  'Razlika se',
                  'ne vidi samo',
                  <span key="i" className="italic">
                    na površini.
                  </span>,
                ]}
                className="t-display text-[clamp(2.15rem,13.3cqi,6.24rem)]"
              />

              <Reveal delay={0.36} className="mt-7 max-w-[46ch] md:mt-9">
                <p className="t-lede text-ink/80 pretty">
                  Dubinsko pranje i parno čišćenje nameštaja, tekstila i
                  enterijera vozila. Prljavština, fleke i mirisi izlaze iz
                  vlakana, ne razmazuju se po njima.
                </p>
              </Reveal>

              <Reveal delay={0.46} className="mt-7 flex flex-wrap items-center gap-3">
                <Link href="/kontakt" className="btn btn-blue shear-l">
                  Pošalji upit
                </Link>
                <Link href="/rezultati" className="btn btn-line">
                  Pre / posle
                </Link>
              </Reveal>
            </div>

            {/* interaktivno poređenje */}
            <div className="md:col-span-4 md:col-start-9">
              <Parallax amount={22} className="md:-mt-8">
                <div className="relative">
                  <DeltaSlider
                    before={tabure.compare!.before.src}
                    after={tabure.compare!.after.src}
                    beforeAlt={tabure.compare!.before.alt}
                    afterAlt={tabure.compare!.after.alt}
                    ratio={tabure.compare!.ratio}
                    priority
                    sizes="(max-width: 768px) 100vw, 38vw"
                    label="Tabure od velura, poređenje pre i posle dubinskog pranja"
                  />

                  <div className="mt-3 flex items-start justify-between gap-6">
                    <p className="t-meta-sm text-stone">
                      {tabure.title}
                    </p>
                    <p className="t-meta-sm max-w-[22ch] text-right text-stone">
                      Prevucite da vidite razliku
                    </p>
                  </div>
                </div>
              </Parallax>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Traka materijala · puna širina                              */}
      {/* ============================================================ */}
      <MaterialBand />

      {/* ============================================================ */}
      {/*  02 · PROBLEM                                                */}
      {/* ============================================================ */}
      <section className="relative bg-azure-900 text-paper">
        <div className="edge py-14 md:py-24">
          <SectionLabel invert>
            Šta ostaje u tkanini
          </SectionLabel>

          <div className="mt-8 grid gap-10 md:mt-12 md:grid-cols-12 md:gap-8">
            <div className="cq md:col-span-6">
              <LineReveal
                as="h2"
                lines={['Tkanina ne pamti', 'samo mrlje.']}
                className="t-display text-[clamp(1.72rem,11.4cqi,4.29rem)]"
              />

              <Reveal delay={0.2} className="mt-7 max-w-[48ch] md:mt-9">
                <p className="t-lede text-paper/85 pretty">
                  Usisivač skida ono što je gore. Ispod toga ostaje sloj koji se
                  primeti tek kada ga nema: prašina i mast koje su se slegle u
                  vlakno, ostaci pića, dlaka i miris koji se vraća čim se
                  prostorija zagreje.
                </p>
              </Reveal>

              <Reveal delay={0.28} className="mt-6">
                <p className="t-body max-w-[46ch] text-paper/60 pretty">
                  Zato tretman ne počinje sredstvom nego materijalom. Velur,
                  štof, tepih i podloga koja ne upija ne podnose isti postupak,
                  pa ga i ne dobijaju.
                </p>
              </Reveal>

              <Reveal delay={0.34} className="mt-8">
                <MetaList
                  invert
                  items={[
                    { k: 'Upijajuće', v: 'Dubinsko pranje' },
                    { k: 'Ne-upijajuće', v: 'Parno čišćenje' },
                    { k: 'Posle tretmana', v: 'Dezinfekcija' },
                  ]}
                />
              </Reveal>


            </div>

            {/* detalji površine */}
            <div className="md:col-span-5 md:col-start-8">
              <Parallax amount={26}>
                <ImageReveal
                  src="/media/detalj-velur-pre.jpg"
                  alt="Detalj velura sa tragovima prljavštine u vlaknu"
                  ratio="600 / 440"
                  shear="right"
                  sizes="(max-width: 768px) 100vw, 34vw"
                />
              </Parallax>
              <Reveal delay={0.16}>
                <p className="t-meta-sm mt-3 text-paper/45">
                  Stvarni rad · velur pre tretmana
                </p>
              </Reveal>

              <div className="mt-7 grid grid-cols-2 gap-3">
                <ImageReveal
                  src="/media/mat-velur-petrol.jpg"
                  alt="Tamnozeleni velur u naborima"
                  ratio="1 / 1"
                  sizes="(max-width: 768px) 46vw, 17vw"
                  delay={0.1}
                />
                <ImageReveal
                  src="/media/mat-vuna.jpg"
                  alt="Grubo tkano vuneno vlakno iz blizine"
                  ratio="1 / 1"
                  sizes="(max-width: 768px) 46vw, 17vw"
                  delay={0.18}
                />
              </div>
              <Reveal delay={0.24}>
                <p className="t-meta-sm mt-3 text-paper/45">
                  Površine koje zadržavaju najviše
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  03 · USLUGE                                                 */}
      {/* ============================================================ */}
      <section className="bg-paper">
        <div className="edge py-14 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionLabel>Usluge</SectionLabel>
            <Reveal delay={0.1}>
              <Link href="/usluge" className="link-delta t-meta text-ink">
                Sve usluge →
              </Link>
            </Reveal>
          </div>

          <div className="mt-8 md:mt-10">
            <ServiceRows />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  04 · METOD                                                  */}
      {/* ============================================================ */}
      <section className="bg-paper-warm">
        <div className="edge py-14 md:py-24">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="cq md:col-span-5">
              <SectionLabel>Metod</SectionLabel>
              <LineReveal
                as="h2"
                delay={0.08}
                lines={['Četiri koraka', 'koja se ne', 'preskaču.']}
                className="t-display mt-5 text-[clamp(1.55rem,12.5cqi,3.51rem)]"
              />
              <Reveal delay={0.18} className="mt-6">
                <p className="t-body max-w-[38ch] text-slate pretty">
                  Isti redosled na sofi i na sedištu automobila. Menja se samo
                  materijal, i sve što iz njega sledi.
                </p>
              </Reveal>
            </div>

            <div className="md:col-span-6 md:col-start-7">
              <Parallax amount={18}>
                <ImageReveal
                  src="/media/mat-velur-maslina.jpg"
                  alt="Maslinasti velur u mekim naborima"
                  ratio="1200 / 520"
                  shear="left"
                  sizes="(max-width: 768px) 100vw, 46vw"
                />
              </Parallax>
            </div>
          </div>

          <div className="mt-10 md:mt-14">
            <MethodIndex />
          </div>

          <Reveal delay={0.1} className="mt-10">
            <Link href="/proces" className="btn btn-line">
              Ceo proces
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  05 · REZULTATI                                              */}
      {/* ============================================================ */}
      <section className="bg-ink text-paper">
        <div className="edge py-14 md:py-24">
          <SectionLabel invert>
            Rezultati
          </SectionLabel>

          <div className="mt-8 grid gap-10 md:mt-12 md:grid-cols-12 md:gap-8">
            <div className="cq md:col-span-4">
              <LineReveal
                as="h2"
                lines={['Isti komad.', 'Isti kadar.']}
                className="t-display text-[clamp(1.55rem,14.8cqi,3.12rem)]"
              />
              <Reveal delay={0.2} className="mt-5">
                <p className="t-body max-w-[34ch] text-paper/70 pretty">
                  Bez retuširanja i bez druge sobe. Povucite Δ i uporedite sami.
                </p>
              </Reveal>

              <Reveal delay={0.28} className="mt-7">
                <MetaList
                  invert
                  items={[
                    { k: 'Slučaj', v: garnitura.code },
                    { k: 'Predmet', v: garnitura.title },
                    { k: 'Materijal', v: garnitura.material },
                    { k: 'Tretman', v: garnitura.treatment },
                  ]}
                />
              </Reveal>

              <Reveal delay={0.34} className="mt-7">
                <Link href="/rezultati" className="btn btn-line-invert">
                  Svi rezultati
                </Link>
              </Reveal>
            </div>

            <div className="md:col-span-7 md:col-start-6">
              <DeltaSlider
                before={garnitura.compare!.before.src}
                after={garnitura.compare!.after.src}
                beforeAlt={garnitura.compare!.before.alt}
                afterAlt={garnitura.compare!.after.alt}
                ratio={garnitura.compare!.ratio}
                sizes="(max-width: 768px) 100vw, 55vw"
                label="Ugaona garnitura, poređenje pre i posle dubinskog pranja"
              />
              <p className="t-meta-sm mt-3 text-paper/45">{garnitura.note}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  06 · UPIT · najglasniji blok na stranici                    */}
      {/* ============================================================ */}
      <section className="relative isolate overflow-hidden">
        <Image
          src="/media/amb-fotelja-plava.jpg"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          quality={78}
          className="-z-10 object-cover"
        />
        <span
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'linear-gradient(105deg, rgba(14,17,22,0.96) 0%, rgba(26,39,64,0.92) 55%, rgba(38,55,90,0.84) 100%)',
          }}
          aria-hidden="true"
        />
        <span className="rule-spectrum absolute inset-x-0 top-0" aria-hidden="true" />

        <div className="edge py-16 md:py-28">
          <div className="grid gap-10 md:grid-cols-12 md:gap-8">
            <div className="cq md:col-span-7">
              <SectionLabel invert>
                Upit
              </SectionLabel>

              <LineReveal
                as="h2"
                delay={0.08}
                lines={['Pošaljite', 'fotografiju.']}
                className="t-display mt-5 text-[clamp(1.89rem,14.8cqi,5.07rem)] text-paper"
              />

              <Reveal delay={0.2} className="mt-6 max-w-[44ch]">
                <p className="t-lede text-paper/85 pretty">
                  Po fotografiji se vidi materijal i tip zaprljanja. Razgovor
                  onda kreće od stvari, a ne od pretpostavki.
                </p>
              </Reveal>

              <Reveal delay={0.3} className="mt-8 flex flex-wrap gap-3">
                <Link href="/kontakt" className="btn btn-paper btn-lg shear-l">
                  <span aria-hidden="true" className="text-[13px]">
                    Δ
                  </span>
                  Zakaži čišćenje
                </Link>
                <a
                  href={site.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-line-invert btn-lg"
                >
                  Instagram
                </a>
              </Reveal>
            </div>

            <div className="md:col-span-4 md:col-start-9">
              <RuleReveal spectrum className="mb-6" />
              <ul className="space-y-3">
                {pillars.map((p) => (
                  <li key={p.title} className="flex items-center gap-3">
                    <span
                      className="block h-px w-5 shrink-0 bg-azure-300/70"
                      aria-hidden="true"
                    />
                    <span className="font-sans text-[0.9375rem] text-paper/90 md:text-base">
                      {p.title}
                    </span>
                  </li>
                ))}
              </ul>
              <Reveal delay={0.2}>
                <p className="t-meta-sm mt-6 text-paper/50">{site.taglineSr}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
