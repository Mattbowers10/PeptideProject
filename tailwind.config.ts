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
        midnight: '#010120',
        magenta: '#ef2cc1',
        'brand-orange': '#fc4c02',
        lavender: '#bdbbff',
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
        blue: 'rgba(1, 1, 32, 0.1) 0px 4px 10px',
        'blue-lg': 'rgba(1, 1, 32, 0.15) 0px 8px 24px',
        'blue-xl': 'rgba(1, 1, 32, 0.2) 0px 12px 32px',
      },
    },
  },
  plugins: [],
}

export default config
