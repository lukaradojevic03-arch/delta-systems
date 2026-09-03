# Delta Systems — website

Višestranični sajt za **Delta Systems** (Beograd) — dubinsko čišćenje nameštaja
i enterijera vozila.

Next.js 15 (App Router) · TypeScript · Tailwind CSS · Framer Motion.

---

## Koncept

**Δ = razlika.** Ime firme je i merilo posla: razlika između stanja pre i
posle tretmana. Iz toga sledi sve ostalo:

- **Dijagonalni rez (shear)** — preuzet iz PRE/POSLE podele u vizuelnim
  materijalima klijenta. Ponavlja se na dugmadima, slikama, klizaču i
  prelazima između stranica (`--shear` u `globals.css`).
- **Skala dubine** — Površina → Vlakno → Osnova. Nosi stranicu `/proces`
  (lenjir koji prati skrol) i pojavljuje se kao motiv na drugim mestima.
- **Tehnički indeks** — svaka usluga, korak i slučaj nosi mono oznaku
  (`S.01`, `M.03`, `Δ 02`). Sajt se čita kao evidencija radionice, ne kao
  reklama.

### Tipografija

| Uloga | Font | Gde |
| --- | --- | --- |
| Display | Bodoni Moda | Naslovi, imena slučajeva |
| Tekst | Archivo | Uvodi, opisi |
| Tehnički | IBM Plex Mono | Oznake, brojevi, metapodaci |

Svi naslovi se skaliraju **container query jedinicama (`cqi`)**, ne `vw` —
veličina prati širinu kolone, pa se ručno prelomljeni redovi nikad ne lome
sami. Klasa `.cq` označava kontejner; koeficijent je izračunat prema
najdužem redu naslova.

### Paleta

Izvedena iz logotipa i iz materijala koje firma čisti:

- `ink` — grafitna, glavna tamna podloga
- `petrol` — duboka plavo-zelena (iz velura), druga tamna podloga da se
  tamne sekcije ne ponavljaju
- `paper` / `paper-warm` — topla slonovača
- `stone` / `slate` — sekundarni tekst
- **spektar** (breskva → roza → lila → plava) — linije debljine 1px,
  indikator skrola i **jedini** element koji ga nosi kao punu površinu:
  glavni CTA (`.btn-spectrum`). Nigde drugde nema gradijentnih podloga.

---

## Pokretanje

```bash
npm install
npm run dev
```

Sajt radi na `http://localhost:3111`.

```bash
npm run build && npm start
```

---

## Sadržaj — gde se šta menja

Sav tekst i podaci su na jednom mestu: **`src/lib/site.ts`**.

| Šta | Gde |
| --- | --- |
| Naziv, grad, Instagram, telefon, email | `site` |
| Stavke navigacije | `nav` |
| Četiri stuba metoda | `pillars` |
| Usluge i materijali | `services` |
| Koraci procesa | `steps` |
| Rezultati (pre/posle) | `cases` |
| Principi na stranici O nama | `principles` |

### Telefon i email

U `site` stoje kao `null`. Čim se popune, automatski se pojavljuju u
podnožju i na stranici Kontakt — nije potrebna nijedna druga izmena.

```ts
phone: '+381 6x xxx xxxx',
email: 'info@deltasystems.rs',
```

### Dodavanje novog rezultata

1. Stavite fotografije u `public/media/`.
2. Dodajte unos u `cases` u `src/lib/site.ts`.

- Ako su **dva kadra poravnata** (isti ugao, isti okvir), koristite
  `compare` — dobija se interaktivni Δ klizač.
- Ako **nisu poravnata**, koristite `frames` — dobija se diptih sa
  oznakama PRE / POSLE. Klizač se ne lažira.

Galerija sama raspoređuje slučajeve kroz tri različita rasporeda, pa novi
unosi ne razbijaju ritam stranice.

### Fotografije

Fotografije su podeljene u dve grupe, i ta podela je namerna:

| Prefiks | Šta je | Gde se koristi |
| --- | --- | --- |
| `tabure-`, `garnitura-`, `vozilo-`, `detalj-` | **Stvarni radovi klijenta**, izvučeni iz objava sa `@deltasystems.rs` | Δ klizači, diptisi, sve što nosi oznaku PRE / POSLE |
| `mat-`, `amb-` | **Licencirane fotografije materijala i ambijenta** (Pexels, besplatna licenca) | Traka materijala, pozadine sekcija, teksture |

Fotografije sa prefiksom `mat-` i `amb-` **nikada ne nose oznaku PRE /
POSLE i nikada se ne predstavljaju kao rezultat rada klijenta.** One
pokazuju vrstu površine, ne konkretan posao. Kada klijent dostavi svoje
fotografije ambijenta, zamenite fajlove istim imenima.

Nema izmišljenih podataka — bez cena, broja klijenata, godina iskustva,
sertifikata i recenzija.

Rezolucija izvornog materijala je ograničena (Instagram kreative), pa se
slike prikazuju u kontrolisanim veličinama uz blago zrno. **Kada klijent
dostavi originale, dovoljno je zameniti fajlove u `public/media/` istim
imenima.**

---

## Forma za upit

Tok u tri koraka: *predmet → detalji → kontakt i fotografije*
(`src/components/forms/InquiryFlow.tsx`).

Upit se šalje na `POST /api/upit`. Ponašanje:

- ako je postavljena promenljiva okruženja `CONTACT_WEBHOOK_URL`, upit se
  prosleđuje na tu adresu (Make, Zapier, n8n, sopstveni endpoint…);
- ako nije, upit se upisuje u log servera, a korisnik u oba slučaja dobija
  potvrdu i direktan link ka Instagram poruci.

Na Vercelu se promenljiva dodaje u **Project → Settings → Environment
Variables**. Lokalno — u `.env.local`:

```
CONTACT_WEBHOOK_URL=https://...
```

Fotografije se šalju kao data URL, najviše 3 komada i ukupno do ~3.6 MB.

---

## SEO

- Metapodaci po stranici, Open Graph slika, `sitemap.xml`, `robots.txt`.
- `LocalBusiness` structured data u `src/app/layout.tsx` — sadrži samo
  potvrđene podatke. **Kada dobijete adresu i telefon, dopunite `site`;**
  structured data se popunjava odatle.
- Pre puštanja u rad proverite da `site.url` pokazuje na pravi domen.

---

## Pristupačnost i performanse

- Semantični naslovi, `alt` tekst na svakoj fotografiji, „preskoči na
  sadržaj" link, vidljiv fokus.
- Δ klizač radi mišem, prstom i tastaturom (strelice, Home/End); vertikalni
  skrol na mobilnom ostaje nepromenjen.
- `prefers-reduced-motion` isključuje prelaze i pomeranja.
- Slike idu kroz `next/image` (AVIF/WebP, lazy loading), fontovi kroz
  `next/font` (bez FOUT-a i bez zahteva ka trećim stranama).

---

## Struktura

```
src/
  app/                    stranice (App Router) + /api/upit
  components/
    chrome/               navigacija, indeks, podnožje
    forms/                tok upita
    motion/               reveal, parallax, otkrivanje slika
    sections/             veće celine (metod, proces, galerija, usluge)
    ui/                   Δ klizač, diptih, metapodaci, logotip
  lib/site.ts             SAV sadržaj
public/
  media/                  fotografije radova
  brand/                  logotip
```
