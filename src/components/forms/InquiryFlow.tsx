'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';
import { site } from '@/lib/site';
import { cn, EASE } from '@/lib/cn';

/**
 * Upit u tri koraka · ne „Ime / Email / Poruka / Pošalji".
 * 01 Šta čistimo → 02 Detalji (zavise od izbora) → 03 Kontakt i fotografije.
 */

type Kind = 'namestaj' | 'vozilo';

const OBJECTS: Record<Kind, string[]> = {
  namestaj: [
    'Ugaona garnitura',
    'Trosed / dvosed',
    'Fotelja',
    'Tabure',
    'Trpezarijske stolice',
    'Dušek',
    'Tepih',
    'Drugo',
  ],
  vozilo: [
    'Prednja sedišta',
    'Zadnja klupa',
    'Kompletan enterijer',
    'Patosnice',
    'Prtljažnik',
    'Tapacirung vrata',
  ],
};

const MATERIALS: Record<Kind, string[]> = {
  namestaj: ['Velur', 'Štof', 'Mikrofiber', 'Koža', 'Tepih / vuna', 'Ne znam'],
  vozilo: ['Tekstil', 'Koža', 'Kombinovano', 'Ne znam'],
};

const REASONS = [
  'Fleke',
  'Neprijatan miris',
  'Opšte osvežavanje',
  'Posle selidbe',
  'Kućni ljubimac',
  'Alergije',
];

const MAX_PHOTOS = 3;
const MAX_TOTAL = 3.6 * 1024 * 1024;

