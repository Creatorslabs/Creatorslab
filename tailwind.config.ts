import type { Config } from "tailwindcss";
import { heroui } from "@heroui/theme";
import flowbite from "flowbite-react/tailwind";

const config: Config = {
  content: [
    // single component styles
    "./node_modules/@heroui/theme/dist/components/progress.js",
    "./node_modules/@heroui/theme/dist/components/input-otp.js",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        syne: ["var(--font-syne)", "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [heroui(), flowbite.plugin()],
};
export default config;
