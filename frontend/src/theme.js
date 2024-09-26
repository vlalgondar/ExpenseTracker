import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#635bff', // Use a modern purple/blue color similar to Stripe
    },
    secondary: {
      main: '#ff4081',
    },
    background: {
      default: '#f5f7fa', // Light gray background for the app
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
  },
});

export default theme;