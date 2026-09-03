'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { services } from '@/lib/site';
import { cn, EASE } from '@/lib/cn';

/**
 * Usluge kao editorial navigacija — redovi, ne kartice.
 * Fotografija je uska traka koja se pri hover-u širi i skalira,
 * a naslov se pomera uz dijagonalni rez.
 */
export function ServiceRows({
  invert = false,
  /** Na stranici Usluge red pokazuje obim, na početnoj kratak uvod. */
  detailed = false,
}: {
  invert?: boolean;
  detailed?: boolean;
}) {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <div
      className={cn('border-t', invert ? 'border-paper/15' : 'border-ink/12')}
      onMouseLeave={() => setHover(null)}
    >
      {services.map((s, idx) => {
        const on = hover === s.slug;
        const dim = hover !== null && !on;

        return (
          <motion.div
            key={s.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.8, delay: idx * 0.1, ease: EASE }}
            className={cn('border-b', invert ? 'border-paper/15' : 'border-ink/12')}
          >
            <Link
              href={`/usluge/${s.slug}`}
              onMouseEnter={() => setHover(s.slug)}
              className="group relative block py-6 md:py-9"
            >
              <div className="grid items-center gap-6 md:grid-cols-12 md:gap-8">
                <div className="md:col-span-1">
                  <span
                    className={cn(
                      't-meta-sm transition-opacity duration-500',
                      invert ? 'text-paper/45' : 'text-stone',
                      dim && 'opacity-40',
                    )}
                  >
                    {s.code}
                  </span>
                </div>

                <div className="cq md:col-span-5">
                  <h3
                    className={cn(
                      't-display text-[clamp(1.89rem,17.2cqi,4.68rem)] transition-all duration-[900ms] ease-delta',
                      'group-hover:translate-x-2 md:group-hover:translate-x-5',
                      invert ? 'text-paper' : 'text-ink',
                      dim && 'opacity-30',
                    )}
                  >
                    {s.title}
                  </h3>
                  <p
                    className={cn(
                      't-meta mt-3 transition-opacity duration-500 md:mt-4',
                      invert ? 'text-paper/55' : 'text-stone',
                      dim && 'opacity-30',
                    )}
                  >
                    {s.kicker}
                  </p>
                </div>

                <div className="md:col-span-4">
                  {detailed ? (
                    <ul
                      className={cn(
                        'grid grid-cols-2 gap-x-4 gap-y-1.5 transition-opacity duration-500',
                        dim && 'opacity-30',
                      )}
                    >
                      {s.items.map((it) => (
                        <li
                          key={it}
                          className={cn(
                            't-meta-sm',
                            invert ? 'text-paper/65' : 'text-slate',
                          )}
                        >
                          {it}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p
                      className={cn(
                        't-body max-w-[38ch] transition-opacity duration-500',
                        invert ? 'text-paper/70' : 'text-slate',
                        dim && 'opacity-30',
                      )}
                    >
                      {s.lede}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <div
                    className={cn(
                      'relative overflow-hidden shear-r grain transition-[width,transform] duration-[900ms] ease-delta',
                      'h-[120px] w-full md:h-[150px]',
                      invert ? 'bg-ink-soft' : 'bg-paper-bone',
                    )}
                  >
                    <Image
                      src={s.image}
                      alt={s.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 18vw"
                      quality={80}
                      className={cn(
                        'object-cover transition-transform duration-[1200ms] ease-delta',
                        on ? 'scale-110' : 'scale-100',
                      )}
                    />
                  </div>

                  <span
                    className={cn(
                      't-meta-sm mt-4 flex items-center gap-2 transition-all duration-500',
                      invert ? 'text-paper/70' : 'text-ink',
                      on ? 'translate-x-1.5 opacity-100' : 'opacity-55',
                    )}
                  >
                    Pogledaj
                    <span aria-hidden="true">→</span>
                  </span>
                </div>
              </div>

              {/* spectrum linija koja se izvlači po hover-u */}
              <span
                className={cn(
                  'rule-spectrum absolute bottom-0 left-0 w-full origin-left transition-transform duration-[900ms] ease-delta',
                  on ? 'scale-x-100' : 'scale-x-0',
                )}
                aria-hidden="true"
              />
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
