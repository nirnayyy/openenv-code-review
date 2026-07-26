/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          50: '#fff7ed',
          100: '#ffedd5',
          500: '#ff5500',
          600: '#e64d00',
          700: '#cc4400',
        },
        grid: {
          bg: '#E6E8EA',
          card: '#F0F2F4',
          border: '#C8CCD0',
          dark: '#111111',
        }
      },
      fontFamily: {
        mono: ['Space Mono', 'JetBrains Mono', 'monospace'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        display: ['Syne', 'Space Mono', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
