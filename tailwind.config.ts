import type { Config } from 'tailwindcss';

/**
 * Tokens are the design handoff verbatim. Anything not in this file is a
 * one-off in the comps and belongs in an arbitrary value at the call site,
 * not here — the scale stays small on purpose.
 */
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#17130F',
        body: '#4A423B',
        // The handoff's #8A8078 / #B0A79E measure 3.6:1 and 2.2:1 on cream, which
        // fails AA at the sizes they are used (captions, eyebrows, notes — all
        // under 18.66px). Darkened to the lightest values that clear 4.5:1 on
        // both cream and paper, keeping the warm grey hue and the three tiers.
        muted: '#6C645C',   // 5.44:1 — menu descriptions
        subtle: '#726A63',  // 4.97:1 — eyebrows, captions, metadata
        faint: '#786F68',   // 4.61:1 — quiet notes and hints
        cream: '#FBF7F1',
        paper: '#FFFDFA',
        teal: { DEFAULT: '#00707A', deep: '#0F4E56', mid: '#3AA1A8' },
        gold: { DEFAULT: '#F4E07B', warm: '#FFAE32' },
      },
      fontFamily: {
        display: ['var(--font-newsreader)', 'Georgia', 'serif'],
        sans: ['var(--font-archivo)', 'system-ui', 'sans-serif'],
      },
      maxWidth: { measure: '1440px' },
      borderRadius: { DEFAULT: '2px' },
      boxShadow: {
        label: '0 10px 26px rgba(23,19,15,.10)',
        'label-lift': '0 14px 34px rgba(23,19,15,.14)',
        phone: '0 12px 30px rgba(23,19,15,.11)',
        breakout: '0 26px 60px rgba(23,19,15,.24)',
      },
      transitionTimingFunction: { standard: 'cubic-bezier(.2,.7,.2,1)', fade: 'cubic-bezier(.3,.7,.2,1)' },
    },
  },
  plugins: [],
} satisfies Config;
