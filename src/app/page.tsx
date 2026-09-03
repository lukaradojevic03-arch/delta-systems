import Link from 'next/link';
import { cases, pillars, site } from '@/lib/site';
import { DeltaSlider } from '@/components/ui/DeltaSlider';
import { ImageReveal, Parallax } from '@/components/motion/Media';
import { LineReveal, Reveal, RuleReveal } from '@/components/motion/Reveal';
import { DepthScale, MetaList, SectionLabel } from '@/components/ui/Bits';
import { MethodIndex } from '@/components/sections/MethodIndex';
import { ServiceRows } from '@/components/sections/ServiceRows';

const tabure = cases[0];
const garnitura = cases[1];

export default function HomePage() {
  return (
    <>
      {/* ============================================================ */}
      {/*  01 — PAŽNJA                                                 */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden">
        {/* uspravni rail sa motivom: površina → kontaminacija → tretman → rezultat */}
        <div
          className="pointer-events-none absolute left-0 top-0 hidden h-full w-[var(--edge-x)] items-center justify-center lg:flex"
          aria-hidden="true"
        >
          <div className="flex origin-center -rotate-90 items-center gap-4 whitespace-nowrap">
            <span className="t-meta-sm text-stone">Površina</span>
            <span className="h-px w-6 bg-ink/20" />
            <span className="t-meta-sm text-stone">Kontaminacija</span>
            <span className="h-px w-6 bg-ink/20" />
            <span className="t-meta-sm text-stone">Tretman</span>
            <span className="h-px w-6 bg-ink/20" />
            <span className="t-meta-sm text-ink">Rezultat</span>
          </div>
        </div>

        <div className="edge pb-16 pt-[124px] md:pb-24 md:pt-[172px]">
          <Reveal>
            <p className="t-meta text-stone">
              {site.city} — Dubinsko čišćenje nameštaja i vozila
            </p>
          </Reveal>

          <div className="mt-8 grid gap-10 md:mt-12 md:grid-cols-12 md:gap-8">
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
                className="t-display text-[clamp(2.5rem,17cqi,8rem)]"
              />

              <Reveal delay={0.36} className="mt-8 max-w-[46ch] md:mt-12">
                <p className="t-lede text-ink/80 pretty">
                  Dubinsko pranje i parno čišćenje nameštaja, tekstila i
                  enterijera vozila. Prljavština, fleke i mirisi izlaze iz
                  vlakana — ne razmazuju se po njima.
                </p>
              </Reveal>

              <Reveal delay={0.46} className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/kontakt" className="btn btn-ink shear-l">
                  Pošalji upit
                </Link>
                <Link href="/rezultati" className="btn btn-line">
                  Pre / posle
                </Link>
              </Reveal>

              <Reveal delay={0.56} className="mt-14 hidden md:block">
                <div className="flex items-center gap-4">
                  <span className="t-meta-sm text-stone">
                    Δ — razlika između pre i posle
                  </span>
                  <span className="h-px flex-1 max-w-[120px] bg-ink/15" />
                </div>
              </Reveal>
            </div>

            {/* interaktivno poređenje */}
            <div className="md:col-span-4 md:col-start-9">
              <Parallax amount={26} className="md:-mt-10">
                <div className="relative">
                  <DeltaSlider
                    before={tabure.compare!.before.src}
                    after={tabure.compare!.after.src}
                    beforeAlt={tabure.compare!.before.alt}
                    afterAlt={tabure.compare!.after.alt}
                    ratio={tabure.compare!.ratio}
                    priority
                    sizes="(max-width: 768px) 100vw, 38vw"
                    label="Tabure od velura — poređenje pre i posle dubinskog pranja"
                  />

                  <div className="mt-4 flex items-start justify-between gap-6">
                    <p className="t-meta-sm text-stone">
                      {tabure.code} — {tabure.title}
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
      {/*  02 — PROBLEM                                                */}
      {/* ============================================================ */}
      <section className="relative bg-ink text-paper">
        <div className="edge py-20 md:py-32">
          <SectionLabel code="02" invert>
            Šta ostaje u tkanini
          </SectionLabel>

          <div className="mt-10 grid gap-12 md:mt-16 md:grid-cols-12 md:gap-8">
            <div className="cq md:col-span-7">
              <LineReveal
                as="h2"
                lines={['Tkanina ne pamti', 'samo mrlje.']}
                className="t-display text-[clamp(2rem,12cqi,5.5rem)]"
              />

              <Reveal delay={0.2} className="mt-8 max-w-[48ch] md:mt-12">
                <p className="t-lede text-paper/85 pretty">
                  Usisivač skida ono što je gore. Ispod toga ostaje sloj koji se
                  primeti tek kada ga nema — prašina i mast koje su se slegle u
                  vlakno, ostaci pića, dlaka i miris koji se vraća čim se
                  prostorija zagreje.
                </p>
              </Reveal>

              <Reveal delay={0.28} className="mt-8">
                <p className="t-body max-w-[46ch] text-paper/60 pretty">
                  Zato tretman ne počinje sredstvom nego materijalom. Velur,
                  štof, tepih i podloga koja ne upija ne podnose isti postupak —
                  i ne dobijaju ga.
                </p>
              </Reveal>

              <Reveal delay={0.34} className="mt-10">
                <DepthScale invert className="h-28" />
              </Reveal>
            </div>

            {/* makro detalj površine */}
            <div className="md:col-span-4 md:col-start-9">
              <Parallax amount={30}>
                <ImageReveal
                  src="/media/detalj-velur-pre.jpg"
                  alt="Makro detalj velura sa tragovima prljavštine u vlaknu"
                  ratio="880 / 720"
                  shear="right"
                  sizes="(max-width: 768px) 100vw, 30vw"
                />
              </Parallax>
              <Reveal delay={0.2}>
                <p className="t-meta-sm mt-4 text-paper/45">
                  Detalj — velur pre tretmana
                </p>
              </Reveal>

              <Reveal delay={0.3} className="mt-10">
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
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  03 — USLUGE                                                 */}
      {/* ============================================================ */}
      <section className="bg-paper">
        <div className="edge py-20 md:py-32">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionLabel code="03">Usluge</SectionLabel>
            <Reveal delay={0.1}>
              <Link href="/usluge" className="link-delta t-meta text-ink">
                Sve usluge →
              </Link>
            </Reveal>
          </div>

          <div className="mt-10 md:mt-14">
            <ServiceRows />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  04 — METOD                                                  */}
      {/* ============================================================ */}
      <section className="bg-paper-warm">
        <div className="edge py-20 md:py-32">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="cq md:col-span-5">
              <SectionLabel code="04">Metod</SectionLabel>
              <LineReveal
                as="h2"
                delay={0.08}
                lines={['Četiri koraka', 'koja se ne', 'preskaču.']}
                className="t-display mt-6 text-[clamp(1.8rem,16cqi,4.5rem)]"
              />
            </div>
            <div className="md:col-span-5 md:col-start-8 md:pt-16">
              <Reveal delay={0.18}>
                <p className="t-body max-w-[40ch] text-slate pretty">
                  Isti redosled na sofi i na sedištu automobila. Menja se samo
                  materijal — i sve što iz njega sledi.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="mt-14 md:mt-20">
            <MethodIndex />
          </div>

          <Reveal delay={0.1} className="mt-12">
            <Link href="/proces" className="btn btn-line">
              Ceo proces
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  05 — REZULTATI                                              */}
      {/* ============================================================ */}
      <section className="bg-ink text-paper">
        <div className="edge py-20 md:py-32">
          <SectionLabel code="05" invert>
            Rezultati
          </SectionLabel>

          <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:gap-8">
            <div className="cq md:col-span-4">
              <LineReveal
                as="h2"
                lines={['Isti komad.', 'Isti kadar.']}
                className="t-display text-[clamp(1.8rem,19cqi,4rem)]"
              />
              <Reveal delay={0.2} className="mt-6">
                <p className="t-body max-w-[34ch] text-paper/70 pretty">
                  Bez retuširanja i bez druge sobe. Povucite Δ i uporedite
                  sami.
                </p>
              </Reveal>

              <Reveal delay={0.28} className="mt-8">
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

              <Reveal delay={0.34} className="mt-8">
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
                label="Ugaona garnitura — poređenje pre i posle dubinskog pranja"
              />
              <p className="t-meta-sm mt-4 text-paper/45">{garnitura.note}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  06 — UPIT                                                   */}
      {/* ============================================================ */}
      <section className="bg-paper">
        <div className="edge py-20 md:py-32">
          <div className="grid gap-10 md:grid-cols-12 md:gap-8">
            <div className="cq md:col-span-7">
              <SectionLabel code="06">Upit</SectionLabel>
              <LineReveal
                as="h2"
                delay={0.08}
                lines={['Pošaljite', 'fotografiju.']}
                className="t-display mt-6 text-[clamp(2.2rem,19cqi,6.5rem)]"
              />
              <Reveal delay={0.2} className="mt-8 max-w-[44ch]">
                <p className="t-lede text-ink/80 pretty">
                  Po fotografiji se vidi materijal i tip zaprljanja. Razgovor
                  onda kreće od stvari, a ne od pretpostavki.
                </p>
              </Reveal>
              <Reveal delay={0.28} className="mt-9 flex flex-wrap gap-3">
                <Link href="/kontakt" className="btn btn-ink shear-l">
                  Zakaži čišćenje
                </Link>
                <a
                  href={site.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-line"
                >
                  Instagram
                </a>
              </Reveal>
            </div>

            <div className="md:col-span-4 md:col-start-9">
              <RuleReveal spectrum className="mb-8" />
              <MetaList
                items={pillars.map((p) => ({ k: p.code, v: p.title }))}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
