/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'theme-red': '#e42f22',
        'theme-orange': '#e95520',
        'theme-primary': '#e42f22',
        'theme-secondary': '#e95520',
      },
    },
  },
  plugins: [],
};
