'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';

/**
 * Δ — interaktivno poređenje PRE / POSLE.
 *
 * Rez nije vertikalan nego dijagonalan, pod istim uglom kao podela
 * u vizuelnom materijalu klijenta (var --shear). Radi mišem, prstom
 * i tastaturom; vertikalni skrol na mobilnom ostaje nepromenjen
 * (touch-action: pan-y).
 */

const SHEAR = 3.2; // polovina ugla reza, u procentima širine

export function DeltaSlider({
  before,
  after,
  beforeAlt,
  afterAlt,
  ratio = '4 / 3',
  className,
  priority = false,
  sizes = '(max-width: 900px) 100vw, 60vw',
  label,
}: {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  ratio?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  label?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const [active, setActive] = useState(false);
  const [hinted, setHinted] = useState(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const next = ((clientX - r.left) / r.width) * 100;
    setPos(Math.min(94, Math.max(6, next)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    setHinted(true);
    setActive(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setFromClientX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!active) return;
    setFromClientX(e.clientX);
  };

  const endDrag = (e: React.PointerEvent) => {
    if (!active) return;
    setActive(false);
    const el = e.currentTarget as HTMLElement;
    if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 3;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setHinted(true);
      setPos((p) => Math.max(6, p - step));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setHinted(true);
      setPos((p) => Math.min(94, p + step));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setPos(6);
    } else if (e.key === 'End') {
      e.preventDefault();
      setPos(94);
    }
  };

  /* diskretan nagoveštaj da se element pomera — jednom, pri ulasku u vidno polje */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    let cancelled = false;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hinted) return;
        io.disconnect();
        const t0 = performance.now();
        const run = (t: number) => {
          if (cancelled) return;
          const p = Math.min(1, (t - t0) / 1600);
          // 50 → 66 → 50, smooth
          const eased = Math.sin(p * Math.PI);
          setPos(50 + eased * 15);
          if (p < 1) raf = requestAnimationFrame(run);
        };
        raf = requestAnimationFrame(run);
      },
      { threshold: 0.45 },
    );

    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [hinted]);

  const clip = `polygon(0% 0%, ${pos + SHEAR}% 0%, ${pos - SHEAR}% 100%, 0% 100%)`;

  return (
    <figure className={cn('relative select-none', className)}>
      <div
        ref={wrapRef}
        className={cn(
          'relative w-full overflow-hidden bg-ink grain',
          active ? 'cursor-grabbing' : 'cursor-grab',
        )}
        style={{ aspectRatio: ratio, touchAction: 'pan-y' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {/* POSLE — puna podloga */}
        <Image
          src={after}
          alt={afterAlt}
          fill
          sizes={sizes}
          priority={priority}
          quality={84}
          className="object-cover pointer-events-none"
          draggable={false}
        />

        {/* PRE — isečeno dijagonalno */}
        <div
          className="absolute inset-0"
          style={{
            clipPath: clip,
            WebkitClipPath: clip,
            transition: active ? 'none' : 'clip-path 120ms linear',
          }}
        >
          <Image
            src={before}
            alt={beforeAlt}
            fill
            sizes={sizes}
            priority={priority}
            quality={84}
            className="object-cover pointer-events-none"
            draggable={false}
          />
        </div>

        {/* dijagonalna linija reza */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ transition: active ? 'none' : 'transform 120ms linear' }}
        >
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="delta-cut" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F0B48A" />
                <stop offset="38%" stopColor="#E0899F" />
                <stop offset="72%" stopColor="#A78BC8" />
                <stop offset="100%" stopColor="#8E9FD4" />
              </linearGradient>
            </defs>
            <line
              x1={pos + SHEAR}
              y1="0"
              x2={pos - SHEAR}
              y2="100"
              stroke="url(#delta-cut)"
              strokeWidth="0.45"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* hvataljka */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
            style={{ left: `${pos}%` }}
          >
            <div
              role="slider"
              tabIndex={0}
              aria-label={label ?? 'Poređenje pre i posle čišćenja'}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(pos)}
              aria-valuetext={`${Math.round(pos)}% prikazano stanje pre čišćenja`}
              onKeyDown={onKeyDown}
              className={cn(
                'pointer-events-auto flex h-11 w-11 items-center justify-center',
                'bg-paper text-ink font-mono text-[13px] leading-none',
                'transition-transform duration-500 ease-delta',
                active ? 'scale-95' : 'hover:scale-110',
              )}
              style={{ boxShadow: '0 0 0 1px rgba(14,17,22,.18), 0 10px 30px -12px rgba(14,17,22,.55)' }}
            >
              Δ
            </div>
          </div>
        </div>

        {/* oznake stanja */}
        <span className="pointer-events-none absolute left-0 top-0 t-meta-sm bg-ink/85 px-2.5 py-1.5 text-paper backdrop-blur-[2px]">
          Pre
        </span>
        <span className="pointer-events-none absolute right-0 bottom-0 t-meta-sm bg-paper/90 px-2.5 py-1.5 text-ink backdrop-blur-[2px]">
          Posle
        </span>
      </div>
    </figure>
  );
}
