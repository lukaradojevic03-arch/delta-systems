import type { Metadata } from 'next';
import Image from 'next/image';
import { site } from '@/lib/site';
import { InquiryFlow } from '@/components/forms/InquiryFlow';
import { Reveal } from '@/components/motion/Reveal';
import { MetaList, PageHeader } from '@/components/ui/Bits';

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
        titleSize="text-[clamp(1.89rem,12.5cqi,5.85rem)]"
        lede={
          <>
            Tri koraka. Fotografija je najkraći put do tačne procene — po njoj
            se vidi materijal i tip zaprljanja.
          </>
        }
        meta={[
          { k: 'Koraka', v: '03' },
          { k: 'Fotografije', v: 'Do 3 komada' },
          { k: 'Područje', v: site.city },
        ]}
      />

      <section className="edge pb-16 md:pb-24">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          {/* ---------- panel sa upitom ---------- */}
          <div className="cq md:col-span-7">
            <div className="relative bg-paper-warm p-6 shadow-[0_28px_70px_-45px_rgba(14,17,22,0.55)] sm:p-9 md:p-11">
              <span
                className="rule-azure absolute inset-x-0 top-0"
                aria-hidden="true"
              />
              <InquiryFlow />
            </div>
          </div>

          {/* ---------- bočna kolona ---------- */}
          <aside className="md:col-span-4 md:col-start-9">
            {/* tamni blok — vizuelno sidro pored svetlog panela */}
            <Reveal className="cq">
              <div className="relative isolate overflow-hidden bg-azure-800 p-6 text-paper sm:p-7">
                <Image
                  src="/media/mat-velur-rose.jpg"
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                  quality={70}
                  className="-z-10 object-cover opacity-25 grayscale"
                />
                <span
                  className="pointer-events-none absolute inset-0 -z-10"
                  style={{
                    background:
                      'linear-gradient(160deg, rgba(50,73,115,0.82) 0%, rgba(26,39,64,0.97) 100%)',
                  }}
                  aria-hidden="true"
                />
                <p className="t-meta-sm text-paper/55">Najbrži put</p>
                <p className="t-display mt-2 text-[clamp(1.25rem,11cqi,2rem)]">
                  Jedna fotografija.
                </p>
                <p className="t-body mt-3 text-paper/75 pretty">
                  Po njoj se vidi materijal i tip zaprljanja, pa procena ne mora
                  da čeka izlazak na teren.
                </p>
                <a
                  href={site.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-line-invert mt-6"
                >
                  Instagram
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.12} className="mt-10">
              <p className="t-meta text-stone">Drugi kanali</p>
              <ul className="mt-4">
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
                    <a
                      href={`mailto:${site.email}`}
                      className="link-delta t-lede text-ink"
                    >
                      {site.email}
                    </a>
                  </li>
                )}
                <li className="border-t border-ink/12 py-4">
                  <a
                    href={site.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-delta t-lede text-ink"
                  >
                    {site.instagram.handle}
                  </a>
                  <p className="t-meta-sm mt-2 text-stone">
                    Poruka sa fotografijom
                  </p>
                </li>
              </ul>
            </Reveal>

            <Reveal delay={0.2} className="mt-10">
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


          </aside>
        </div>
      </section>
    </>
  );
}
