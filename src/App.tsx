import { ThemeProvider } from "styled-components";
import { BrowserRouter } from 'react-router-dom';

import { defaultTheme } from "./styles/Themes/default";
import { GlobalStyle } from "./styles/global";
import { Router } from "./Router";
import { CyclesContextProvider } from "./Contexts/CyclesContexts";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesContextProvider>
          <Router/>
        </CyclesContextProvider>
        <GlobalStyle />
      </BrowserRouter>
    </ThemeProvider>
  );
}
