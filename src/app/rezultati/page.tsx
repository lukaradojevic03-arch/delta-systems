import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';
import { ResultsGallery } from '@/components/sections/ResultsGallery';
import { LineReveal, Reveal } from '@/components/motion/Reveal';
import { PageHeader, SectionLabel } from '@/components/ui/Bits';

export const metadata: Metadata = {
  title: 'Rezultati — pre i posle dubinskog čišćenja',
  description:
    'Stvarni slučajevi: tabure od velura, ugaona garnitura i enterijer vozila. Isti kadar pre i posle tretmana, bez retuširanja.',
  alternates: { canonical: '/rezultati' },
};

export default function RezultatiPage() {
  return (
    <>
      <PageHeader
        code="04"
        eyebrow="Rezultati"
        lines={['Isti kadar.', 'Druga slika.']}
        titleSize="text-[clamp(2.2rem,17cqi,7.5rem)]"
        lede={
          <>
            Poređenja su iz stvarnih izlazaka. Povucite Δ i sami odredite gde
            prestaje jedno stanje, a počinje drugo.
          </>
        }
        meta={[
          { k: 'Interakcija', v: 'Prevlačenje / strelice' },
          { k: 'Obrada', v: 'Bez retuširanja' },
          { k: 'Izvor', v: 'Arhiva izlazaka' },
        ]}
      />

      <ResultsGallery />

      <section className="bg-paper-warm">
        <div className="edge py-20 md:py-28">
          <div className="grid gap-10 md:grid-cols-12 md:gap-8">
            <div className="cq md:col-span-6">
              <SectionLabel code="04.1">Sledeći slučaj</SectionLabel>
              <LineReveal
                as="h2"
                delay={0.08}
                lines={['Vaš komad', 'može biti', 'sledeći.']}
                className="t-display mt-6 text-[clamp(1.9rem,19cqi,4.6rem)]"
              />
            </div>

            <div className="md:col-span-4 md:col-start-8 md:pt-6">
              <Reveal delay={0.18}>
                <p className="t-body max-w-[34ch] text-slate pretty">
                  Pošaljite fotografiju stanja. Ako se posao završi kod vas,
                  isti kadar pre i posle ide u arhivu — uz vašu saglasnost.
                </p>
              </Reveal>

              <Reveal delay={0.26} className="mt-8 flex flex-wrap gap-3">
                <Link href="/kontakt" className="btn btn-ink shear-l">
                  Pošalji fotografiju
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
          </div>
        </div>
      </section>
    </>
  );
}
