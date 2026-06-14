module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        cream: {
          50: '#faf8f5',
          100: '#f5f0eb',
          200: '#ede4d9',
          300: '#ddd0bf',
          400: '#c9b89e',
          500: '#b8a07e',
        },
        espresso: {
          50: '#f0ebe7',
          100: '#d9cdc4',
          200: '#b8a290',
          300: '#967a63',
          400: '#5c4536',
          500: '#2c1810',
          600: '#1a0e09',
        },
        gold: {
          50: '#faf6ee',
          100: '#f0e6d3',
          200: '#e0cca8',
          300: '#c9a96e',
          400: '#b8924e',
          500: '#9e7a3a',
        },
        board: {
          light: '#f0e6d3',
          dark: '#6b4226',
        },
      },
      boxShadow: {
        frame: '0 4px 24px rgba(44, 24, 16, 0.08), 0 1px 4px rgba(44, 24, 16, 0.04)',
        'frame-lg': '0 8px 48px rgba(44, 24, 16, 0.1), 0 2px 8px rgba(44, 24, 16, 0.04)',
      },
    },
  },
  plugins: [],
}
