'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { nav, site } from '@/lib/site';
import { cn, EASE, EASE_SHEAR } from '@/lib/cn';
import { Wordmark } from '@/components/ui/Wordmark';

export function SiteChrome() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    mass: 0.4,
  });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      {/* traka napretka — jedina stalna pojava spektra */}
      <motion.div
        className="rule-spectrum fixed left-0 top-0 z-[70] w-full origin-left"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />

      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[60] transition-[background-color,box-shadow,backdrop-filter] duration-500',
          scrolled && !open
            ? 'bg-paper/82 backdrop-blur-md shadow-[0_1px_0_0_rgba(14,17,22,0.10)]'
            : 'bg-transparent',
        )}
      >
        <div className="edge flex h-[72px] items-center justify-between md:h-[84px]">
          <Link
            href="/"
            aria-label="Delta Systems — početna"
            className={cn(
              'transition-colors duration-500',
              open ? 'text-paper' : 'text-ink',
            )}
          >
            <Wordmark size="sm" className="md:hidden" />
            <Wordmark size="md" className="hidden md:inline-flex" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="delta-index"
            className={cn(
              'group flex items-center gap-3 py-2 transition-colors duration-500',
              open ? 'text-paper' : 'text-ink',
            )}
          >
            <span className="t-meta hidden sm:inline">
              {open ? 'Zatvori' : 'Indeks'}
            </span>
            <span className="relative block h-[14px] w-[26px]" aria-hidden="true">
              <span
                className={cn(
                  'absolute left-0 block h-px w-full bg-current transition-all duration-500 ease-shear',
                  open ? 'top-[7px] rotate-[14deg]' : 'top-[3px] group-hover:w-[70%]',
                )}
              />
              <span
                className={cn(
                  'absolute left-0 block h-px w-full bg-current transition-all duration-500 ease-shear',
                  open ? 'top-[7px] -rotate-[14deg]' : 'top-[10px]',
                )}
              />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>{open && <IndexOverlay pathname={pathname} />}</AnimatePresence>

      <CtaDock hidden={open || pathname === '/kontakt'} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Indeks — celoekranska tipografska navigacija                       */
/* ------------------------------------------------------------------ */

function IndexOverlay({ pathname }: { pathname: string }) {
  const [hover, setHover] = useState<string | null>(null);
  const firstRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const t = setTimeout(() => firstRef.current?.focus(), 420);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      id="delta-index"
      className="fixed inset-0 z-[55] overflow-y-auto overscroll-contain bg-ink text-paper"
      initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
      animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
      exit={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
      transition={{ duration: 0.72, ease: EASE_SHEAR }}
    >
      <div className="edge flex min-h-full flex-col justify-between pb-8 pt-[96px] md:pt-[116px]">
        <nav aria-label="Glavna navigacija">
          <ul onMouseLeave={() => setHover(null)}>
            {nav.map((item, i) => {
              const active =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);
              return (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.16 + i * 0.055, ease: EASE }}
                  className="border-b border-paper/12"
                >
                  <Link
                    ref={i === 0 ? firstRef : undefined}
                    href={item.href}
                    onMouseEnter={() => setHover(item.href)}
                    className="group flex items-baseline gap-4 py-3 md:gap-8 md:py-4"
                  >
                    <span className="t-meta-sm w-7 shrink-0 text-paper/45 md:w-10">
                      {item.code}
                    </span>

                    <span
                      className={cn(
                        't-display text-[clamp(1.9rem,min(8vw,8vh),5rem)] transition-[transform,opacity] duration-700 ease-delta',
                        'group-hover:translate-x-2 md:group-hover:translate-x-4',
                        hover && hover !== item.href ? 'opacity-35' : 'opacity-100',
                      )}
                    >
                      {item.label}
                    </span>

                    <span className="ml-auto hidden items-center gap-4 md:flex">
                      <span
                        className={cn(
                          't-meta-sm text-paper/55 transition-opacity duration-500',
                          hover === item.href ? 'opacity-100' : 'opacity-0',
                        )}
                      >
                        {item.note}
                      </span>
                      {active && (
                        <span className="t-meta-sm text-paper/70">Trenutno</span>
                      )}
                    </span>
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </nav>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <div className="rule-spectrum mb-4 w-24" />
            <p className="t-meta text-paper/55">{site.tagline}</p>
            <p className="t-meta mt-1.5 text-paper/35">
              {site.city} — Dubinsko čišćenje
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="t-meta link-delta text-paper/75 hover:text-paper"
            >
              Instagram {site.instagram.handle}
            </a>
            <Link href="/kontakt" className="btn btn-line-invert">
              Pošalji upit
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stalni CTA                                                         */
/* ------------------------------------------------------------------ */

function CtaDock({ hidden }: { hidden: boolean }) {
  // Sklanja se pri skrolu nadole da ne prekriva tekst, vraća se pri skrolu nagore.
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const atBottom =
        y + window.innerHeight >= document.documentElement.scrollHeight - 120;
      if (y < 160 || atBottom) setVisible(true);
      else if (y > last + 8) setVisible(false);
      else if (y < last - 8) setVisible(true);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {!hidden && visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="fixed bottom-0 right-0 z-[58] p-4 md:p-6"
          style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 1rem)' }}
        >
          <Link
            href="/kontakt"
            className="btn btn-ink shear-l !py-3.5 !pl-7 !pr-6 md:!py-4 md:!pl-8 md:!pr-7"
          >
            <span aria-hidden="true" className="text-[13px]">Δ</span>
            Pošalji upit
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
