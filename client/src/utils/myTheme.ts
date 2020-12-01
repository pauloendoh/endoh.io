import { createMuiTheme } from '@material-ui/core';

const myTheme = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      default: "#1E1E1E",
      paper: "#2B2B2B",
    },
    primary: { main: "#3DAC8D", contrastText: "#fff" },
    secondary: { main: "#C862AC" }
  },
  typography: {
    fontFamily: `'Saira', sans-serif;`, // imported at index.css
    fontSize: 14,
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  overrides: {
    MuiTextField: {
      root: {
        background: "#1E1E1E",
      },
    },
    MuiSelect: {
      root: {
        background: "#1E1E1E",
      }
    }
  },
});

export default myTheme
