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

const defaultTheme = createMuiTheme();

const theme = createMuiTheme({
  typography: {
    fontFamily: sansSerifFonts,
    fontSize: 16,
    h1: {
      fontFamily: serifFonts,
      fontWeight: defaultTheme.typography.fontWeightBold,
    },
    h2: {
      fontFamily: serifFonts,
      fontWeight: defaultTheme.typography.fontWeightBold,
    },
    h3: {
      fontFamily: serifFonts,
      fontWeight: defaultTheme.typography.fontWeightBold,
    },
    h4: {
      fontFamily: serifFonts,
      fontWeight: defaultTheme.typography.fontWeightBold,
    },
    h5: {
      fontFamily: serifFonts,
      fontWeight: defaultTheme.typography.fontWeightBold,
    },
    h6: {
      fontFamily: serifFonts,
      fontWeight: defaultTheme.typography.fontWeightBold,
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
    MuiCardHeader: {
      title: {
        fontSize: defaultTheme.typography.h4.fontSize,
        fontWeight: defaultTheme.typography.fontWeightBold,
      },
      subheader: {
        fontSize: defaultTheme.typography.body2.fontSize,
      },
    },
  },
});

export default theme;
