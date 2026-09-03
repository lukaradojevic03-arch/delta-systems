import type { Metadata, Viewport } from 'next';
import { Bodoni_Moda, Archivo } from 'next/font/google';
import './globals.css';
import { SiteChrome } from '@/components/chrome/SiteChrome';
import { Footer } from '@/components/chrome/Footer';
import { baseUrl, site } from '@/lib/site';

const display = Bodoni_Moda({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400', '500', '600'],
});

const sans = Archivo({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Delta Systems · Dubinsko čišćenje nameštaja i vozila · Beograd',
    template: '%s · Delta Systems',
  },
  description:
    'Dubinsko pranje i parno čišćenje nameštaja, tekstila i enterijera vozila u Beogradu. Prljavština, fleke i mirisi izlaze iz vlakana, ne razmazuju se po njima.',
  applicationName: site.name,
  keywords: [
    'dubinsko čišćenje',
    'dubinsko pranje nameštaja',
    'pranje sofe',
    'parno čišćenje',
    'dubinsko pranje automobila',
    'čišćenje enterijera vozila',
    'Beograd',
  ],
  openGraph: {
    type: 'website',
    locale: 'sr_RS',
    url: baseUrl,
    siteName: site.name,
    title: 'Delta Systems · Dubinsko čišćenje nameštaja i vozila',
    description:
      'Razlika se ne vidi samo na površini. Dubinsko pranje i parno čišćenje nameštaja, tekstila i enterijera vozila. Beograd.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Delta Systems · Dubinsko čišćenje',
    description: 'Razlika se ne vidi samo na površini. Beograd.',
  },
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#F4F1EB',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: site.name,
  slogan: site.tagline,
  description:
    'Dubinsko pranje i parno čišćenje nameštaja, tekstila i enterijera vozila.',
  url: baseUrl,
  image: `${baseUrl}/opengraph-image.jpg`,
  areaServed: { '@type': 'City', name: site.city },
  address: { '@type': 'PostalAddress', addressLocality: site.city, addressCountry: site.country },
  sameAs: [site.instagram.url],
  makesOffer: [
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Dubinsko čišćenje nameštaja',
        serviceType: 'Dubinsko pranje i parno čišćenje tapaciranog nameštaja, dušeka i tepiha',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Dubinsko čišćenje enterijera vozila',
        serviceType: 'Dubinsko pranje sedišta i čišćenje enterijera vozila',
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="sr-Latn-RS"
      className={`${display.variable} ${sans.variable}`}
    >
      <body>
        <a
          href="#sadrzaj"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-3 focus:text-paper focus:t-meta"
        >
          Preskoči na sadržaj
        </a>

        <SiteChrome />
        <main id="sadrzaj">{children}</main>
        <Footer />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
