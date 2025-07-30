/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './imports/**/*.{js,ts,jsx,tsx,mdx}',
    './**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'baloo': ['Baloo Bhaina', 'sans-serif'],
        'ibm-plex': ['IBM Plex Sans Devanagari', 'sans-serif'],
        'rubik': ['Rubik', 'sans-serif'],
        'microsoft': ['Microsoft Sans Serif', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#003049',
          600: '#025864',
          700: '#00454E',
        }
      }
    },
  },
  plugins: [],
}