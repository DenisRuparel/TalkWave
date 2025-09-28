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
    background: '#FFFFFF',
    surface: '#F8F9FA',
    primary: '#015ff7',
    text: '#000000',
    textSecondary: '#666666',
    link: '#015ff7',
    border: '#E0E0E0',
  },
  isDark: false,
};

const darkTheme: Theme = {
  colors: {
    background: '#0B141A',
    surface: '#1A1A1A',
    primary: '#015ff7',
    text: '#FFFFFF',
    textSecondary: '#AAAAAA',
    link: '#015ff7',
    border: '#333333',
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
