module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#101018',
        glow: '#ffd966',
        gold: '#d4af37',
        card: 'rgba(255,255,255,0.08)',
      },
      boxShadow: {
        glow: '0 18px 60px rgba(212,175,55,0.15)',
      },
    },
  },
  plugins: [],
}
