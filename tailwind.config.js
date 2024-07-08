/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        company: {
          DEFAULT: '#4DC590',
          800: '#2BB479',
          700: '#57C794',
          600: '#EDF5F1',
          500: '#69827B',
        },
      },
    },
  },
  plugins: [],
}
