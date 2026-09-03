/**
 * Jedini izvor istine za sadržaj brenda.
 *
 * VAŽNO: ovde se nalaze samo podaci potvrđeni iz materijala klijenta
 * (logo, Instagram objave @deltasystems.rs). Ništa nije izmišljeno —
 * bez cena, broja klijenata, godina iskustva, sertifikata i recenzija.
 * Polja koja klijent treba da popuni stoje kao `null` i UI ih preskače.
 */

export const site = {
  name: 'Delta Systems',
  legalName: 'Delta Systems',
  domain: 'deltasystems.rs',
  url: 'https://deltasystems.rs',
  city: 'Beograd',
  country: 'RS',
  tagline: 'Details make the difference',
  taglineSr: 'Čisto. Sveže. Bez kompromisa.',
  claim: 'Razlika se ne vidi samo na površini.',
  instagram: {
    handle: '@deltasystems.rs',
    url: 'https://www.instagram.com/deltasystems.rs/',
  },
  /** Popuniti kada klijent dostavi. UI automatski prikazuje samo popunjeno. */
  phone: null as string | null,
  email: null as string | null,
  address: null as string | null,
};

export type NavItem = {
  code: string;
  label: string;
  href: string;
  note: string;
};

export const nav: NavItem[] = [
  { code: '01', label: 'Početna', href: '/', note: 'Δ — razlika' },
  { code: '02', label: 'Usluge', href: '/usluge', note: 'Nameštaj i vozila' },
  { code: '03', label: 'Proces', href: '/proces', note: 'Od upita do predaje' },
  { code: '04', label: 'Rezultati', href: '/rezultati', note: 'Pre / posle' },
  { code: '05', label: 'O nama', href: '/o-nama', note: 'Način rada' },
  { code: '06', label: 'Kontakt', href: '/kontakt', note: 'Pošalji upit' },
];

/* ------------------------------------------------------------------ */
/*  METOD — četiri stuba, doslovno iz materijala klijenta              */
/* ------------------------------------------------------------------ */

export type Pillar = {
  code: string;
  title: string;
  body: string;
  detail: string;
};

export const pillars: Pillar[] = [
  {
    code: 'M.01',
    title: 'Dubinsko pranje',
    body: 'Uklanjamo dubinsku prljavštinu, fleke i neprijatne mirise iz vlakana.',
    detail:
      'Rastvor ulazi u vlakno, veže prljavštinu i izlazi zajedno sa njom. Ono što je bilo u dubini ne ostaje u tkanini — vadi se iz nje.',
  },
  {
    code: 'M.02',
    title: 'Parno čišćenje',
    body: 'Snaga pare za duboko čišćenje bez hemikalija.',
    detail:
      'Za površine koje ne upijaju. Temperatura radi umesto sredstava, pa nema ostatka koji se kasnije hvata za prašinu.',
  },
  {
    code: 'M.03',
    title: 'Brzo sušenje',
    body: 'Kraće vreme sušenja i brza ponovna upotreba nameštaja.',
    detail:
      'Ekstrakcija vlage je deo tretmana, a ne posledica. Nameštaj koji ostaje vlažan nije završen posao.',
  },
  {
    code: 'M.04',
    title: 'Dubinska dezinfekcija',
    body: 'Uklanjamo bakterije, viruse i alergene za viši nivo higijene.',
    detail:
      'Poslednji sloj tretmana. Ono što se ne vidi tretira se isto tako pažljivo kao i ono što se vidi.',
  },
];

/* ------------------------------------------------------------------ */
/*  USLUGE                                                             */
/* ------------------------------------------------------------------ */

export type Service = {
  slug: 'namestaj' | 'vozila';
  code: string;
  title: string;
  kicker: string;
  lede: string;
  image: string;
  imageAlt: string;
  items: string[];
  surfaces: { label: string; method: string }[];
};

