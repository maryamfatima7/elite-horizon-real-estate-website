/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f3f8',
          100: '#d9e0ed',
          200: '#b3c1db',
          300: '#8da2c9',
          400: '#6783b7',
          500: '#4164a5',
          600: '#1a3a6e',
          700: '#0f2a52',
          800: '#0a1d3a',
          900: '#05122a',
          950: '#020a1a',
        },
        gold: {
          50: '#fdf9f0',
          100: '#f9f0d9',
          200: '#f3e1b3',
          300: '#ecd28d',
          400: '#e6c367',
          500: '#d4a843',
          600: '#b8902a',
          700: '#8f6f20',
          800: '#654e17',
          900: '#3b2d0e',
          950: '#1a1406',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
