import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

export interface Theme {
  colors: {
    background: string;
    surface: string;
    primary: string;
    text: string;
    textSecondary: string;
    link: string;
    border: string;
  };
  isDark: boolean;
}

const lightTheme: Theme = {
  colors: {
    background: '#F7F9FC',
    surface: '#FFFFFF',
    primary: '#015ff7',
    text: '#0B141A',
    textSecondary: '#5A6B7A',
    link: '#015ff7',
    border: '#E6ECF1',
  },
  isDark: false,
};

const darkTheme: Theme = {
  colors: {
    background: '#0B141A',
    surface: '#131C22',
    primary: '#015ff7',
    text: '#FFFFFF',
    textSecondary: '#A7B4BF',
    link: '#015ff7',
    border: '#1E2A32',
  },
  isDark: true,
};

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(true); // Default to dark mode

  useEffect(() => {
    // Update based on system preference
    if (systemColorScheme === 'light') {
      setIsDark(false);
    } else {
      setIsDark(true); // Default to dark for 'dark' or null/undefined
    }
  }, [systemColorScheme]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
