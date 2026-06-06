
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#faf8f4',
          100: '#f5f0e8',
          200: '#ede4d0',
        },
        forest: {
          400: '#2d8a5e',
          500: '#1f7a50',
          600: '#1a6644',
          700: '#155538',
        },
        navy: {
          800: '#0f1923',
          900: '#0a1218',
        }
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
