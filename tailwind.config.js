/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "vini-blue": "#1c2436",
        "vini-sky-blue": "#4091F9",
        "vini-sea-green": "#F4F9FF",
        "vini-sand": "#F1F1E6",
      },
    },
  },
  plugins: [],
};
