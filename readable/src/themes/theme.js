import { createMuiTheme } from '@material-ui/core';

const serifFonts = [
  '"Playfair Display"',
  '"Times New Roman"',
  'Times',
  'serif',
].join(',');

const sansSerifFonts = [
  'Open Sans',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
].join(',');

const theme = createMuiTheme({
  typography: {
    fontFamily: sansSerifFonts,
    fontSize: 16,
    h1: {
      fontFamily: serifFonts,
    },
    h2: {
      fontFamily: serifFonts,
    },
    h3: {
      fontFamily: serifFonts,
    },
    h4: {
      fontFamily: serifFonts,
    },
    h5: {
      fontFamily: serifFonts,
    },
    h6: {
      fontFamily: serifFonts,
    },
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
  overrides: {
    MuiListItemText: {
      primary: {
        fontFamily: serifFonts,
      },
      secondary: {
        fontFamily: serifFonts,
      },
    },
  },
});

export default theme;
