import type { Config } from 'tailwindcss';

/**
 * Direction 4 — "The Quiet Case". Six colours, two faces, 1px rules.
 * Teal and gold are accents only: never a fill, never a background.
 */
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#FAF8F2',
        ink: '#1D1C19',
        body: '#3F3C36',
        muted: '#6E6A61',
        teal: '#00707A',
        gold: '#F4E07B',
        /**
         * Canvas over ink, by role. The handoff's 45% tag tint measures 4.26:1,
         * which misses AA at 10.5px, so tags sit at 52% (5.15:1) instead. Every
         * other step is the handoff's own value and already clears 4.5:1.
         */
        dark: {
          DEFAULT: 'rgba(250,248,242,.92)',
          desc: 'rgba(250,248,242,.72)',
          lede: 'rgba(250,248,242,.68)',
          note: 'rgba(250,248,242,.62)',
          head: 'rgba(250,248,242,.55)',
          cap: 'rgba(250,248,242,.50)',
          tag: 'rgba(250,248,242,.52)',
        },
      },
      fontFamily: {
        sans: ['var(--font-schibsted)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-newsreader)', 'Georgia', 'serif'],
      },
      borderColor: {
        'rule-light': 'rgba(29,28,25,.20)',
        'rule-list': 'rgba(29,28,25,.18)',
        'rule-row': 'rgba(29,28,25,.12)',
        'rule-dark': 'rgba(250,248,242,.22)',
        'rule-dark-mid': 'rgba(250,248,242,.16)',
        'rule-dark-row': 'rgba(250,248,242,.14)',
      },
      maxWidth: { measure: '1440px' },
    },
  },
  plugins: [],
} satisfies Config;
