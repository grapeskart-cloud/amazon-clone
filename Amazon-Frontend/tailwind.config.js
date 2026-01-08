/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "amazon-blue": "#146eb4",
        "amazon-dark": "#232f3e",
        "amazon-orange": "#ff9900",
        "amazon-success": "#00a65a",
        "amazon-warning": "#f39c12",
        "amazon-danger": "#e74c3c",
        "amazon-bg": "#f7f7f7",
        "amazon-border": "#e3e3e3",
        "amazon-text-dark": "#232f3e",
        "amazon-text-gray": "#666666",
        "amazon-text-light": "#999999",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
