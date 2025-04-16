import React, { createContext, useContext, useMemo, useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

interface ThemeContextProps {
  toggleTheme: () => void;
  mode: 'light' | 'dark';
}

const ThemeModeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useThemeMode = () => {
  const context = useContext(ThemeModeContext);
  if (!context) throw new Error('useThemeMode must be used within ThemeModeProvider');
  return context;
};

export const ThemeModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  return (
    <ThemeModeContext.Provider value={{ toggleTheme, mode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};