export const services: Service[] = [
  {
    slug: 'namestaj',
    code: 'S.01',
    title: 'Nameštaj',
    kicker: 'Tekstil, tapaciranje, podloge',
    lede:
      'Dubinsko pranje upijajućih površina i parno čišćenje onih koje ne upijaju. Sofe, fotelje, stolice, dušeci, tepisi i tekstil.',
    image: '/media/tabure-pre.jpg',
    imageAlt:
      'Tapacirani tabure od velura pre dubinskog čišćenja, sa vidljivim mrljama',
    items: [
      'Sofe i ugaone garniture',
      'Fotelje i taburei',
      'Trpezarijske stolice',
      'Dušeci',
      'Tepisi i staze',
      'Tekstil i tapaciranje',
    ],
    surfaces: [
      { label: 'Velur', method: 'Dubinsko pranje' },
      { label: 'Štof i mikrofiber', method: 'Dubinsko pranje' },
      { label: 'Tepih i vuna', method: 'Dubinsko pranje' },
      { label: 'Dušek', method: 'Dubinsko pranje + dezinfekcija' },
      { label: 'Ne-upijajuće podloge', method: 'Parno čišćenje' },
    ],
  },
  {
    slug: 'vozila',
    code: 'S.02',
    title: 'Vozila',
    kicker: 'Enterijer, sedišta, tapacirung',
    lede:
      'Dubinsko pranje sedišta i pažljivo čišćenje enterijera — sa pažnjom prema materijalima i detaljima.',
    image: '/media/vozilo-zadnja-posle.jpg',
    imageAlt: 'Zadnja klupa u vozilu nakon dubinskog pranja sedišta',
    items: [
      'Prednja i zadnja sedišta',
      'Tapacirung vrata',
      'Patosnice',
      'Tavanica i stubovi',
      'Prtljažni prostor',
      'Tvrde površine enterijera',
    ],
    surfaces: [
      { label: 'Tekstilna sedišta', method: 'Dubinsko pranje' },
      { label: 'Patosnice', method: 'Dubinsko pranje' },
      { label: 'Plastika i staklo', method: 'Parno čišćenje' },
      { label: 'Ventilacija i detalji', method: 'Parno čišćenje' },
      { label: 'Ceo enterijer', method: 'Dubinska dezinfekcija' },
    ],
  },
];

export const getService = (slug: string) =>
  services.find((s) => s.slug === slug);

/* ------------------------------------------------------------------ */
/*  PROCES                                                             */
/* ------------------------------------------------------------------ */

export type Step = {
  code: string;
  depth: string;
  title: string;
  body: string;
};

export const steps: Step[] = [
  {
    code: '00',
    depth: 'Površina',
    title: 'Upit i fotografija',
    body:
      'Pošaljete šta treba očistiti i fotografiju stanja. Fotografija skraćuje ceo razgovor — po njoj se vidi materijal i tip zaprljanja.',
  },
  {
    code: '01',
    depth: 'Površina',
    title: 'Procena materijala',
    body:
      'Prvo se utvrdi šta je tkanina, pa tek onda šta ide na nju. Upijajuće i ne-upijajuće površine ne tretiraju se istim postupkom.',
  },
  {
    code: '02',
    depth: 'Vlakno',
    title: 'Pretretman',
    body:
      'Fleke i zone najvećeg opterećenja obrađuju se pre glavnog tretmana, da bi prljavština pustila vlakno.',
  },
  {
    code: '03',
    depth: 'Dubina',
    title: 'Dubinsko pranje',
    body:
      'Uklanjamo dubinsku prljavštinu, fleke i neprijatne mirise iz vlakana. Prljavština izlazi iz tkanine — ne razmazuje se po njoj.',
  },
  {
    code: '04',
    depth: 'Dubina',
    title: 'Para i dezinfekcija',
    body:
      'Snaga pare za duboko čišćenje bez hemikalija na površinama koje ne upijaju, i dubinska dezinfekcija protiv bakterija, virusa i alergena.',
  },
  {
    code: '05',
    depth: 'Vlakno',
    title: 'Ekstrakcija vlage',
    body:
      'Kraće vreme sušenja i brza ponovna upotreba nameštaja. Sušenje je deo tretmana, ne čekanje posle njega.',
  },
  {
    code: '06',
    depth: 'Površina',
    title: 'Provera i predaja',
    body:
      'Poslednji prolaz po detaljima — šavovi, ivice, uglovi. Tek onda je posao završen.',
  },
];

/* ------------------------------------------------------------------ */
/*  REZULTATI — isključivo stvarne fotografije klijenta                */
/*  Nove slučajeve dodati ovde; komponente se same prilagođavaju.       */
/* ------------------------------------------------------------------ */

export type CaseFrame = {
  src: string;
  alt: string;
  state: 'PRE' | 'POSLE';
};

export type CaseStudy = {
  id: string;
  code: string;
  title: string;
  category: 'Nameštaj' | 'Vozila';
  material: string;
  treatment: string;
  /** Poravnat par → interaktivni Δ klizač */
  compare?: { before: CaseFrame; after: CaseFrame; ratio: string };
  /** Nepoklopljeni kadrovi → editorial diptih */
  frames?: CaseFrame[];
  note: string;
};

