import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { cases, getService, steps } from '@/lib/site';
import { DeltaSlider } from '@/components/ui/DeltaSlider';
import { ImageReveal, Parallax } from '@/components/motion/Media';
import { LineReveal, Reveal, RuleReveal } from '@/components/motion/Reveal';
import { MetaList, PageHeader, SectionLabel } from '@/components/ui/Bits';
import { Faq } from '@/components/sections/Faq';

export const metadata: Metadata = {
  title: 'Nameštaj · Dubinsko pranje sofa, dušeka i tepiha',
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
        eyebrow="Usluga · Nameštaj"
        lines={['Nameštaj', 'iznutra.']}
        titleSize="text-[clamp(2.06rem,17.2cqi,5.85rem)]"
        lede={service.lede}
        meta={[
          { k: 'Osnovno', v: 'Dubinsko pranje' },
          { k: 'Podloge', v: 'Parno čišćenje' },
          { k: 'Završno', v: 'Dezinfekcija' },
        ]}
      />

      {/* Poređenje · tapacirani velur, isti kadar */}
      <section className="edge pb-14 md:pb-20">
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
              label="Tabure od velura, poređenje pre i posle dubinskog pranja"
            />
            <p className="t-meta-sm mt-4 text-stone">
              {tabure.code} · {tabure.title}, isti kadar
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

      {/* Ambijent · gde taj nameštaj stoji */}
      <section className="relative isolate overflow-hidden">
        <Image
          src="/media/amb-dnevna-zelena.jpg"
          alt="Dnevni boravak sa tapaciranom garniturom i tepihom"
          fill
          sizes="100vw"
          quality={78}
          className="-z-10 object-cover"
        />
        <span
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'linear-gradient(90deg, rgba(14,17,22,0.9) 0%, rgba(14,17,22,0.55) 55%, rgba(14,17,22,0.25) 100%)',
          }}
          aria-hidden="true"
        />
        <div className="edge py-16 md:py-24">
          <div className="cq max-w-[46ch]">
            <p className="t-meta-sm text-paper/55">Ambijent</p>
            <p className="t-display mt-3 text-[clamp(1.4rem,9cqi,2.8rem)] text-paper">
              Sve u sobi se čisti. Osim onoga na čemu se sedi.
            </p>
            <div className="rule-spectrum mt-6 w-20" />
          </div>
        </div>
      </section>

      {/* Kome je namenjeno */}
      <section className="bg-ink text-paper">
        <div className="edge py-14 md:py-20">
          <SectionLabel code={`${service.code}.2`} invert>
            Kada ima smisla
          </SectionLabel>

          <div className="mt-10 grid gap-12 md:mt-16 md:grid-cols-12 md:gap-8">
            <div className="cq md:col-span-6">
              <LineReveal
                as="h2"
                lines={['Nije stvar', 'urednosti nego', 'materijala.']}
                className="t-display text-[clamp(1.55rem,10.9cqi,3.59rem)]"
              />
              <Reveal delay={0.2} className="mt-8">
                <p className="t-lede max-w-[42ch] text-paper/85 pretty">
                  Tapacirani nameštaj radi kao filter. Sve što prođe kroz
                  prostoriju jednom završi u njemu i ostane tamo dok se ne
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
                  Zone najveće upotrebe · pre tretmana
                </p>
              </Reveal>

              <div className="mt-7 grid grid-cols-2 gap-3">
                <ImageReveal
                  src="/media/mat-velur-rose.jpg"
                  alt="Nabori velura u toplom bakarnom tonu"
                  ratio="1 / 1"
                  sizes="(max-width: 768px) 46vw, 19vw"
                  delay={0.08}
                />
                <ImageReveal
                  src="/media/mat-velur-bordo.jpg"
                  alt="Rebrasta tapacirna tkanina u bordo tonu"
                  ratio="1 / 1"
                  sizes="(max-width: 768px) 46vw, 19vw"
                  delay={0.16}
                />
              </div>

              <Reveal delay={0.24} className="mt-8">
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

      {/* Kako izgleda proces · kratak izvod, pun proces na /proces */}
      <section className="bg-paper-warm">
        <div className="edge py-14 md:py-20">
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
                <h3 className="t-display mt-3 text-[clamp(1.03rem,8.6cqi,1.56rem)]">
                  {s.title}
                </h3>
                <p className="t-body mt-3 text-slate pretty">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Rezultat + CTA */}
      <section className="edge py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="cq md:col-span-5">
            <SectionLabel code={`${service.code}.4`}>Rezultat</SectionLabel>
            <LineReveal
              as="h2"
              delay={0.08}
              lines={['Ton tkanine', 'nazad na jedno.']}
              className="t-display mt-6 text-[clamp(1.38rem,10.1cqi,2.96rem)]"
            />
            <Reveal delay={0.2} className="mt-6">
              <p className="t-body max-w-[36ch] text-slate pretty">
                {garnitura.note}
              </p>
            </Reveal>
            <Reveal delay={0.28} className="mt-8 flex flex-wrap gap-3">
              <Link href="/kontakt" className="btn btn-blue shear-l">
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
