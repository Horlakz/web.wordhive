/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        dashboard: "url('/images/dashboard-bg.jpg')",
      },
      fontFamily: {
        sans: ['"Hanken Grotesk", sans-serif'],
      },
      colors: {
        primary: "#009CFF",
        secondary: "#FF6900",
        success: "#4BB543",
        danger: "#FF4136",
        warning: "#FFC300",
        info: "#7FDBFF",
        "order-blue": "#0068AA",
        dark: { 600: "#525252", 900: "#171717" },
        admin: { nav: "#003455", primary: "#0068AA", light: "#009CFF" },
      },
    },
  },
  plugins: [],
};
