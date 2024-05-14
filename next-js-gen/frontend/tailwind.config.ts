import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      lilac: '#D9D9D9',
      gray: {
        dark: '#282828',
        medium: '#2E2E2E',
        light: '#575757',
      },
      white: '#FFFFFF',
      red: {
        light: '#FFDADA',
        medium: '#FF5C5C',
        dark: '#FF0000',
      },
    },
    extend: {
      backgroundImage: {},
      fontSize: {
        extraLarge: '3rem',
        large: '2rem',
        medium: '1.5rem',
        small: '1rem',
        extraSmall: '0.75rem',
      },
    },
  },
  plugins: [],
};
export default config;
