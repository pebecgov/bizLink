/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary-green': '#008751',
                'dark-green': '#004d2e',
                'gold': '#FFD700',
                'accent-blue': '#0066CC',
                'light-green': '#00a862',
                'very-light-green': '#e6f7f0',
                'light-gold': '#ffe84d',
                'text-primary': '#1a1a1a',
                'text-secondary': '#4a4a4a',
                'text-muted': '#7a7a7a',
                'text-light': '#9a9a9a',
                'text-white': '#ffffff',
                'bg-primary': '#ffffff',
                'bg-secondary': '#f8f9fa',
                'bg-tertiary': '#e9ecef',
                'bg-dark': '#1a1a1a',
            },
            backgroundImage: {
                'gradient-primary': 'linear-gradient(135deg, #008751 0%, #004d2e 100%)',
                'gradient-gold': 'linear-gradient(135deg, #FFD700 0%, #ffe84d 100%)',
                'gradient-overlay': 'linear-gradient(135deg, rgba(0, 135, 81, 0.9) 0%, rgba(0, 77, 46, 0.95) 100%)',
            },
            boxShadow: {
                'green': '0 10px 30px rgba(0, 135, 81, 0.3)',
                'gold': '0 10px 30px rgba(255, 215, 0, 0.3)',
            },
            animation: {
                'float': 'float 3s ease-in-out infinite',
                'pulse-slow': 'pulse 4s ease-in-out infinite',
                'spin-slow': 'spin 3s linear infinite',
                'fade-in-up': 'fadeInUp 0.6s ease forwards',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                fadeInUp: {
                    'from': { opacity: '0', transform: 'translateY(20px)' },
                    'to': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        },
    },
    plugins: [],
}
