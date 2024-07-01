/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      xl: { max: "1280px" },
      // => @media (max-width: 1280px) { ... }

      xlg: { max: "1160px" },
      // => @media (max-width: 1160px) { ... }

      lg: { max: "1024px" },
      // => @media (max-width: 1024px) { ... }

      lmd: { max: "890px" },
      // => @media (max-width: 890px) { ... }

      md: { max: "768px" },
      // => @media (max-width: 768px) { ... }

      sm: { max: "480px" },
      // => @media (max-width: 480px) { ... }
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      animation: {
        pulse: "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;",
      },
      keyframes: {
        ping: {
          "75%": { transform: "scale(1)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        pulse: {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: ".2",
          },
        },
      },
      boxShadow: {
        md: "1px 5px 24px rgba(0, 0, 0, 0.05);",
        "4xl":
          " 0 2px 6px rgba(47, 43, 61,.14),0 0 transparent,0 0 transparent;",
      },
      colors: {
        white: "#FFFFFF",
        black: "#343434",
        red: "#D92626",
        danger: "#dc2626",
        "brown-1": "#A46000",
        blue: "#335EF7",
        "baby-blue": "#B4D7FF", 
        "blue-lighter": "#ECFBFE",
        "blue-1": "#E6ECFE",
        "blue-2": "#CDE1E4",
        "blue-3": "#3D848F",
        "blue-4": "#335EF7",
        "blue-gray": "#A9C1C4",
        "blue-steel": "#3C5174",
        "cyan-dark": "#00778A",
        cyan: "#00B9D6",
        "cyan-light": "#E6FFFF",
        "cyan-lighter": "#EBEFFE",
        "auth-bg": "#EDEBDE",
        "blue-500": "#1877F2",
        "blue-light": "#00B9D6",
        purple: "#7e5bef",
        pink: "#ff49db",
        orange: "#ff7849",
        green: "#13ce66",
        "light-green": "#1FAD53",
        "light-green1": "#20B155",
        "light-green2": "#C8FFCA",
        "light-green3": "#D0FFCC",
        "light-green4": "#66CC6A",
        yellow: "#ffc82c",
        "red-1": "#F75555",
        "red-2": "#F20D0D",
        "red-3": "#FFCECE",
        "red-4": "#FFCCCC",
        "red-5": "#E05252",
        "black-gray": "#212121",
        "white-gray": "#dcdcdc",
        "gray-dark": "#6F6F6F",
        "gray-dark1": "#757575",
        "gray-dark2": "#9e9e9e",
        "gray-dark3": "#bdbdbd",
        gray: "#7D7D7D",
        "gray-1": "#616161",
        "gray-2": "#909090",
        "gray-3": "#4e4e4e",
        "gray-4": "#424242",
        "gray-5": "#606060",
        "gray-6": "#cfcfcf",
        "gray-7": "#979797",
        "gray-8": "#e6e6e6",
        "gray-9": "#5a5a5a",
        "gray-10": "#646464",
        "gray-11": "#f0f0f0",
        "gray-12": "#A0A0A0",
        "gray-13": "#E0E0E0",
        "gray-14": "#EbEbEb",
        "gray-15": "#D9D9D9",
        "gray-16": "#f2f2f2",
        "gray-100": "#F3F3F3",
        "gray-200": "#f9fafb",
        "gray-light": "#F5F5F5",
        "gray-lighter": "#eeeeee",
        "gray-shade": "#CCCCCC",
        "gray-slate": "#747474",
        "gray-bg": "#F6F5EE",
        teal: "#F0FDFF",
        neutral: "#AFAFAF",
        "red-shade": "#CC3333",
        "light-red": "#F0EEEF",
        "theme-color": "#323232",
        "theme-red": "#ED1C24",
        // "theme-color": "#FF0105",
        // "theme-color": "#4365A7",
        "theme": "#4365A7",
        "light-theme": "#BED0F4",
      },
    },
  },
  variants: {},
  plugins: [],
};
