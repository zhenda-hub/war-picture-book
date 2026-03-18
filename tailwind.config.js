/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'era-ancient': '#D4A574',
        'era-classical': '#8B7355',
        'era-medieval': '#6B4423',
        'era-modern': '#4A3728',
        'era-contemporary': '#2F4F4F',
      }
    },
  },
  plugins: [],
}
