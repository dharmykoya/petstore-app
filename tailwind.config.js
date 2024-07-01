/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        company: {
          DEFAULT: '#4DC590',
          700: '#57C794',
        },
      },
    },
  },
  plugins: [],
}
