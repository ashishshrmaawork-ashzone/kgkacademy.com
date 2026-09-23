module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      colors: {
        primary: '#1c53a5',
        'dark-navy': '#061322',
        navy: '#0d1b2e',
        'mid-navy': '#0a1f3d',
      },
      fontFamily: {
        sans: ['Anek Latin', 'sans-serif'],
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
        fadeUp: 'fadeUp 0.6s ease-out forwards',
        fadeIn: 'fadeIn 0.5s ease-out forwards',
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container-fluid': {
          width: '100%',
          marginRight: 'auto',
          marginLeft: 'auto',
          paddingLeft: '15px',
          paddingRight: '15px',
          '@screen md': {
            paddingLeft: '3rem',
            paddingRight: '3rem',
          },
          '@screen xl': {
            paddingLeft: '5rem',
            paddingRight: '5rem',
          },
        },
      });
    },
  ],
};
