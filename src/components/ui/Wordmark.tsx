import { cn } from '@/lib/cn';

/**
 * Tipografski lockup — verna rekonstrukcija strukture logotipa
 * (široko razmaknuto D E L T Λ, ispod S Y S T E M S između linija).
 * Koristi se svuda gde raster logo ne bi bio dovoljno oštar.
 */
export function Wordmark({
  className,
  size = 'md',
  withSub = true,
}: {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  withSub?: boolean;
}) {
  const scale = {
    sm: { d: 'text-[15px]', track: '0.42em', sub: 'text-[7px]', gap: 'mt-1' },
    md: { d: 'text-[22px]', track: '0.44em', sub: 'text-[8px]', gap: 'mt-1.5' },
    lg: { d: 'text-[34px]', track: '0.46em', sub: 'text-[10px]', gap: 'mt-2.5' },
  }[size];

  return (
    <span className={cn('inline-flex flex-col items-center leading-none', className)}>
      <span
        className={cn('font-display flex items-baseline', scale.d)}
        style={{ letterSpacing: scale.track }}
        aria-hidden="true"
      >
        DELT
        <Lambda className="ml-[0.06em] inline-block" />
      </span>

      {withSub && (
        <span className={cn('flex w-full items-center gap-2', scale.gap)} aria-hidden="true">
          <span className="h-px flex-1 bg-current opacity-35" />
          <span
            className={cn('font-mono uppercase leading-none', scale.sub)}
            style={{ letterSpacing: '0.4em', paddingLeft: '0.4em' }}
          >
            Systems
          </span>
          <span className="h-px flex-1 bg-current opacity-35" />
        </span>
      )}
      <span className="sr-only">Delta Systems</span>
    </span>
  );
}

/** „A" iz logotipa: šiljak bez prečke. */
function Lambda({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 84 100"
      className={cn('h-[0.71em] w-[0.6em]', className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="5"
      vectorEffect="non-scaling-stroke"
      aria-hidden="true"
    >
      <path d="M4 98 L42 4 L80 98" strokeLinecap="square" />
    </svg>
  );
}
