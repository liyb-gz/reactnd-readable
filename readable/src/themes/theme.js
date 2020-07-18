import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      '"Open Sans Condensed"',
      'Lato',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    primary: {
      light: '#ff9694',
      main: '#d86666',
      dark: '#a2373c',
      contrastText: '#fff',
    },
    secondary: {
      light: '#647686',
      main: '#394a59',
      dark: '#112330',
      contrastText: '#fff',
    },
  },
});

export default theme;
