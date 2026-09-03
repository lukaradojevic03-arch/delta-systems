'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

/**
 * Nivo uređaja.
 *
 * `high`  — puni efekti: parallax, zrno, duotone, maskirani reveal, prelaz
 *           između stranica sa ukošenim pločama.
 * `mid`   — bez parallaxa i lakše maske; sve ostalo ostaje.
 * `low`   — samo prelivanje providnosti; nikakav rad po skrolu.
 *
 * Jači uređaji ne gube ništa: nivo se spušta tek kada uređaj sam pokaže da
 * ne stiže (malo jezgara/memorije, ušteda podataka, spor mrežni tip) ili
 * kada izmereno vreme kadra pređe prag.
 */

export type PerfTier = 'low' | 'mid' | 'high';

const PerfContext = createContext<PerfTier>('high');

export const usePerf = () => useContext(PerfContext);

/** true kada su teški efekti dozvoljeni */
export const useRichMotion = () => useContext(PerfContext) === 'high';

type NavigatorWithHints = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean; effectiveType?: string };
};

function initialTier(): PerfTier {
  if (typeof window === 'undefined') return 'high';

  const nav = navigator as NavigatorWithHints;
  const memory = nav.deviceMemory ?? 8;
  const cores = nav.hardwareConcurrency ?? 8;
  const conn = nav.connection;
  const saveData = conn?.saveData === true;
  const slowNet = /^(slow-)?2g$/.test(conn?.effectiveType ?? '');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduce || saveData || slowNet || memory <= 2 || cores <= 2) return 'low';
  if (memory <= 4 || cores <= 4) return 'mid';
  return 'high';
}

export function PerfProvider({ children }: { children: ReactNode }) {
  const [tier, setTier] = useState<PerfTier>('high');

  useEffect(() => {
    let cancelled = false;
    const start = initialTier();
    if (!cancelled) setTier(start);
    document.documentElement.dataset.perf = start;

    // Ako je uređaj prijavio dobre brojeve, proveri i stvarno vreme kadra.
    if (start === 'low') return;

    let frames = 0;
    let total = 0;
    let last = performance.now();
    let raf = 0;

    const probe = (now: number) => {
      const delta = now - last;
      last = now;
      // prvi kadar posle mount-a je uvek dug, preskoči ga
      if (frames > 0) total += delta;
      frames += 1;

      if (frames < 45) {
        raf = requestAnimationFrame(probe);
        return;
      }

      const avg = total / (frames - 1);
      if (cancelled) return;

      // > 24 ms po kadru (ispod ~42 fps) znači da uređaj ne stiže
      const next: PerfTier = avg > 32 ? 'low' : avg > 24 ? 'mid' : start;
      const resolved: PerfTier =
        next === 'low' ? 'low' : start === 'mid' ? 'mid' : next;

      setTier(resolved);
      document.documentElement.dataset.perf = resolved;
    };

    raf = requestAnimationFrame(probe);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, []);

  const value = useMemo(() => tier, [tier]);

  return <PerfContext.Provider value={value}>{children}</PerfContext.Provider>;
}
