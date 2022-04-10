module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          700: '#36393f',
          800: '#2f3136',
          900: '#202225',
          1000: '#292b2f',
        },
      },
      borderWidth: {
        6: '6px',
      },
      width: {
        servers: '4.5rem',
        sidebar: '15rem',
      },
      height: {
        header: '3rem',
        body: 'calc(100% - 3rem)',
        13: '3.5rem',
      },
      boxShadow: {
        header:
          '0 1px 0 rgba(4,4,5,0.2),0 1.5px 0 rgba(6,6,7,0.05),0 2px 0 rgba(4,4,5,0.05)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
