/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1440px',
    },
    colors: {
      'white': '#ffffff',
      'dark': '#141516',
      'green': '#495E57',
      'yellow': '#F4CE14',
      'light': '#dde0e0',
      // 'light': '#fff',
      // 'gray': '#efdefd',
      // 'secondary': '#ceb8f0',
      // 'primary': '#6811b9',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    }
  },
  plugins: [],
}

