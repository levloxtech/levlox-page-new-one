/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        theme: {
          dominant: 'var(--c-dominant)',
          dominantHover: 'var(--c-dominant-hover)',
          bg: 'var(--c-bg)',
          surface: 'var(--c-surface)',
          surfaceMuted: 'var(--c-surface-muted)',
          typo: 'var(--c-typo)',
          textMuted: 'var(--c-text-muted)',
          supporting: 'var(--c-supporting)',
          border: 'var(--c-border)',
          contrastBg: 'var(--c-contrast-bg)',
          contrastSurface: 'var(--c-contrast-surface)',
          contrastText: 'var(--c-contrast-text)',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
