module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mona: ["Mona Sans", "sans-serif"],
      },
      colors: {
        foreground: "#050505",
        background: "#fdfdfd",
      },
      fontSize: {
        "3xl": ["3.5rem", 1.4],
        "2xl": ["3rem", 1.4],
        xl: ["2.5rem", 1.4],
        lg: ["2rem", 1.4],
        md: ["1.5rem", 1.4],
        sm: ["1.125rem", 1.4],
        base: ["1rem", 1.4],
        xs: ["0.75rem", 1.4],
        "2xs": ["0.625rem", 1.4],
      },
    },
  },
  plugins: [],
};
