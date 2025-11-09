export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'terminal-bg': '#0a0a0a',
        'terminal-green': '#00ff41',
        'terminal-muted': '#888888',
        'terminal-dim': '#666666',
        'terminal-border': '#333333',
        'terminal-accent': '#1a1a1a',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'zoom-in': 'zoomIn 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'terminal-fade-in': 'terminalFadeIn 0.8s ease-out',
        'terminal-slide-up': 'terminalSlideUp 0.7s ease-out',
        'cursor-blink': 'cursorBlink 1s step-end infinite',
        'scanline': 'scanline 8s linear infinite',
        'glitch': 'glitch 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        zoomIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        terminalFadeIn: {
          '0%': { opacity: '0', filter: 'blur(2px)' },
          '100%': { opacity: '1', filter: 'blur(0px)' },
        },
        terminalSlideUp: {
          '0%': { opacity: '0', transform: 'translateY(15px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        cursorBlink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        }
      }
    },
  },
  plugins: [],
}
