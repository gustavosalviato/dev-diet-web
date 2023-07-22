/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      boxShadow: {
        sm: '0 0 0 2px #6366f1',
      },
      animation: {
        'fade-in': 'fade-in 100ms linear',
        'fade-out': 'fade-out 100ms ease-in-out',
        'scale-up': 'scale 100ms ease-in-out forwards',
        'scale-down': 'scale 150ms ease-in-out backwards',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: 0, visibility: 0 },
          to: { opacity: 1, visibility: 1 },
        },
        'fade-out': {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        scale: {
          from: { scale: 0 },
          to: { scale: 100 },
        },
      },
    },
  },
  plugins: [],
}
