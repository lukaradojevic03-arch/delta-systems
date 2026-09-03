'use client';

import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { cn, EASE } from '@/lib/cn';

/* ------------------------------------------------------------------ */
/*  ImageReveal — slika se otkriva ispod maske koja klizi naviše,      */
/*  uz blagi zoom-out. Opcioni dijagonalni rez (potpis brenda).        */
/* ------------------------------------------------------------------ */

export function ImageReveal({
  src,
  alt,
  ratio = '4 / 5',
  className,
  imgClassName,
  shear,
  sizes = '(max-width: 768px) 100vw, 50vw',
  priority = false,
  delay = 0,
  quality = 82,
}: {
  src: string;
  alt: string;
  ratio?: string;
  className?: string;
  imgClassName?: string;
  shear?: 'left' | 'right' | 'both';
  sizes?: string;
  priority?: boolean;
  delay?: number;
  quality?: number;
}) {
  const reduce = useReducedMotion();
  const shearClass =
    shear === 'left'
      ? 'shear-l'
      : shear === 'right'
        ? 'shear-r'
        : shear === 'both'
          ? 'shear-both'
          : '';

  return (
    // Okidač je na spoljnom okviru: unutrašnji sloj je isečen (clip-path),
    // pa ga IntersectionObserver ne bi pouzdano prijavio.
    <motion.div
      className={cn('relative overflow-hidden grain', shearClass, className)}
      style={{ aspectRatio: ratio }}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
    >
      {/* otkrivanje rezom, ne obojenom maskom — radi na svakoj podlozi */}
      <motion.div
        className="absolute inset-0"
        variants={
          reduce
            ? { hidden: { opacity: 0 }, shown: { opacity: 1 } }
            : {
                hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
                shown: { clipPath: 'inset(0% 0% 0% 0%)' },
              }
        }
        transition={{ duration: 1.15, delay, ease: EASE }}
      >
        <motion.div
          className="absolute inset-0"
          variants={
            reduce
              ? {}
              : { hidden: { scale: 1.14 }, shown: { scale: 1 } }
          }
          transition={{ duration: 1.6, delay, ease: EASE }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            quality={quality}
            className={cn('object-cover', imgClassName)}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Parallax — suptilno pomeranje pri skrolu (samo desktop-nivo amplituda) */
/* ------------------------------------------------------------------ */

export function Parallax({
  children,
  amount = 40,
  className,
}: {
  children: React.ReactNode;
  amount?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? undefined : { y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
