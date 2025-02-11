import type { Config } from "tailwindcss";
import { heroui } from "@heroui/theme";

const config: Config = {
  content: [
    // single component styles
    "./node_modules/@heroui/theme/dist/components/progress.js",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"], // Add Inter font family
        syne: ["Syne", "sans-serif"], // Add Syne font family
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
export default config;
