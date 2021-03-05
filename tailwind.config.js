module.exports = {
  purge: {
    mode:'layers',
    content: ['./public/**/*.html', './src/**/*.vue']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      main: '#F2F5F7',
      blueColor: '#0052F5'
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
