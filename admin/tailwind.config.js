/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {}
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.max-h-screen-minus-65': {
          maxHeight: 'calc(100vh - 65px)',
        },
      });
    },
  ]
};

