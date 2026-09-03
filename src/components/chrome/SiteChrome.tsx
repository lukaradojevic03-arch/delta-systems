'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { nav, site } from '@/lib/site';
import { cn, EASE, EASE_SHEAR } from '@/lib/cn';
import { Wordmark } from '@/components/ui/Wordmark';

/** Stavke u traci na desktopu · Kontakt je izdvojen kao dugme. */
const barItems = nav.filter((n) => n.href !== '/' && n.href !== '/kontakt');

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

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      {/* napredak čitanja · puni se nadole, prazni nagore */}
      <motion.div
        className="fixed left-0 top-0 z-[70] h-[3px] w-full origin-left"
        style={{
          scaleX: progress,
          background: 'linear-gradient(90deg,#A8C1E4,#5B80BC,#324973)',
        }}
        aria-hidden="true"
      />

      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[60] transition-[background-color,box-shadow,backdrop-filter] duration-500',
          scrolled && !open
            ? 'bg-paper/88 backdrop-blur-md shadow-[0_1px_0_0_rgba(14,17,22,0.10)]'
            : 'bg-transparent',
        )}
      >
        <div className="edge flex h-[72px] items-center justify-between gap-8 md:h-[84px]">
          <Link
            href="/"
            aria-label="Delta Systems, početna"
            className={cn(
              'shrink-0 transition-colors duration-500',
              open ? 'text-paper' : 'text-ink',
            )}
          >
            <Wordmark size="sm" className="md:hidden" />
            <Wordmark size="md" className="hidden md:inline-flex" />
          </Link>

          {/* ---------- desktop: cela navigacija u zaglavlju ---------- */}
          <nav
            aria-label="Glavna navigacija"
            className="hidden items-center gap-5 md:flex lg:gap-7 xl:gap-9"
          >
            {barItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={cn(
                  'group relative py-2 font-sans text-[0.9375rem] tracking-[-0.01em] transition-colors duration-500',
                  isActive(item.href) ? 'text-ink' : 'text-slate hover:text-ink',
                )}
              >
                {item.label}
                <span
                  className={cn(
                    'absolute inset-x-0 -bottom-0.5 h-px origin-left bg-azure-600 transition-transform duration-500 ease-delta',
                    isActive(item.href)
                      ? 'scale-x-100'
                      : 'scale-x-0 group-hover:scale-x-100',
                  )}
                  aria-hidden="true"
                />
              </Link>
            ))}

            <Link
              href="/kontakt"
              className={cn(
                'btn shear-l !px-5 !py-3 lg:!px-6',
                pathname === '/kontakt' ? 'btn-line' : 'btn-blue',
              )}
            >
              Pošalji upit
            </Link>
          </nav>

          {/* ---------- mobilni / tablet: dugme za meni ---------- */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="delta-index"
            className={cn(
              'group flex items-center gap-3 py-2 transition-colors duration-500 md:hidden',
              open ? 'text-paper' : 'text-ink',
            )}
          >
            <span className="t-meta hidden sm:inline">
              {open ? 'Zatvori' : 'Meni'}
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

      <AnimatePresence>{open && <MenuOverlay pathname={pathname} />}</AnimatePresence>

      <CtaDock hidden={open || pathname === '/kontakt'} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Meni · celoekranska navigacija za mobilni i tablet                 */
/* ------------------------------------------------------------------ */

function MenuOverlay({ pathname }: { pathname: string }) {
  const firstRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const t = setTimeout(() => firstRef.current?.focus(), 420);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      id="delta-index"
      className="fixed inset-0 z-[55] overflow-y-auto overscroll-contain bg-azure-900 text-paper md:hidden"
      initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
      animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
      exit={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
      transition={{ duration: 0.66, ease: EASE_SHEAR }}
    >
      <div className="edge flex min-h-full flex-col justify-between pb-8 pt-[96px]">
        <nav aria-label="Glavna navigacija">
          <ul>
            {nav.map((item, i) => {
              const active =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);
              return (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.14 + i * 0.05, ease: EASE }}
                  className="border-b border-paper/15"
                >
                  <Link
                    ref={i === 0 ? firstRef : undefined}
                    href={item.href}
                    className="group flex items-center gap-4 py-3.5"
                  >
                    <span className="t-meta-sm w-7 shrink-0 text-paper/45">
                      {item.code}
                    </span>
                    <span className="t-display text-[clamp(1.7rem,min(7.5vw,7vh),3.2rem)]">
                      {item.label}
                    </span>
                    {active && (
                      <span className="t-meta-sm ml-auto text-azure-200">
                        Trenutno
                      </span>
                    )}
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </nav>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-10"
        >
          <Link href="/kontakt" className="btn btn-line-invert w-full justify-center">
            Pošalji upit
          </Link>
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="t-meta link-delta mt-6 block text-paper/70"
          >
            Instagram {site.instagram.handle}
          </a>
          <p className="t-meta mt-2 text-paper/40">
            {site.city} · {site.tagline}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stalni CTA · samo tamo gde nema trake u zaglavlju                  */
/* ------------------------------------------------------------------ */

function CtaDock({ hidden }: { hidden: boolean }) {
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
          className="fixed bottom-0 right-0 z-[58] p-4 md:hidden"
          style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 1rem)' }}
        >
          <Link
            href="/kontakt"
            className="btn btn-blue shear-l !py-3.5 !pl-7 !pr-6 !text-[11px] shadow-[0_18px_40px_-22px_rgba(14,17,22,0.7)]"
          >
            Pošalji upit
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
