/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}" // Paths where Tailwind will look for class names to generate styles
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4CAF50', // Example green color for primary buttons, links, etc.
        secondary: '#FF5722', // Example secondary color for accents
        dark: '#2d2d2d', // Dark theme background color
        light: '#f8f8f8', // Light theme background color
      },
      fontFamily: {
        sans: ['Arial', 'sans-serif'], // Default font family
        serif: ['Georgia', 'serif'], // Serif font family for headings or emphasis
      },
      spacing: {
        18: '4.5rem', // Custom spacing value (e.g., padding, margin)
      },
      boxShadow: {
        'card': '0 4px 6px rgba(0, 0, 0, 0.1)', // Custom shadow for cards and buttons
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Tailwind plugin to style forms
    require('@tailwindcss/typography'), // Tailwind plugin to style typography
  ],
}
