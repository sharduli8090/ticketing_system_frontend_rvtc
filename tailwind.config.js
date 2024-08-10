/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Raleway"', "sans-serif"],
      },
      boxShadow: {
        "blue-glow": "0 0 20px 10px rgba(59, 130, 246, 0.5)",
        "purple-glow": "0 90px 20px 90px rgba(139, 92, 246, 0.5)",
      },
    },
  },
  plugins: [],
};
