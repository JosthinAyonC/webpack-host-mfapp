const tailwindTheme = require('./src/sasf-commons/config/tailwind.theme');

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: tailwindTheme.colors,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
