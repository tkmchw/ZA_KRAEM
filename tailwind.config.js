/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0f9f4',
          100: '#d9f0e3',
          200: '#b3e1ca',
          300: '#7ecaa9',
          400: '#52aa85',
          500: '#2d8659',
          600: '#228848',
          700: '#1b6a39',
          800: '#165530',
          900: '#134429',
          950: '#0a2818',
        },
        sand: {
          50: '#faf8f3',
          100: '#f4f0e3',
          200: '#e8dcc6',
          300: '#dcc399',
          400: '#d4b07a',
          500: '#c9985a',
          600: '#b88450',
          700: '#996d42',
          800: '#7f5a39',
          900: '#644833',
          950: '#3a281b',
        },
        gold: {
          50: '#fffbf0',
          100: '#fff7e0',
          200: '#ffedbb',
          300: '#ffe699',
          400: '#ffd966',
          500: '#ffcd33',
          600: '#f4b81b',
          700: '#cc8f14',
          800: '#a36e0f',
          900: '#83570c',
          950: '#4a3005',
        },
      },
      fontFamily: {
        display: ['Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.15em',
        wider: '0.12em',
      },
    },
  },
  plugins: [],
}
