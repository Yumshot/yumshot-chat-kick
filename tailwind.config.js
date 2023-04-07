/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}',
  ],
  daisyui: {
          themes: ["dracula"]
  },
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
