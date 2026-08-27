import { createTheme } from '@mui/material/styles';

/**
 * Palette: sage / botanical greens with a warm clay accent for
 * highlighted results. Chosen to feel clinical-but-natural rather than a
 * generic "medical blue" or templated pastel look.
 */
export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3F6C51', // deep sage
      light: '#6B9A7C',
      dark: '#294936',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#B5651D', // warm clay / dosage highlight
      light: '#D98C4A',
      dark: '#8A4A12',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F6F5EF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#26302A',
      secondary: '#5B6960',
    },
  },
  typography: {
    fontFamily: '"Source Sans 3", "Segoe UI", Roboto, sans-serif',
    h4: {
      fontFamily: '"Fraunces", "Georgia", serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: '"Fraunces", "Georgia", serif',
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
        },
      },
    },
  },
});
