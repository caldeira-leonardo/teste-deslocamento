import { createTheme } from '@mui/material/styles';
import { red, blue, green, orange, yellow } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5df1d1',
      contrastText: '#202020',
    },
    secondary: {
      main: '#080c22',
      contrastText: '#f0f0f0',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#fff535',
    },
    background: {
      default: '#f0f0f0',
    },
    success: {
      main: '#5df1d1',
    },
    text: {
      primary: '#696969',
      disabled: '#b6b6b6',
      secondary: '#202020',
    },
  },
});

export default theme;
