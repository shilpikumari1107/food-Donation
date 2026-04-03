/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff8f0',
          100: '#ffe6d5',
          200: '#ffc9a8',
          300: '#ffab7a',
          400: '#ff8c4d',
          500: '#ff6b35',
          600: '#e55a2b',
          700: '#cc4922',
          800: '#b23818',
          900: '#99270f',
        },
        dark: {
          50: '#f9f9fa',
          100: '#f0f0f3',
          200: '#e1e1e8',
          300: '#c9c9d6',
          400: '#a8a8ba',
          500: '#8b8b9a',
          600: '#72727f',
          700: '#5a5a68',
          800: '#464653',
          900: '#2d2d38',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in',
        'slide-up': 'slideUp 0.8s ease-out',
        'glow': 'glow 2s ease-in-out infinite',
        'pulse-gentle': 'pulseGentle 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 107, 53, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 107, 53, 0.6)' },
        },
        pulseGentle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      boxShadow: {
        glow: '0 0 20px rgba(255, 107, 53, 0.4)',
        'glow-lg': '0 0 40px rgba(255, 107, 53, 0.6)',
      },
      backdropFilter: {
        glass: 'blur(10px)',
      },
    },
  },
  plugins: [],
};
