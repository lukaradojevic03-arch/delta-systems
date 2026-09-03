import Image from 'next/image';
import Link from 'next/link';
import { nav, site } from '@/lib/site';
import { Reveal } from '@/components/motion/Reveal';

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-paper-warm">
      <div className="rule-spectrum" />

      {/* velika izjava · tagline klijenta kao tipografski potpis */}
      <div className="edge pb-12 pt-14 md:pb-14 md:pt-20">
        <Reveal className="cq">
          <p className="t-display text-[clamp(1.5rem,9cqi,4.5rem)] text-ink">
            Details make
            <br />
            the difference
          </p>
        </Reveal>

        <div className="mt-16 grid gap-12 border-t border-ink/12 pt-10 md:mt-24 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <Image
              src="/brand/lockup.png"
              alt="Delta Systems"
              width={1360}
              height={320}
              sizes="(max-width: 768px) 70vw, 22vw"
              className="h-auto w-[210px] md:w-[240px]"
            />
            <p className="t-body mt-6 max-w-[34ch] text-slate">
              Dubinsko pranje i parno čišćenje nameštaja, tekstila i enterijera
              vozila. {site.city}.
            </p>
          </div>

          <nav aria-label="Podnožje" className="md:col-span-4 md:col-start-6">
            <p className="t-meta-sm mb-5 text-stone">Sadržaj</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-delta t-body text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3 md:col-start-10">
            <p className="t-meta-sm mb-5 text-stone">Kontakt</p>
            <ul className="space-y-3">
              <li>
                <a
                  href={site.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-delta t-body text-ink"
                >
                  Instagram {site.instagram.handle}
                </a>
              </li>
              {site.phone && (
                <li>
                  <a
                    href={`tel:${site.phone.replace(/\s/g, '')}`}
                    className="link-delta t-body text-ink"
                  >
                    {site.phone}
                  </a>
                </li>
              )}
              {site.email && (
                <li>
                  <a href={`mailto:${site.email}`} className="link-delta t-body text-ink">
                    {site.email}
                  </a>
                </li>
              )}
              <li className="pt-3">
                <Link href="/kontakt" className="btn btn-line">
                  Pošalji upit
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-ink/12 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="t-meta-sm text-stone">
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="t-meta-sm text-stone">{site.taglineSr}</p>
        </div>
      </div>
    </footer>
  );
}
