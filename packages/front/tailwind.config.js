const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  plugins: [require('@tailwindcss/forms')],
  theme: {
    extend: {
      animation: {
        'spin-fast': 'spin .5s linear infinite',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      maxHeight: {
        0: '0',
        xl: '36rem',
      },
    },
    screens: {
      xs: { max: '639px' },
      ...defaultTheme.screens,
    },
  },
};
