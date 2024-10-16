module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this to match your file structure
  ],
  theme: {
    extend: {
      colors : {
        yellowColors : '#FFA500'      },
        fontFamily : {
          'headingFont': ['headingFont', 'sans-serif'], 
        }
    },
  },
  plugins: [],
};
