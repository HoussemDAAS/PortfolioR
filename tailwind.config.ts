import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        zentry: ["zentry", "sans-serif"],
        general: ["general", "sans-serif"],
        "circular-web": ["circular-web", "sans-serif"],
        "robert-medium": ["robert-medium", "sans-serif"],
        "robert-regular": ["robert-regular", "sans-serif"],
        sans:'var(--font-archivo)',
      },
      animation: {
        'move-left': 'move-left 1s linear infinite',
      },
      colors: {
      'black': {
        '50': '#f6f6f6',
        '100': '#e7e7e7',
        '200': '#d1d1d1',
        '300': '#b0b0b0',
        '400': '#888888',
        '500': '#6d6d6d',
        '600': '#5d5d5d',
        '700': '#4f4f4f',
        '800': '#454545',
        '900': '#3d3d3d',
        '950': '#2f2f2f',
    },
    'orange': {
        '50': '#fff7ed',
        '100': '#ffedd4',
        '200': '#ffd6a8',
        '300': '#ffb970',
        '400': '#ff9037',
        '500': '#ff7518',
        '600': '#f54703',
    },
    darkGray: 'rgba(16,16,18,1)',
    midGray: 'rgba(79,79,79,1)',
    
      },
      screens: {
        sm: '375px',
        md: '768px',  
        lg: '1200px',
        xl: '1440px',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          md: "2rem",
          lg: "4rem",
          xl: "5rem",
        },
      },
      keyframes: {
        "move-left": {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(-50%)",
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;