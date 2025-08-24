/** @type {import('tailwindcss').Config} */

module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#030712",
        foreground: "#f3f4f6",
        card: "oklch(0.145 0 0)",
        border: "oklch(0.269 0 0)",
      },
      fontFamily: {
        inter: ["Inter-Regular"],
        "inter-bold": ["Inter-Bold"],
        "inter-italic": ["Inter-Italic"],
      },
    },
  },
  plugins: [],
};
