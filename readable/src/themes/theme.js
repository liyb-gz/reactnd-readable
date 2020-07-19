import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  typography: {
    // Sans-serif
    // fontFamily: [
    //   '"Open Sans Condensed"',
    //   'Lato',
    //   '"Helvetica Neue"',
    //   'Arial',
    //   'sans-serif',
    //   '"Apple Color Emoji"',
    //   '"Segoe UI Emoji"',
    //   '"Segoe UI Symbol"',
    // ].join(','),

    // Serif
    fontFamily: [
      '"Playfair Display"',
      '"Times New Roman"',
      'Times',
      'serif',
    ].join(','),
    fontSize: 16,
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
