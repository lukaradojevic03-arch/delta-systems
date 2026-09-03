import type { Metadata } from 'next';
import Link from 'next/link';
import { principles, site } from '@/lib/site';
import { ImageReveal, Parallax } from '@/components/motion/Media';
import { LineReveal, Reveal, RuleReveal } from '@/components/motion/Reveal';
import { PageHeader, SectionLabel } from '@/components/ui/Bits';

export const metadata: Metadata = {
  title: 'O nama · Kako radimo',
  description:
    'Delta Systems iz Beograda. Način rada: materijal pre metode, ekstrakcija umesto maskiranja, para gde para radi bolje, sušenje kao deo posla.',
  alternates: { canonical: '/o-nama' },
};

export default function ONamaPage() {
  return (
    <>
      <PageHeader
        code="05"
        eyebrow="O nama"
        lines={['Delta je', 'oznaka za', 'razliku.']}
        titleSize="text-[clamp(2.06rem,16.4cqi,5.85rem)]"
        lede={
          <>
            U matematici Δ znači promenu između dva stanja. Ime firme je i
            merilo posla: ono što se vidi kada se uporede isti kadar pre i
            posle.
          </>
        }
        meta={[
          { k: 'Sedište', v: site.city },
          { k: 'Delatnost', v: 'Dubinsko čišćenje' },
          { k: 'Kanal', v: site.instagram.handle },
        ]}
      />

      {/* Izjava */}
      <section className="edge pb-14 md:pb-20">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="cq md:col-span-7">
            <LineReveal
              as="h2"
              lines={[
                'Ne prodajemo',
                'čistoću.',
                <span key="i" className="italic">
                  Radimo je.
                </span>,
              ]}
              className="t-display text-[clamp(1.72rem,11.7cqi,4.29rem)]"
            />

            <Reveal delay={0.2} className="mt-10 max-w-[52ch]">
              <p className="t-lede text-ink/80 pretty">
                Delta Systems radi dubinsko pranje i parno čišćenje nameštaja,
                tekstila i enterijera vozila. Posao je uvek isti po redosledu i
                nikad isti po materijalu, i baš tu se prave greške koje se
                kasnije ne mogu ispraviti.
              </p>
            </Reveal>

            <Reveal delay={0.28} className="mt-6 max-w-[52ch]">
              <p className="t-body text-slate pretty">
                Zato se ne radi „paket". Radi se konkretan komad, sa konkretnim
                tkaninom i konkretnim tipom zaprljanja. Ako nešto ne treba
                dirati, to i kažemo.
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <Parallax amount={28}>
              <ImageReveal
                src="/media/detalj-sediste.jpg"
                alt="Detalj tekstilnog sedišta posle tretmana"
                ratio="960 / 768"
                shear="right"
                sizes="(max-width: 768px) 100vw, 30vw"
              />
            </Parallax>
            <Reveal delay={0.16}>
              <p className="t-meta-sm mt-4 text-stone">
                Detalj · tekstil posle tretmana
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Principi */}
      <section className="bg-ink text-paper">
        <div className="edge py-14 md:py-20">
          <SectionLabel code="05.1" invert>
            Način rada
          </SectionLabel>

          <ul className="mt-8 md:mt-10">
            {principles.map((p, i) => (
              <Reveal
                as="li"
                key={p.code}
                delay={i * 0.07}
                className="grid gap-3 border-t border-paper/15 py-7 last:border-b md:grid-cols-12 md:gap-8 md:py-10"
              >
                <span className="t-meta-sm text-paper/45 md:col-span-1">
                  {p.code}
                </span>
                <div className="cq md:col-span-5">
                  <h3 className="t-display text-[clamp(1.2rem,6.2cqi,2.34rem)]">
                    {p.title}
                  </h3>
                </div>
                <p className="t-body text-paper/70 pretty md:col-span-5 md:col-start-8 md:pt-2">
                  {p.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Očekivanja · najpošteniji deo stranice */}
      <section className="bg-azure-50">
        <div className="edge py-14 md:py-20">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="cq md:col-span-5">
              <SectionLabel code="05.15">Očekivanja</SectionLabel>
              <LineReveal
                as="h2"
                delay={0.08}
                lines={['Šta dobijate', 'i šta nećete', 'dobiti.']}
                className="t-display mt-5 text-[clamp(1.4rem,12cqi,3rem)]"
              />
            </div>
            <div className="md:col-span-6 md:col-start-7 md:pt-4">
              <Reveal delay={0.16}>
                <p className="t-body max-w-[44ch] text-slate pretty">
                  Druga lista je jednako važna kao prva. Ako se nešto ne može
                  uraditi, bolje je da to znate pre nego posle.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2 md:gap-6">
            {[
              {
                t: 'Šta dobijate',
                tone: 'accent' as const,
                rows: [
                  'Procenu pre nego što se bilo šta radi',
                  'Postupak izabran prema materijalu, ne prema ceni',
                  'Ekstrakciju vlage kao deo tretmana, ne kao dodatak',
                  'Dubinsku dezinfekciju kao poslednji sloj',
                  'Jasno „ne" ako se nešto ne može uraditi',
                ],
              },
              {
                t: 'Šta nećete dobiti',
                tone: 'muted' as const,
                rows: [
                  'Cenu izrečenu napamet, bez uvida u predmet',
                  'Obećanje da svaka fleka izlazi',
                  'Sredstvo koje ostaje u tkanini i hvata prašinu',
                  'Nameštaj koji ostaje mokar do sutra',
                  'Paket u koji ulazi i ono što vam ne treba',
                ],
              },
            ].map((col, ci) => (
              <Reveal key={col.t} delay={ci * 0.1}>
                <div
                  className={
                    col.tone === 'accent'
                      ? 'h-full bg-azure-800 p-6 text-paper sm:p-8'
                      : 'h-full bg-paper-warm p-6 text-ink sm:p-8'
                  }
                >
                  <p
                    className={
                      col.tone === 'accent'
                        ? 't-display text-[clamp(1.3rem,3.6vw,1.9rem)] text-paper'
                        : 't-display text-[clamp(1.3rem,3.6vw,1.9rem)] text-ink'
                    }
                  >
                    {col.t}
                  </p>
                  <ul className="mt-6">
                    {col.rows.map((r) => (
                      <li
                        key={r}
                        className={
                          col.tone === 'accent'
                            ? 'flex gap-4 border-t border-paper/18 py-3.5'
                            : 'flex gap-4 border-t border-ink/12 py-3.5'
                        }
                      >
                        <span
                          className={
                            col.tone === 'accent'
                              ? 'mt-[0.55em] block h-px w-4 shrink-0 bg-azure-300'
                              : 'mt-[0.55em] block h-px w-4 shrink-0 bg-stone'
                          }
                          aria-hidden="true"
                        />
                        <span
                          className={
                            col.tone === 'accent'
                              ? 'font-sans text-[0.9375rem] leading-relaxed text-paper/85 md:text-base'
                              : 'font-sans text-[0.9375rem] leading-relaxed text-slate md:text-base'
                          }
                        >
                          {r}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Područje i kanal */}
      <section className="bg-paper-warm">
        <div className="edge py-14 md:py-20">
          <div className="grid gap-10 md:grid-cols-12 md:gap-8">
            <div className="cq md:col-span-5">
              <SectionLabel code="05.2">Gde radimo</SectionLabel>
              <LineReveal
                as="h2"
                delay={0.08}
                lines={['Beograd', 'i okolina.']}
                className="t-display mt-6 text-[clamp(1.55rem,17.2cqi,3.12rem)]"
              />
              <Reveal delay={0.18} className="mt-6">
                <p className="t-body max-w-[34ch] text-slate pretty">
                  Izlazak na adresu za nameštaj i dogovor oko lokacije za
                  vozila. Za tačan termin i obim, pošaljite upit.
                </p>
              </Reveal>
            </div>

            <div className="cq md:col-span-5 md:col-start-8">
              <Parallax amount={16} className="mb-9">
                <ImageReveal
                  src="/media/mat-velur-petrol.jpg"
                  alt="Tamnozeleni velur u naborima"
                  ratio="1200 / 620"
                  shear="left"
                  sizes="(max-width: 768px) 100vw, 38vw"
                />
              </Parallax>
              <RuleReveal spectrum />
              <Reveal delay={0.16} className="mt-8">
                <p className="t-display text-[clamp(1.38rem,13cqi,2.6rem)]">
                  Δ je razlika
                </p>
                <p className="t-body mt-3 max-w-[30ch] text-slate pretty">
                  Merilo posla je ono što se vidi kada se uporede isti kadar pre
                  i posle. {site.taglineSr}
                </p>
              </Reveal>

              <Reveal delay={0.24} className="mt-10 flex flex-wrap gap-3">
                <Link href="/kontakt" className="btn btn-blue shear-l">
                  Pošalji upit
                </Link>
                <a
                  href={site.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-line"
                >
                  {site.instagram.handle}
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
