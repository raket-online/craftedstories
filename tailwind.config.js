/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#941a10',
        'primary-dark': '#6d1209',
        'primary-light': '#b82214',
        cream: '#f0ebe0',
        'cream-dark': '#e2d9c8',
        'warm-brown': '#2c1810',
        'warm-gray': '#6b5a52',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Lato', 'system-ui', 'sans-serif'],
      },
    }
  },
  plugins: [],
}
