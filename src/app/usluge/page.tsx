import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { services } from '@/lib/site';
import { PageHeader, SectionLabel, MetaList } from '@/components/ui/Bits';
import { ServiceRows } from '@/components/sections/ServiceRows';
import { Comparison } from '@/components/sections/Comparison';
import { Faq } from '@/components/sections/Faq';
import { LineReveal, Reveal } from '@/components/motion/Reveal';

export const metadata: Metadata = {
  title: 'Usluge · Dubinsko čišćenje nameštaja i vozila',
  description:
    'Dve celine: nameštaj i vozila. Dubinsko pranje upijajućih površina, parno čišćenje onih koje ne upijaju, dezinfekcija i brzo sušenje. Šta se radi na kom materijalu i česta pitanja.',
  alternates: { canonical: '/usluge' },
};

const AMBIENT = [
  {
    src: '/media/amb-dnevna-siva.jpg',
    alt: 'Dnevna soba sa tapaciranom garniturom',
    t: 'Stan i kuća',
    s: 'Garniture, fotelje, tepisi',
  },
  {
    src: '/media/amb-dusek.jpg',
    alt: 'Spavaća soba sa dušekom i tapaciranim uzglavljem',
    t: 'Spavaći deo',
    s: 'Dušeci, uzglavlja, tekstil',
  },
  {
    src: '/media/amb-sediste.jpg',
    alt: 'Tapacirano sedište iz blizine',
    t: 'Enterijer vozila',
    s: 'Sedišta, patosnice, tapacirung',
  },
];

export default function UslugePage() {
  return (
    <>
      <PageHeader
        eyebrow="Usluge"
        lines={['Dve celine.', 'Jedan metod.']}
        titleSize="text-[clamp(1.89rem,12.5cqi,5.85rem)]"
        lede={
          <>
            Nameštaj i vozila razlikuju se po pristupu i pristupačnosti, ne po
            standardu. Redosled tretmana je isti, menja se samo materijal.
          </>
        }
      />

      <section className="edge pb-12 md:pb-16">
        <ServiceRows detailed />
      </section>

      {/* Gde se radi · jedinstvena plava obrada, bez šarenila */}
      <section className="relative bg-azure-900">
        <div className="grid sm:grid-cols-3">
          {AMBIENT.map((x, i) => (
            <Reveal key={x.t} delay={i * 0.08} className="cq group relative">
              <div className="duotone relative aspect-[4/3] overflow-hidden">
                <Image
                  src={x.src}
                  alt={x.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  quality={78}
                  className="object-cover transition-transform duration-[1400ms] ease-delta group-hover:scale-[1.06]"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 z-[4] p-5">
                <span className="t-display block text-[clamp(1.15rem,5.4cqi,1.9rem)] text-paper">
                  {x.t}
                </span>
                <span className="t-meta-sm mt-1.5 block text-paper/70">{x.s}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Usisavanje vs dubinsko pranje */}
      <section className="bg-paper">
        <div className="edge py-14 md:py-20">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="cq md:col-span-5">
              <SectionLabel>Razlika</SectionLabel>
              <LineReveal
                as="h2"
                delay={0.08}
                lines={['Usisavanje nije', 'čišćenje.']}
                className="t-display mt-5 text-[clamp(1.5rem,12cqi,3.2rem)]"
              />
            </div>
            <div className="md:col-span-6 md:col-start-7 md:pt-4">
              <Reveal delay={0.16}>
                <p className="t-body max-w-[46ch] text-slate pretty">
                  Oba postupka rade sa istom tkaninom, ali ne stižu do iste
                  dubine. Zbog toga se rezultat vidi tek kada se uporede isti
                  kadar pre i posle.
                </p>
              </Reveal>
            </div>
          </div>

          <Comparison className="mt-10 md:mt-12" />
        </div>
      </section>

      {/* Matrica površina · tehnički pregled */}
      <section className="bg-ink text-paper">
        <div className="edge py-14 md:py-20">
          <SectionLabel invert>
            Površina → metod
          </SectionLabel>

          <div className="mt-8 grid gap-10 md:mt-12 md:grid-cols-12 md:gap-8">
            <div className="cq md:col-span-4">
              <LineReveal
                as="h2"
                lines={['Metod se bira', 'po materijalu.']}
                className="t-display text-[clamp(1.35rem,13cqi,2.6rem)]"
              />
              <Reveal delay={0.18} className="mt-6">
                <p className="t-body max-w-[36ch] text-paper/70 pretty">
                  Podela je jednostavna: ono što upija radi se ekstrakcijom, ono
                  što ne upija radi se parom. Sve ostalo su detalji, i oni
                  odlučuju.
                </p>
              </Reveal>
              <Reveal delay={0.26} className="mt-8">
                <div className="duotone duotone-deep relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/media/detalj-tkanina.jpg"
                    alt="Detalj tkanine na sedećem delu garniture"
                    fill
                    sizes="(max-width: 768px) 100vw, 28vw"
                    quality={80}
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </div>

            <div className="md:col-span-7 md:col-start-6">
              <div className="grid gap-10 sm:grid-cols-2 sm:gap-8">
                {services.map((s, i) => (
                  <Reveal key={s.slug} delay={i * 0.12}>
                    <p className="t-meta text-paper/55">
                      {s.title}
                    </p>
                    <MetaList
                      invert
                      className="mt-4"
                      items={s.surfaces.map((x) => ({ k: x.label, v: x.method }))}
                    />
                    <Link
                      href={`/usluge/${s.slug}`}
                      className="link-delta t-meta mt-5 inline-block text-paper/80"
                    >
                      {s.title}, detaljno →
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Česta pitanja */}
      <section className="bg-paper">
        <div className="edge py-14 md:py-20">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="cq md:col-span-4 md:sticky md:top-28 md:self-start">
              <SectionLabel>Česta pitanja</SectionLabel>
              <LineReveal
                as="h2"
                delay={0.08}
                lines={['Ono što se', 'najviše pita.']}
                className="t-display mt-5 text-[clamp(1.35rem,13cqi,2.6rem)]"
              />
              <Reveal delay={0.18} className="mt-6">
                <p className="t-body max-w-[32ch] text-slate pretty">
                  Ako nema odgovora koji vam treba, pitanje se rešava u jednoj
                  poruci. Javljamo se na isti kanal na koji ste pisali.
                </p>
              </Reveal>
            </div>

            <div className="md:col-span-7 md:col-start-6">
              <Faq />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
