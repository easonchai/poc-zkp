module.exports = {
  important: true,
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: ["dracula"],
  },
  theme: {
    fontFamily: {
      sans: [
        "Lato",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
    },
    extend: {
      spacing: {
        128: "32rem",
        160: "40rem",
        192: "48rem",
        256: "64rem",
      },
    },
  },

  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
