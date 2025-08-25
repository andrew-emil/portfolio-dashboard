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
        border: "oklch(0.269 0 0)",
        input: "oklch(0.269 0 0)",
        ring: "oklch(0.439 0 0)",
        primary: {
          DEFAULT: "oklch(0.985 0 0)",
          foreground: "oklch(0.205 0 0)",
        },
        secondary: {
          DEFAULT: "oklch(0.269 0 0)",
          foreground: "oklch(0.985 0 0)",
        },
        destructive: {
          DEFAULT: "oklch(0.396 0.141 25.723)",
          foreground: "oklch(0.637 0.237 25.331)",
        },
        muted: {
          DEFAULT: "oklch(0.269 0 0)",
          foreground: "oklch(0.708 0 0)",
        },
        accent: {
          DEFAULT: "oklch(0.269 0 0)",
          foreground: "oklch(0.985 0 0)",
        },
        popover: {
          DEFAULT: "oklch(0.145 0 0)",
          foreground: "oklch(0.985 0 0)",
        },
        card: {
          DEFAULT: "oklch(0.145 0 0)",
          foreground: "oklch(0.985 0 0)",
        },
        sidebar: {
          DEFAULT: "oklch(0.205 0 0)",
          foreground: "oklch(0.985 0 0)",
          primary: {
            DEFAULT: "oklch(0.488 0.243 264.376)",
            foreground: "oklch(0.985 0 0)",
          },
          accent: {
            DEFAULT: "oklch(0.269 0 0)",
            foreground: "oklch(0.985 0 0)",
          },
          border: "oklch(0.269 0 0)",
          ring: "oklch(0.439 0 0)",
        },
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
