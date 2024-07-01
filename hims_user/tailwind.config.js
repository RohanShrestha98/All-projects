/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      xl: { max: "1280px" },
      // => @media (max-width: 1280px) { ... }

      lg: { max: "1024px" },
      // => @media (max-width: 1024px) { ... }

      md: { max: "768px" },
      // => @media (max-width: 768px) { ... }

      no: { min: "480px" },
      // => @media (min-width: 480px) { ... }

      sm: { max: "480px" },
      // => @media (max-width: 480px) { ... }
    },
    extend: {},
  },
  variants: {},
  plugins: [],
};
