import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        anglr: {
          bg: '#060d1a',
          surface: '#0d1f35',
          'surface-2': '#122843',
          border: 'rgba(255,255,255,0.08)',
          blue: '#2d7cf6',
          'blue-hover': '#1a6ae0',
          green: '#16c96a',
          'green-hover': '#0fb05a',
          'text-primary': '#f0f4ff',
          'text-secondary': '#8ba3c0',
          'text-muted': '#4a6280',
          error: '#ef4444',
          success: '#22c55e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'ocean': `
          radial-gradient(ellipse 90% 60% at 50% -5%, rgba(22,78,155,0.45) 0%, transparent 70%),
          radial-gradient(ellipse 60% 40% at 85% 90%, rgba(16,185,129,0.18) 0%, transparent 60%),
          radial-gradient(ellipse 40% 30% at 10% 70%, rgba(22,78,155,0.12) 0%, transparent 50%)
        `,
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'spin-slow': 'spin 1.2s linear infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'card': '0 0 0 1px rgba(255,255,255,0.06), 0 4px 6px -1px rgba(0,0,0,0.4), 0 20px 40px -8px rgba(0,0,0,0.6)',
        'blue-glow': '0 0 20px rgba(45,124,246,0.35)',
        'green-glow': '0 0 20px rgba(22,201,106,0.35)',
        'input': '0 0 0 1px rgba(255,255,255,0.08)',
        'input-focus': '0 0 0 2px rgba(45,124,246,0.45)',
      },
    },
  },
  plugins: [],
};

export default config;
