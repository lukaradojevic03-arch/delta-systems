import { comparison } from '@/lib/site';
import { Reveal } from '@/components/motion/Reveal';
import { cn } from '@/lib/cn';

/**
 * Usisavanje vs dubinsko pranje.
 * Nije marketinška tabela · samo razlika u tome dokle koji postupak stiže.
 */
export function Comparison({ className }: { className?: string }) {
  const cols = [
    { ...comparison.a, tone: 'muted' as const },
    { ...comparison.b, tone: 'accent' as const },
  ];

  return (
    <div className={cn('grid gap-4 md:grid-cols-2 md:gap-6', className)}>
      {cols.map((col, ci) => (
        <Reveal key={col.label} delay={ci * 0.1}>
          <div
            className={cn(
              'relative h-full p-6 sm:p-8',
              col.tone === 'accent'
                ? 'bg-azure-800 text-paper'
                : 'bg-paper-warm text-ink',
            )}
          >
            <div className="flex items-baseline gap-3">
              <span
                className={cn(
                  't-meta-sm',
                  col.tone === 'accent' ? 'text-azure-200' : 'text-stone',
                )}
              >
                {ci === 0 ? 'Dokle stiže' : 'Dokle stiže'}
              </span>
              <span
                className={cn(
                  't-display text-[clamp(1.3rem,3.6vw,1.9rem)]',
                  col.tone === 'accent' ? 'text-paper' : 'text-ink',
                )}
              >
                {col.label}
              </span>
            </div>

            <ul className="mt-6 space-y-0">
              {col.rows.map((r) => (
                <li
                  key={r}
                  className={cn(
                    'flex gap-4 border-t py-3.5',
                    col.tone === 'accent' ? 'border-paper/18' : 'border-ink/12',
                  )}
                >
                  <span
                    className={cn(
                      'mt-[0.55em] block h-px w-4 shrink-0',
                      col.tone === 'accent' ? 'bg-azure-300' : 'bg-stone',
                    )}
                    aria-hidden="true"
                  />
                  <span
                    className={cn(
                      'font-sans text-[0.9375rem] leading-relaxed md:text-base',
                      col.tone === 'accent' ? 'text-paper/85' : 'text-slate',
                    )}
                  >
                    {r}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
