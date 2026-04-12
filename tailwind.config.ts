import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Sunrise accent scale
        sunrise: {
          50:  '#FFF8F2',
          100: '#FEF0E3',
          200: '#FDDBB8',
          300: '#FAB87A',
          400: '#F49048',
          500: '#E8622A',  // primary accent
          600: '#C94B1A',
          700: '#A83912',
        },
        // Warm stone neutrals
        stone: {
          50:  '#FDFAF7',
          100: '#F5EFE8',
          200: '#EDE3D8',
          300: '#D9CABF',
          400: '#B8A396',
          500: '#8C7268',
          700: '#3D2E27',
          900: '#1E1511',
        },
        // Semantic aliases — keep these names since the codebase references them
        midnight: '#1E1511',   // was cold blue-black, now warm charcoal
        lavender: '#E8622A',   // was purple, now sunrise orange accent
        'brand-orange': '#E8622A',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Arial', 'sans-serif'],
        mono: ['var(--font-mono)', 'Georgia', 'monospace'],
      },
      letterSpacing: {
        display: '-0.03em',
        heading: '-0.02em',
        subheading: '-0.015em',
        tight: '-0.01em',
        mono: '0.005em',
        'mono-wide': '0.05em',
      },
      borderRadius: {
        sharp: '4px',
        comfortable: '8px',
      },
      boxShadow: {
        warm:      'rgba(30,21,17,0.08) 0px 4px 10px',
        'warm-lg': 'rgba(30,21,17,0.12) 0px 8px 24px',
        'warm-xl': 'rgba(30,21,17,0.18) 0px 12px 32px',
        // keep old keys as aliases
        blue:      'rgba(30,21,17,0.08) 0px 4px 10px',
        'blue-lg': 'rgba(30,21,17,0.12) 0px 8px 24px',
        'blue-xl': 'rgba(30,21,17,0.18) 0px 12px 32px',
      },
    },
  },
  plugins: [],
}

export default config
