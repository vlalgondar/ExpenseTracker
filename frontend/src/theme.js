// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#635bff', // Modern purple/blue color similar to Stripe
    },
    secondary: {
      main: '#ff4081',
    },
    background: {
      default: '#f5f7fa', // Light gray background
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
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
});

export default theme;
