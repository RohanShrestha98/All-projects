const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  future: { hoverOnlyWhenSupported: true },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        whiteText: colors.gray[100],
        blackText: colors.gray[800],
        grayBackground: colors.gray[100],
        grayBorder: colors.gray[200],
        grayBorderDark: colors.gray[300],
        grayDisabled: colors.gray[400],
        grayText: colors.gray[500],
        grayTextDark: colors.gray[600],
        grayHeading: colors.gray[700],
        primaryHover: '#e5e7eb',
        primarySelect: colors.white[200],
        primary: '#0a438f',
        secondary: '#0a438f',
        secondaryLight: '#0a438f',
        sidebar: '#333333',
        textColor: '#4d4d4d',
        inputColor: '#808080',
        sideBarColor: '#999999',
        buttonColor: '#0a438f',
        primaryLight: '#0F8A23',
        danger: colors.rose[700],
        dangerDark: colors.rose[800],
      },
      boxShadow: {
        r: '1px 0 10px -5px rgba(115,115,115,0.75)',
      },
      dropShadow: {
        navBar: '0 6px 4px -2px rgb(215, 213, 213)',
      },
      borderRadius: {
        4: '4px',
        '50%': '50%',
      },
      width: {
        250: '200px',
        40: '40px',
        '20%': '20%',
      },
      height: {
        40: '40px',
        '60vh': '60vh',
        '100vh': '100vh',
      },
      borderColor: {
        input: '#989898',
        hover: '#dff8e3',
      },
      minWidth: {
        50: '50px',
        100: '100px',
        150: '150px',
        200: '200px',

        '20%': '20%',
      },
      maxWidth: {
        200: '200px',
        350: '350px',
        400: '400px',
        250: '250px',
      },
    },
  },
  plugins: [],
};
