// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Raleway, sans-serif',
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: '600',
    },
  },
  palette: {
    primary: {
      main: '#635bff', // Adjust as needed
    },
    secondary: {
      main: '#ff4081',
    },
    background: {
      default: '#f5f7fa',
    },
  },
});

export default theme;
