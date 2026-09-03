import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // pun raspon prozirnosti — modifikatori tipa `border-ink/12` inače
      // ne postoje u podrazumevanoj skali (koja ide na 5)
      opacity: Object.fromEntries(
        Array.from({ length: 101 }, (_, i) => [String(i), String(i / 100)]),
      ),
      colors: {
        ink: {
          DEFAULT: '#0E1116',
          soft: '#171B22',
          line: '#242932',
        },
        paper: {
          DEFAULT: '#F4F1EB',
          warm: '#EFEBE2',
          bone: '#E4DED2',
        },
        stone: '#B5AEA1',
        slate: '#6F6A60',
        iris: '#7A5FA6',
        // duboka plavo-zelena iz velura — druga tamna podloga pored ink-a
        petrol: {
          DEFAULT: '#123437',
          deep: '#0C2528',
          soft: '#1B4448',
        },
        clay: '#8C5A46',
        spectrum: {
          peach: '#F0B48A',
          rose: '#E0899F',
          lilac: '#A78BC8',
          peri: '#8E9FD4',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        wider: '0.08em',
        widest: '0.18em',
        brand: '0.34em',
      },
      spacing: {
        18: '4.5rem',
      },
      maxWidth: {
        edge: '96rem',
      },
      transitionTimingFunction: {
        delta: 'cubic-bezier(0.16, 1, 0.3, 1)',
        shear: 'cubic-bezier(0.76, 0, 0.24, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
