import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Prijem upita.
 *
 * Ako je podešena promenljiva okruženja CONTACT_WEBHOOK_URL (npr. Make,
 * Zapier, n8n ili sopstveni endpoint), upit se prosleđuje tamo.
 * Bez nje upit se samo evidentira u logu servera, a korisnik u svakom
 * slučaju dobija potvrdu i direktan link ka Instagram poruci.
 */

type Payload = {
  kind?: string;
  answers?: Record<string, unknown>;
  contact?: { name?: string; phone?: string; instagram?: string; when?: string };
  message?: string;
  photos?: { name: string; type: string; data: string }[];
};

const MAX_BODY = 5 * 1024 * 1024; // 5 MB

export async function POST(req: Request) {
  const len = Number(req.headers.get('content-length') ?? 0);
  if (len > MAX_BODY) {
    return NextResponse.json(
      { ok: false, error: 'Prilozi su preveliki. Pošaljite najviše 3 fotografije.' },
      { status: 413 },
    );
  }

  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: 'Neispravan zahtev.' }, { status: 400 });
  }

  const name = body.contact?.name?.trim();
  const phone = body.contact?.phone?.trim();
  const instagram = body.contact?.instagram?.trim();

  if (!body.kind || !name || (!phone && !instagram)) {
    return NextResponse.json(
      { ok: false, error: 'Nedostaju obavezna polja.' },
      { status: 422 },
    );
  }

  const record = {
    receivedAt: new Date().toISOString(),
    kind: body.kind,
    answers: body.answers ?? {},
    contact: { name, phone: phone || null, instagram: instagram || null, when: body.contact?.when || null },
    message: body.message ?? '',
    photoCount: body.photos?.length ?? 0,
  };

  const hook = process.env.CONTACT_WEBHOOK_URL;
  if (hook) {
    try {
      await fetch(hook, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...record, photos: body.photos ?? [] }),
      });
    } catch (err) {
      console.error('[upit] prosleđivanje nije uspelo', err);
      return NextResponse.json(
        { ok: false, error: 'Slanje trenutno nije moguće. Pišite nam na Instagramu.' },
        { status: 502 },
      );
    }
  } else {
    console.info('[upit]', JSON.stringify(record));
  }

  return NextResponse.json({ ok: true });
}
