import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      lilac: "#D9D9D9",
      gray: {
        dark: "#282828",
        medium: "#2E2E2E",
      },
    },
    extend: {
      backgroundImage: {},
    },
  },
  plugins: [],
};
export default config;
