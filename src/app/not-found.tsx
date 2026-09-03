import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="cq edge flex min-h-[70vh] flex-col justify-center py-32">
      <p className="t-meta text-stone">404 — Stranica ne postoji</p>
      <h1 className="t-display mt-6 text-[clamp(2.2rem,19cqi,7rem)]">
        Ovde nema
        <br />
        <span className="italic">ničega.</span>
      </h1>
      <div className="rule-spectrum my-10 w-28" />
      <p className="t-lede max-w-[36ch] text-ink/75">
        Adresa je pogrešna ili je stranica premeštena.
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <Link href="/" className="btn btn-ink shear-l">
          Početna
        </Link>
        <Link href="/rezultati" className="btn btn-line">
          Rezultati
        </Link>
      </div>
    </section>
  );
}
