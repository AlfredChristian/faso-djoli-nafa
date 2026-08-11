/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],  
  theme: {
    extend: {
      colors: {
        blood: {
          DEFAULT: "#C0392B",
          dark: "#96281B",
        },
        hope: {
          DEFAULT: "#1E8449",
        },
        gold: {
          DEFAULT: "#F1C40F",
        },
        ink: {
          DEFAULT: "#1F2937",
        },
      },
    },
  },
  plugins: [],
}

