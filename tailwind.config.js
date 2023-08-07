/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#17594A',
        primaryHover: '#1DB342',
        highlight: '#E8FFCE',
        bg: '#242424',
        iconGreen: '#22A699',
      },
    },
    screens: {
      'sm': '430px',
      'md': '770px',
      'lg': '1440px',
    },
  },
  plugins: [],
}
