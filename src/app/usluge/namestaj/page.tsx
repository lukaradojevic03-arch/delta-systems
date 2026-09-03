import type { Metadata } from 'next';
import Link from 'next/link';
import { cases, getService, steps } from '@/lib/site';
import { DeltaSlider } from '@/components/ui/DeltaSlider';
import { ImageReveal, Parallax } from '@/components/motion/Media';
import { LineReveal, Reveal, RuleReveal } from '@/components/motion/Reveal';
import { MetaList, PageHeader, SectionLabel } from '@/components/ui/Bits';

export const metadata: Metadata = {
  title: 'Nameštaj — dubinsko pranje sofa, dušeka i tepiha',
  description:
    'Dubinsko pranje tapaciranog nameštaja, dušeka, tepiha i tekstila. Fleke, prljavština i mirisi izlaze iz vlakana; ne-upijajuće podloge se rade parom.',
  alternates: { canonical: '/usluge/namestaj' },
};

const service = getService('namestaj')!;
const tabure = cases[0];
const garnitura = cases[1];

export default function NamestajPage() {
  return (
    <>
      <PageHeader
        code={service.code}
        eyebrow="Usluga — Nameštaj"
        lines={['Nameštaj', 'iznutra.']}
        titleSize="text-[clamp(2.4rem,22cqi,7.5rem)]"
        lede={service.lede}
        meta={[
          { k: 'Osnovno', v: 'Dubinsko pranje' },
          { k: 'Podloge', v: 'Parno čišćenje' },
          { k: 'Završno', v: 'Dezinfekcija' },
        ]}
      />

      {/* Poređenje — tapacirani velur, isti kadar */}
      <section className="edge pb-20 md:pb-28">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <DeltaSlider
              before={tabure.compare!.before.src}
              after={tabure.compare!.after.src}
              beforeAlt={tabure.compare!.before.alt}
              afterAlt={tabure.compare!.after.alt}
              ratio={tabure.compare!.ratio}
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
              label="Tabure od velura — poređenje pre i posle dubinskog pranja"
            />
            <p className="t-meta-sm mt-4 text-stone">
              {tabure.code} — {tabure.title}, isti kadar
            </p>
          </div>

          <div className="md:col-span-6 md:col-start-7 md:pt-6">
            <SectionLabel code={`${service.code}.1`}>Na čemu radimo</SectionLabel>
            <ul className="mt-7">
              {service.items.map((item, i) => (
                <Reveal
                  as="li"
                  key={item}
                  delay={i * 0.07}
                  className="flex items-baseline gap-4 border-t border-ink/12 py-3.5 last:border-b"
                >
                  <span className="t-meta-sm w-8 shrink-0 text-stone">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="t-body text-ink">{item}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Kome je namenjeno */}
      <section className="bg-ink text-paper">
        <div className="edge py-20 md:py-28">
          <SectionLabel code={`${service.code}.2`} invert>
            Kada ima smisla
          </SectionLabel>

          <div className="mt-10 grid gap-12 md:mt-16 md:grid-cols-12 md:gap-8">
            <div className="cq md:col-span-6">
              <LineReveal
                as="h2"
                lines={['Nije stvar', 'urednosti nego', 'materijala.']}
                className="t-display text-[clamp(1.8rem,14cqi,4.6rem)]"
              />
              <Reveal delay={0.2} className="mt-8">
                <p className="t-lede max-w-[42ch] text-paper/85 pretty">
                  Tapacirani nameštaj radi kao filter. Sve što prođe kroz
                  prostoriju jednom završi u njemu — i ostane tamo dok se ne
                  izvuče.
                </p>
              </Reveal>
              <Reveal delay={0.28} className="mt-8">
                <p className="t-body max-w-[46ch] text-paper/60 pretty">
                  Zato se dubinsko pranje najčešće traži za sedeće delove i
                  dušeke, posle selidbe ili renoviranja, kada se pojavi miris
                  koji se ne gubi provetravanjem, i kada tkanina počne da menja
                  ton u zonama najveće upotrebe.
                </p>
              </Reveal>
            </div>

            <div className="md:col-span-5 md:col-start-8">
              <Parallax amount={26}>
                <ImageReveal
                  src="/media/garnitura-pre.jpg"
                  alt="Sedeći deo ugaone garniture sa potamnelim zonama pre tretmana"
                  ratio="1100 / 580"
                  shear="left"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </Parallax>
              <Reveal delay={0.16}>
                <p className="t-meta-sm mt-4 text-paper/45">
                  Zone najveće upotrebe — pre tretmana
                </p>
              </Reveal>

              <Reveal delay={0.24} className="mt-10">
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

      {/* Kako izgleda proces — kratak izvod, pun proces na /proces */}
      <section className="bg-paper-warm">
        <div className="edge py-20 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionLabel code={`${service.code}.3`}>Tok posla</SectionLabel>
            <Reveal delay={0.1}>
              <Link href="/proces" className="link-delta t-meta text-ink">
                Ceo proces →
              </Link>
            </Reveal>
          </div>

          <RuleReveal className="mt-8" spectrum />

          <ol className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.slice(1, 5).map((s, i) => (
              <Reveal as="li" key={s.code} delay={i * 0.1} className="cq">
                <p className="t-meta-sm text-stone">{s.code}</p>
                <h3 className="t-display mt-3 text-[clamp(1.2rem,11cqi,2rem)]">
                  {s.title}
                </h3>
                <p className="t-body mt-3 text-slate pretty">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Rezultat + CTA */}
      <section className="edge py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="cq md:col-span-5">
            <SectionLabel code={`${service.code}.4`}>Rezultat</SectionLabel>
            <LineReveal
              as="h2"
              delay={0.08}
              lines={['Ton tkanine', 'nazad na jedno.']}
              className="t-display mt-6 text-[clamp(1.6rem,13cqi,3.8rem)]"
            />
            <Reveal delay={0.2} className="mt-6">
              <p className="t-body max-w-[36ch] text-slate pretty">
                {garnitura.note}
              </p>
            </Reveal>
            <Reveal delay={0.28} className="mt-8 flex flex-wrap gap-3">
              <Link href="/kontakt" className="btn btn-ink shear-l">
                Pošalji upit
              </Link>
              <Link href="/rezultati" className="btn btn-line">
                Rezultati
              </Link>
            </Reveal>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <ImageReveal
              src={garnitura.compare!.after.src}
              alt={garnitura.compare!.after.alt}
              ratio="1100 / 580"
              shear="right"
              sizes="(max-width: 768px) 100vw, 48vw"
            />
          </div>
        </div>
      </section>
    </>
  );
}
