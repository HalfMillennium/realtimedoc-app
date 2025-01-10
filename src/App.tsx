import '@mantine/core/styles.css';

import React, { createContext, ReactNode, useContext, useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import { MantineProvider } from '@mantine/core';
import { Header } from './components/Header/Header';
import { Router } from './Router';
import { theme } from './theme';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'DM Sans', sans-serif;
  }
`;

export default function App() {
  return (
    <>
      <GlobalStyle />
      <MantineProvider theme={theme}>
        <Router />
      </MantineProvider>
    </>
  );
}

export enum ColorSchemeOptions {
  LIGHT = 'light',
  DARK = 'dark',
}

interface ColorSchemeContextValue {
  colorScheme: ColorSchemeOptions;
  setColorScheme: (scheme: ColorSchemeOptions) => void;
}

// Create a context with default value as null
const ColorSchemeContext = createContext<ColorSchemeContextValue | null>(null);

// Provider component
export const ColorSchemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [colorScheme, setColorScheme] = useState<ColorSchemeOptions>(ColorSchemeOptions.DARK);

  return (
    <ColorSchemeContext.Provider value={{ colorScheme, setColorScheme }}>
      {children}
    </ColorSchemeContext.Provider>
  );
};
