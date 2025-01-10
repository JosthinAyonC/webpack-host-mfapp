const tailwindTheme = require('./src/sasf-commons/config/tailwind.theme');

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: tailwindTheme.theme.extend,
    colors: tailwindTheme.theme.colors,
  },
  plugins: tailwindTheme.plugins,
};
