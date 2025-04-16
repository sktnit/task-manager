import React from 'react';
import { Button } from '@mui/material';
import { useThemeMode } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { toggleTheme, mode } = useThemeMode();

  return (
    <Button variant="outlined" onClick={toggleTheme} sx={{ mb: 2 }}>
      Switch to {mode === 'light' ? 'Dark' : 'Light'} Mode
    </Button>
  );
};

export default ThemeToggle;
