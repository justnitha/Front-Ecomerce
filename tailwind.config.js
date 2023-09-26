/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'Orange' : "#ff7d1a",
        'Orange-pale': '#ffede0',
        'Very-DarkBlue': '#eeeff2',
        'Dark-GrayishBlue' : '#68707d',
        'Light-GrayishBlue' : '#f7f8fd',
        'GrayishBlue' : '#b6bcc8',
      },
    },
  },
  plugins: [],
}

