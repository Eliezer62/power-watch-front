const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ], // Update with your content paths
  theme: {
    extend: {},
  },
  plugins: [
    require("tailwindcss-animate"), // Ensure this line is included
  ],
};