export function InquiryFlow() {
  const [step, setStep] = useState(0);
  const [kind, setKind] = useState<Kind | null>(null);
  const [objects, setObjects] = useState<string[]>([]);
  const [material, setMaterial] = useState('');
  const [reasons, setReasons] = useState<string[]>([]);
  const [place, setPlace] = useState('');
  const [message, setMessage] = useState('');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [insta, setInsta] = useState('');
  const [when, setWhen] = useState('');

  const [photos, setPhotos] = useState<{ file: File; url: string }[]>([]);
  const [photoError, setPhotoError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const toggle = (list: string[], set: (v: string[]) => void, v: string) =>
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const canStep1 = objects.length > 0;
  const canSubmit = name.trim().length > 1 && (phone.trim() || insta.trim());

  const dmLink = useMemo(() => site.instagram.url, []);

  /* ---------------- fotografije ---------------- */

  const onFiles = (files: FileList | null) => {
    if (!files) return;
    setPhotoError('');
    const next = [...photos];
    for (const f of Array.from(files)) {
      if (next.length >= MAX_PHOTOS) {
        setPhotoError(`Najviše ${MAX_PHOTOS} fotografije.`);
        break;
      }
      if (!f.type.startsWith('image/')) {
        setPhotoError('Prihvataju se samo slike.');
        continue;
      }
      next.push({ file: f, url: URL.createObjectURL(f) });
    }
    const total = next.reduce((s, p) => s + p.file.size, 0);
    if (total > MAX_TOTAL) {
      setPhotoError('Fotografije su prevelike. Pošaljite ih porukom na Instagram.');
      return;
    }
    setPhotos(next);
  };

  const removePhoto = (i: number) => {
    URL.revokeObjectURL(photos[i].url);
    setPhotos(photos.filter((_, x) => x !== i));
    setPhotoError('');
  };

  const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(String(r.result));
      r.onerror = reject;
      r.readAsDataURL(file);
    });

  /* ---------------- slanje ---------------- */

  const submit = async () => {
    if (!canSubmit || status === 'sending') return;
    setStatus('sending');
    setErrorMsg('');

    try {
      const encoded = await Promise.all(
        photos.map(async (p) => ({
          name: p.file.name,
          type: p.file.type,
          data: await toBase64(p.file),
        })),
      );

      const res = await fetch('/api/upit', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          kind,
          answers: { objects, material, reasons, place },
          contact: { name, phone, instagram: insta, when },
          message,
          photos: encoded,
        }),
      });

      const data = await res.json().catch(() => ({ ok: false }));
      if (!res.ok || !data.ok) throw new Error(data.error ?? 'Greška pri slanju.');
      setStatus('done');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      setStatus('error');
      setErrorMsg(
        e instanceof Error ? e.message : 'Slanje nije uspelo. Pokušajte ponovo.',
      );
    }
  };

  /* ---------------- potvrda ---------------- */

  if (status === 'done') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="border-t border-ink/12 pt-10"
      >
        <p className="t-meta text-stone">Upit primljen</p>
        <h2 className="t-display mt-5 text-[clamp(1.55rem,7.4cqi,3.59rem)]">
          Hvala, {name.split(' ')[0]}.
        </h2>
        <p className="t-lede mt-6 max-w-[44ch] text-ink/80 pretty">
          Upit je zabeležen. Javljamo se na{' '}
          {phone ? 'broj koji ste ostavili' : 'Instagram'} radi termina i obima
          posla.
        </p>
        <div className="rule-azure my-9 w-24" />
        <div className="flex flex-wrap gap-3">
          <a
            href={dmLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ink shear-l"
          >
            Pošalji fotografije na Instagram
          </a>
          <button
            type="button"
            onClick={() => {
              setStatus('idle');
              setStep(0);
              setKind(null);
              setObjects([]);
              setReasons([]);
              setMaterial('');
              setPlace('');
              setMessage('');
              setPhotos([]);
            }}
            className="btn btn-line"
          >
            Novi upit
          </button>
        </div>
      </motion.div>
    );
  }

  /* ---------------- tok ---------------- */

  return (
    <div>
      {/* napredak */}
      <div className="flex items-center gap-4 border-t border-ink/12 pt-5">
        <div className="relative h-px flex-1 bg-ink/12">
          <motion.div
            className="rule-azure absolute left-0 top-0 h-px origin-left"
            initial={false}
            animate={{ width: `${((step + 1) / 3) * 100}%` }}
            transition={{ duration: 0.7, ease: EASE }}
          />
        </div>
        <span className="t-meta-sm text-stone">
          {['Predmet', 'Detalji', 'Kontakt'][step]}
        </span>
      </div>

      <AnimatePresence mode="wait">
        {/* ---------- 01 ---------- */}
        {step === 0 && (
          <motion.div
            key="s0"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="pt-10"
          >
            <h2 className="t-display text-[clamp(1.29rem,7.4cqi,2.81rem)]">
              Šta želite da očistimo?
            </h2>

            <p className="t-body mt-3 max-w-[46ch] text-slate pretty">
              Izaberite jednu od dve celine. Sledeća pitanja zavise od izbora,
              pa dobijate samo ona koja se tiču vašeg predmeta.
            </p>

            <p className="t-meta-sm mt-5 text-azure-700 sm:hidden">
              ↓ Dodirnite jednu opciju
            </p>

            <div className="mt-6 border-t border-ink/12 sm:mt-9">
              {(
                [
                  {
                    k: 'namestaj',
                    c: 'S.01',
                    t: 'Nameštaj',
                    s: 'Sofe, fotelje, dušeci, tepisi, tekstil',
                    img: '/media/tabure-posle.jpg',
                    alt: 'Tapacirani tabure posle dubinskog pranja',
                  },
                  {
                    k: 'vozilo',
                    c: 'S.02',
                    t: 'Vozilo',
                    s: 'Sedišta, patosnice, tapacirung, enterijer',
                    img: '/media/vozilo-zadnja-posle.jpg',
                    alt: 'Zadnja klupa u vozilu posle dubinskog pranja',
                  },
                ] as const
              ).map((o) => (
                <button
                  key={o.k}
                  type="button"
                  onClick={() => {
                    setKind(o.k);
                    setObjects([]);
                    setMaterial('');
                    setStep(1);
                  }}
                  className="group relative block w-full border-b border-ink/12 py-5 text-left sm:py-6"
                >
                  <span className="flex items-start gap-4 sm:items-center sm:gap-8">
                    <span className="cq min-w-0 flex-1">
                      <span className="t-display block text-[clamp(1.46rem,13.3cqi,2.5rem)] transition-transform duration-700 ease-delta group-hover:translate-x-2">
                        {o.t}
                      </span>
                      <span className="t-body mt-1.5 block text-slate">{o.s}</span>
                    </span>

                    {/* desktop: sličica + dugme u istom redu */}
                    <span className="relative hidden h-[92px] w-[76px] shrink-0 overflow-hidden shear-r grain sm:block">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={o.img}
                        alt={o.alt}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1100ms] ease-delta group-hover:scale-110"
                      />
                    </span>

                    <span
                      className="t-meta-sm hidden shrink-0 items-center gap-1.5 whitespace-nowrap bg-azure-700 px-3.5 py-2.5 text-paper transition-transform duration-500 group-hover:translate-x-1 sm:flex"
                      aria-hidden="true"
                    >
                      Izaberi <span>→</span>
                    </span>
                  </span>

                  {/* mobilni: sličica i dugme u zasebnom redu, bez gužve */}
                  <span className="mt-4 flex items-center gap-4 sm:hidden">
                    <span className="relative block h-[58px] w-[74px] shrink-0 overflow-hidden shear-r grain">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={o.img}
                        alt={o.alt}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </span>
                    <span
                      className="t-meta-sm flex flex-1 items-center justify-center gap-2 whitespace-nowrap bg-azure-700 px-4 py-3.5 text-paper"
                      aria-hidden="true"
                    >
                      Izaberi <span>→</span>
                    </span>
                  </span>

                  <span
                    className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-azure-600 transition-transform duration-700 ease-delta group-hover:scale-x-100"
                    aria-hidden="true"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ---------- 02 ---------- */}
        {step === 1 && kind && (
          <motion.div
            key="s1"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="pt-10"
          >
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <h2 className="t-display text-[clamp(1.29rem,7.4cqi,2.81rem)]">
                {kind === 'namestaj' ? 'Šta se čisti?' : 'Šta ulazi u obim?'}
              </h2>
              <button
                type="button"
                onClick={() => setStep(0)}
                className="t-meta-sm text-azure-700 underline underline-offset-4"
              >
                {kind === 'namestaj' ? 'Nameštaj' : 'Vozilo'} · promeni
              </button>
            </div>

            <p className="t-body mt-3 max-w-[46ch] text-slate pretty sm:hidden">
              Dodirnite sve što se odnosi na vas. Ništa nije obavezno osim
              predmeta.
            </p>

            <Field label="Predmet" hint="Više izbora je moguće">
              <Chips
                options={OBJECTS[kind]}
                selected={objects}
                onToggle={(v) => toggle(objects, setObjects, v)}
              />
            </Field>

            <Field label="Materijal" hint="Ako ne znate, nije problem">
              <Chips
                options={MATERIALS[kind]}
                selected={material ? [material] : []}
                onToggle={(v) => setMaterial(material === v ? '' : v)}
              />
            </Field>

            <Field label="Razlog">
              <Chips
                options={REASONS}
                selected={reasons}
                onToggle={(v) => toggle(reasons, setReasons, v)}
              />
            </Field>

            <Field label={kind === 'namestaj' ? 'Lokacija' : 'Lokacija vozila'}>
              <TextInput
                value={place}
                onChange={setPlace}
                placeholder={
                  kind === 'namestaj' ? 'Deo grada / opština' : 'Deo grada / adresa'
                }
                name="lokacija"
              />
            </Field>

            <Field label="Napomena" hint="Neobavezno">
              <TextArea
                value={message}
                onChange={setMessage}
                placeholder="Starost fleka, prethodni pokušaji čišćenja, sve što je bitno."
              />
            </Field>

            {!canStep1 && (
              <p className="t-meta-sm mt-8 text-slate sm:mt-10">
                Izaberite bar jedan predmet da nastavite.
              </p>
            )}

            <StepActions>
              <button
                type="button"
                onClick={() => setStep(0)}
                className="btn btn-line flex-1 justify-center sm:flex-none"
              >
                Nazad
              </button>
              <button
                type="button"
                disabled={!canStep1}
                onClick={() => setStep(2)}
                className={cn(
                  'btn btn-blue shear-l flex-[2] justify-center sm:flex-none',
                  !canStep1 && 'pointer-events-none opacity-35',
                )}
              >
                Dalje
              </button>
            </StepActions>
          </motion.div>
        )}

        {/* ---------- 03 ---------- */}
        {step === 2 && (
          <motion.div
            key="s2"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="pt-10"
          >
            <h2 className="t-display text-[clamp(1.29rem,7.4cqi,2.81rem)]">
              Gde da se javimo?
            </h2>

            <div className="grid gap-x-8 md:grid-cols-2">
              <Field label="Ime">
                <TextInput
                  value={name}
                  onChange={setName}
                  placeholder="Ime i prezime"
                  name="ime"
                  autoComplete="name"
                  required
                />
              </Field>

              <Field label="Telefon" hint="Telefon ili Instagram">
                <TextInput
                  value={phone}
                  onChange={setPhone}
                  placeholder="06x xxx xxxx"
                  name="telefon"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                />
              </Field>

              <Field label="Instagram" hint="Ako vam je lakše">
                <TextInput
                  value={insta}
                  onChange={setInsta}
                  placeholder="@vas_profil"
                  name="instagram"
                />
              </Field>

              <Field label="Termin" hint="Neobavezno">
                <TextInput
                  value={when}
                  onChange={setWhen}
                  placeholder="npr. radnim danima posle 17h"
                  name="termin"
                />
              </Field>
            </div>

            {/* fotografije */}
            <Field label="Fotografije" hint={`Najviše ${MAX_PHOTOS} · najbrži put do procene`}>
              <div className="flex flex-wrap items-center gap-3">
                {photos.map((p, i) => (
                  <div key={p.url} className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.url}
                      alt={`Priložena fotografija ${i + 1}`}
                      className="h-20 w-20 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(i)}
                      aria-label={`Ukloni fotografiju ${i + 1}`}
                      className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center bg-ink text-paper t-meta-sm"
                    >
                      ×
                    </button>
                  </div>
                ))}

                {photos.length < MAX_PHOTOS && (
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="flex h-20 w-20 items-center justify-center border border-dashed border-ink/30 t-meta-sm text-stone transition-colors duration-500 hover:border-ink/60 hover:text-ink"
                  >
                    + Dodaj
                  </button>
                )}

                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="sr-only"
                  onChange={(e) => {
                    onFiles(e.target.files);
                    e.target.value = '';
                  }}
                />
              </div>
              {photoError && (
                <p className="t-meta-sm mt-3 text-iris">{photoError}</p>
              )}
            </Field>

            <p className="t-meta-sm mt-8 max-w-[52ch] text-stone">
              Podaci se koriste isključivo za odgovor na ovaj upit.
            </p>

            {!canSubmit && (
              <p className="t-meta-sm mt-5 text-slate">
                Potrebni su ime i bar jedan kontakt.
              </p>
            )}
            {status === 'error' && (
              <p className="t-meta-sm mt-5 text-azure-700">{errorMsg}</p>
            )}

            <StepActions>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn btn-line flex-1 justify-center sm:flex-none"
              >
                Nazad
              </button>
              <button
                type="button"
                onClick={submit}
                disabled={!canSubmit || status === 'sending'}
                className={cn(
                  'btn btn-blue shear-l flex-[2] justify-center sm:flex-none',
                  (!canSubmit || status === 'sending') &&
                    'pointer-events-none opacity-35',
                )}
              >
                {status === 'sending' ? 'Šalje se…' : 'Pošalji upit'}
              </button>
            </StepActions>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Polja                                                              */
/* ------------------------------------------------------------------ */

/**
 * Traka sa radnjama.
 * Na telefonu se lepi za dno panela da sledeći korak uvek bude na dohvat;
 * od `sm` naviše je običan red dugmadi u toku stranice.
 */
function StepActions({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        'sticky bottom-0 z-10 -mx-6 mt-8 flex gap-3 border-t border-ink/12',
        'bg-paper-warm/95 px-6 py-4 backdrop-blur-sm',
        'sm:static sm:mx-0 sm:mt-10 sm:flex-wrap sm:border-0 sm:bg-transparent',
        'sm:px-0 sm:py-0 sm:backdrop-blur-none',
      )}
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 1rem)' }}
    >
      {children}
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-9 border-t border-ink/12 pt-5">
      <div className="mb-4">
        <span className="block font-sans text-[0.9375rem] font-medium tracking-[-0.008em] text-ink md:text-base">
          {label}
        </span>
        {hint && (
          <span className="mt-0.5 block font-sans text-[0.8125rem] text-slate">
            {hint}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function Chips({
  options,
  selected,
  onToggle,
}: {
  options: string[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = selected.includes(o);
        return (
          <button
            key={o}
            type="button"
            onClick={() => onToggle(o)}
            aria-pressed={on}
            className={cn(
              'flex min-h-[44px] items-center gap-2 px-4 font-sans text-[0.9375rem]',
              'transition-all duration-500 ease-delta',
              on
                ? 'bg-azure-700 text-paper'
                : 'text-slate shadow-[inset_0_0_0_1px_rgba(14,17,22,0.16)] hover:text-ink hover:shadow-[inset_0_0_0_1px_rgba(50,73,115,0.5)]',
            )}
          >
            {on && (
              <span aria-hidden="true" className="text-[0.8em] leading-none">
                ✓
              </span>
            )}
            {o}
          </button>
        );
      })}
    </div>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
  name,
  type = 'text',
  autoComplete,
  inputMode,
  required,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  name: string;
  type?: string;
  autoComplete?: string;
  inputMode?: 'text' | 'tel' | 'email';
  required?: boolean;
}) {
  return (
    <input
      name={name}
      type={type}
      value={value}
      required={required}
      autoComplete={autoComplete}
      inputMode={inputMode}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label={name}
      className="w-full border-b border-ink/25 bg-transparent pb-3 text-[1.0625rem] text-ink outline-none transition-colors duration-500 placeholder:text-stone focus:border-ink"
    />
  );
}

function TextArea({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <textarea
      value={value}
      rows={3}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label="Napomena"
      className="w-full resize-y border-b border-ink/25 bg-transparent pb-3 text-[1.0625rem] leading-relaxed text-ink outline-none transition-colors duration-500 placeholder:text-stone focus:border-ink"
    />
  );
}
