export function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(' ');
}

export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_SHEAR: [number, number, number, number] = [0.76, 0, 0.24, 1];
