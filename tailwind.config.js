const tailwindTheme = require('./src/sasf-commons/config/tailwind.theme');

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: tailwindTheme.theme,
  plugins: tailwindTheme.plugins,
};