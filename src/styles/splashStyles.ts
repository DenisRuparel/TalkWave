import { StyleSheet, Dimensions } from 'react-native';
import { Theme } from '../contexts/ThemeContext';

const { width, height } = Dimensions.get('window');

export const getSplashStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
    logoContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 60,
    },
    logo: {
      width: 160,
      height: 160,
      resizeMode: 'contain',
    },
    textContainer: {
      position: 'absolute',
      bottom: 60,
      alignItems: 'center',
    },
    appName: {
      fontSize: 24,
      fontWeight: '600',
      color: theme.isDark ? theme.colors.text : theme.colors.primary,
      marginBottom: 8,
      letterSpacing: 0.5,
    },
    tagline: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      fontWeight: '400',
      letterSpacing: 0.3,
    },
  });
};

export const colors = {
  primary: '#015ff7',
  text: '#FFFFFF',
  tagline: '#AAAAAA',
  background: '#101d24',
};
