import React from "react";
import GlobalState from "./context/GlobalState";
import { ThemeProvider } from "@material-ui/core/styles";
import smTheme from "./styles/theme";
import { Header } from "./components/layout/index";
import AppRouter from "./components/routes/AppRouter";
import ErrorBoundary from "./components/errorPage/ErrorBoundary";

function App() {
  return (
    // <ErrorBoundary>
    <GlobalState>
      <ThemeProvider theme={smTheme}>
        <AppRouter>
          <Header />
        </AppRouter>
      </ThemeProvider>
    </GlobalState>
    // </ErrorBoundary>
  );
}

export default App;
