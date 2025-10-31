/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vedic: {
          gold: '#D4AF37',
          saffron: '#FF9933',
          darkbg: '#0a0a0a',
          cardbg: '#1a1a1a',
        }
      }
    },
  },
  plugins: [],
}
