import type { Metadata } from 'next';
import { site } from '@/lib/site';
import { InquiryFlow } from '@/components/forms/InquiryFlow';
import { Reveal } from '@/components/motion/Reveal';
import { DepthScale, MetaList, PageHeader } from '@/components/ui/Bits';

export const metadata: Metadata = {
  title: 'Kontakt — pošaljite upit',
  description:
    'Recite šta treba očistiti, dodajte fotografiju i ostavite kontakt. Dubinsko čišćenje nameštaja i vozila, Beograd.',
  alternates: { canonical: '/kontakt' },
};

export default function KontaktPage() {
  return (
    <>
      <PageHeader
        code="06"
        eyebrow="Kontakt"
        lines={['Recite šta', 'treba očistiti.']}
        titleSize="text-[clamp(2.2rem,16cqi,7.5rem)]"
        lede={
          <>
            Tri koraka. Fotografija je najkraći put do tačne procene — po njoj
            se vidi materijal i tip zaprljanja.
          </>
        }
      />

      <section className="edge pb-24 md:pb-32">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="cq md:col-span-7">
            <InquiryFlow />
          </div>

          <aside className="md:col-span-4 md:col-start-9">
            <Reveal>
              <p className="t-meta text-stone">Drugi kanali</p>
              <ul className="mt-5">
                <li className="border-t border-ink/12 py-4">
                  <a
                    href={site.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-delta t-lede text-ink"
                  >
                    Instagram {site.instagram.handle}
                  </a>
                  <p className="t-meta-sm mt-2 text-stone">
                    Najbrže za slanje fotografija
                  </p>
                </li>
                {site.phone && (
                  <li className="border-t border-ink/12 py-4">
                    <a
                      href={`tel:${site.phone.replace(/\s/g, '')}`}
                      className="link-delta t-lede text-ink"
                    >
                      {site.phone}
                    </a>
                  </li>
                )}
                {site.email && (
                  <li className="border-t border-ink/12 py-4">
                    <a href={`mailto:${site.email}`} className="link-delta t-lede text-ink">
                      {site.email}
                    </a>
                  </li>
                )}
              </ul>
            </Reveal>

            <Reveal delay={0.14} className="mt-12">
              <p className="t-meta text-stone">Područje</p>
              <MetaList
                className="mt-4"
                items={[
                  { k: 'Grad', v: site.city },
                  { k: 'Nameštaj', v: 'Izlazak na adresu' },
                  { k: 'Vozila', v: 'Po dogovoru' },
                ]}
              />
            </Reveal>

            <Reveal delay={0.2} className="mt-12 hidden md:block">
              <DepthScale className="h-28" />
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