export const cases: CaseStudy[] = [
  {
    id: 'tabure',
    code: 'Δ 01',
    title: 'Tabure od velura',
    category: 'Nameštaj',
    material: 'Velur, tapacirano',
    treatment: 'Dubinsko pranje',
    compare: {
      before: {
        src: '/media/tabure-pre.jpg',
        alt: 'Ljubičasti tabure od velura pre čišćenja — tamne mrlje po sedištu i stranicama',
        state: 'PRE',
      },
      after: {
        src: '/media/tabure-posle.jpg',
        alt: 'Isti tabure posle dubinskog pranja — ujednačena boja velura bez mrlja',
        state: 'POSLE',
      },
      ratio: '856 / 940',
    },
    note: 'Mrlje uklonjene iz vlakna, boja velura ujednačena po celoj površini.',
  },
  {
    id: 'garnitura',
    code: 'Δ 02',
    title: 'Ugaona garnitura',
    category: 'Nameštaj',
    material: 'Štof, sedeći deo',
    treatment: 'Dubinsko pranje',
    compare: {
      before: {
        src: '/media/garnitura-pre.jpg',
        alt: 'Sedeći deo ugaone garniture pre čišćenja — potamnele zone i tragovi na tkanini',
        state: 'PRE',
      },
      after: {
        src: '/media/garnitura-posle.jpg',
        alt: 'Isti sedeći deo posle dubinskog pranja — ujednačena siva tkanina',
        state: 'POSLE',
      },
      ratio: '1100 / 580',
    },
    note:
      'Sedeći deo i ivice; potamnele zone od upotrebe vraćene na ton ostatka garniture.',
  },
  {
    id: 'vozilo-prednja',
    code: 'Δ 03',
    title: 'Prednja sedišta',
    category: 'Vozila',
    material: 'Tekstilna sedišta',
    treatment: 'Dubinsko pranje + dezinfekcija',
    frames: [
      {
        src: '/media/vozilo-prednja-pre.jpg',
        alt: 'Prednja sedišta vozila pre dubinskog pranja',
        state: 'PRE',
      },
      {
        src: '/media/vozilo-prednja-posle.jpg',
        alt: 'Prednja sedišta vozila posle dubinskog pranja',
        state: 'POSLE',
      },
    ],
    note: 'Sedišta, konzola i tapacirung vrata u istom prolazu.',
  },
  {
    id: 'vozilo-zadnja',
    code: 'Δ 04',
    title: 'Zadnja klupa',
    category: 'Vozila',
    material: 'Tekstilna sedišta',
    treatment: 'Dubinsko pranje + dezinfekcija',
    frames: [
      {
        src: '/media/vozilo-zadnja-pre.jpg',
        alt: 'Zadnja klupa u vozilu pre čišćenja enterijera',
        state: 'PRE',
      },
      {
        src: '/media/vozilo-zadnja-posle.jpg',
        alt: 'Zadnja klupa u vozilu posle dubinskog pranja i dezinfekcije',
        state: 'POSLE',
      },
    ],
    note: 'Klupa, pojasevi i prostor između sedišta.',
  },
];

export const getCase = (id: string) => cases.find((c) => c.id === id);

/* ------------------------------------------------------------------ */
/*  PRINCIPI — način rada                                              */
/* ------------------------------------------------------------------ */

export const principles = [
  {
    code: 'P.01',
    title: 'Materijal pre metode',
    body:
      'Prvo se utvrdi šta je tkanina. Velur, štof, tepih i ne-upijajuća podloga ne podnose isti postupak, pa ga i ne dobijaju.',
  },
  {
    code: 'P.02',
    title: 'Ekstrakcija, ne maskiranje',
    body:
      'Prljavština izlazi iz vlakna. Miris se ne prekriva mirisom — uklanja se izvor.',
  },
  {
    code: 'P.03',
    title: 'Para gde para radi bolje',
    body:
      'Na površinama koje ne upijaju radi temperatura, ne hemija. Bez ostatka koji kasnije hvata prašinu.',
  },
  {
    code: 'P.04',
    title: 'Sušenje je deo posla',
    body:
      'Tretman se ne završava na mokrom nameštaju. Kraće sušenje znači bržu ponovnu upotrebu.',
  },
  {
    code: 'P.05',
    title: 'Detalj je merilo',
    body:
      'Šavovi, ivice, uglovi i prostor koji se ne vidi na prvi pogled. Details make the difference.',
  },
];
