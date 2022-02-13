import "../styles/globals.css";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "../src/theme";
import { AuthUserProvider } from "../src/context/AuthUserContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthUserProvider>
      <ThemeProvider theme={darkTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthUserProvider>
  );
}

export default MyApp;
