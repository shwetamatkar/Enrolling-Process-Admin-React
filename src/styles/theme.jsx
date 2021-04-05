import { createMuiTheme } from "@material-ui/core/styles";

const smTheme = createMuiTheme({
  palette: {
    primary: { main: "#0073bb" },
    secondary: { main: "#01afcb" },
    error: { main: "#b24434" },
    warning: { main: "#f96d30" },
    success: { main: "#4da05d" },
    info: { main: "#01afcb" }
  },
  typography: {
    fontFamily: ["Open Sans", "sans-serif"].join(",")
  }
});

export default smTheme;
