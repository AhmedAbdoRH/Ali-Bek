/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#000000',      // أسود حالك
        secondary: '#ffffff',    // أبيض نقي - الخلفية الرئيسية
        accent: '#FF0000',       // أحمر (Red)
        'accent-blue': '#0099FF', // أزرق سماوي (Sky Blue)
        'accent-black': '#000000', // أسود للنصوص والأكسنت
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        none: '0px',
      },
    },
  },
  plugins: [],
};