/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        corex: {
          black: '#000000',
          dark: '#0a0a0a',
          darker: '#050505',
          gray: '#111111',
          grayLight: '#1a1a1a',
          light: '#ffffff',
          muted: '#888888'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
