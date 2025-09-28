import { StyleSheet, Dimensions } from 'react-native';
import { Theme } from '../contexts/ThemeContext';

const { width, height } = Dimensions.get('window');

export const getWelcomeStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    safeArea: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 24,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: 40,
      letterSpacing: 0.5,
    },
    illustrationContainer: {
      marginBottom: 40,
      alignItems: 'center',
    },
    illustration: {
      width: 200,
      height: 200,
      resizeMode: 'contain',
    },
    termsContainer: {
      marginBottom: 40,
      paddingHorizontal: 20,
    },
    termsText: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      lineHeight: 20,
    },
    link: {
      color: theme.colors.link,
      textDecorationLine: 'underline',
    },
    button: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderRadius: 12,
      width: '100%',
      alignItems: 'center',
      marginBottom: 20,
      shadowColor: theme.colors.primary,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
      letterSpacing: 0.5,
    },
    footer: {
      position: 'absolute',
      bottom: 40,
      alignItems: 'center',
    },
    footerText: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      fontWeight: '400',
    },
  });
};
