/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#FFFFFF',
          soft: '#FFFFFF',
          raised: '#FFFFFF',
        },
        ink: {
          DEFAULT: '#141414',
          dim: '#3C3C42',
          faint: '#8A8A90',
        },
        accent: {
          DEFAULT: '#FF2E0F',
          soft: '#FFE5E0',
          dim: '#E02000',
        },
        signal: {
          DEFAULT: '#0072E3',
          soft: '#E0EEFC',
        },
        violet: {
          DEFAULT: '#AB54F7',
          soft: '#F0E6FD',
        },
        night: {
          DEFAULT: '#130F17',
          raised: '#1E1823',
          line: 'rgba(255,255,255,0.12)',
        },
        line: '#EDEDEF',
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'clamp-hero': 'clamp(2.5rem, 7.4vw, 6.5rem)',
        'clamp-h1': 'clamp(2.1rem, 4.6vw, 3.75rem)',
        'clamp-h2': 'clamp(1.65rem, 3.2vw, 2.5rem)',
      },
      transitionTimingFunction: {
        signal: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
