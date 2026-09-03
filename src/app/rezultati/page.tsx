import type { Metadata } from 'next';
import { ResultsGallery } from '@/components/sections/ResultsGallery';
import { Reveal } from '@/components/motion/Reveal';
import { PageHeader } from '@/components/ui/Bits';

export const metadata: Metadata = {
  title: 'Rezultati · Pre i posle dubinskog čišćenja',
  description:
    'Stvarni slučajevi: tabure od velura, ugaona garnitura i enterijer vozila. Isti kadar pre i posle tretmana, bez retuširanja.',
  alternates: { canonical: '/rezultati' },
};

export default function RezultatiPage() {
  return (
    <>
      <PageHeader
        eyebrow="Rezultati"
        lines={['Isti kadar.', 'Druga slika.']}
        titleSize="text-[clamp(1.89rem,13.3cqi,5.85rem)]"
        lede={
          <>
            Poređenja su iz stvarnih izlazaka. Povucite Δ i sami odredite gde
            prestaje jedno stanje, a počinje drugo.
          </>
        }
      />

      <section className="bg-azure-50">
        <div className="edge py-10 md:py-12">
          <div className="grid gap-6 sm:grid-cols-3 sm:gap-8">
            {[
              {
                t: 'Isti kadar',
                s: 'Fotografija posle snima se sa istog mesta kao ona pre. Bez druge sobe i drugog svetla.',
              },
              {
                t: 'Bez obrade',
                s: 'Nema retuširanja, izoštravanja ni pojačane boje. Ono što vidite je ono što je ostalo posle tretmana.',
              },
              {
                t: 'Δ klizač',
                s: 'Gde se kadrovi poklapaju, povlačite granicu sami. Gde se ne poklapaju, stoje dve odvojene fotografije.',
              },
            ].map((x, i) => (
              <Reveal key={x.t} delay={i * 0.08}>
                <span className="block h-px w-6 bg-azure-400" aria-hidden="true" />
                <p className="t-display mt-4 text-[clamp(1.15rem,3vw,1.6rem)] text-ink">
                  {x.t}
                </p>
                <p className="t-body mt-2.5 text-slate pretty">{x.s}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ResultsGallery />

    </>
  );
}
