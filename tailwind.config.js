/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
      },
    },
    fontFamily: {
      system: [
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        " Roboto",
        "Oxygen",
        "Ubuntu",
        "Cantarell",
        "Open Sans",
        "Helvetica Neue",
        "sans-serif",
      ],
    },
    extend: {
      fontSize: {
        base: ["16px", { lineHeight: "24px" }],
        label: ["18px", { lineHeight: "25px" }],
      },
      colors: {
        body: "#F0ECE5",
        primary: "#161A30",
        textColor: "#31304D",
      },
      animation: {},
      keyframes: {},
    },
  },
  plugins: [],
};
