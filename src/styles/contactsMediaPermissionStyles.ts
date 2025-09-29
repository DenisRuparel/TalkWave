import { StyleSheet } from 'react-native';
import { Theme } from '../contexts/ThemeContext';

export const getContactsMediaPermissionStyles = (theme: Theme) => {
  return StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    modal: {
      width: '100%',
      maxWidth: 340,
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 8,
    },
    header: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 24,
      paddingHorizontal: 32,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    plusSign: {
      fontSize: 22,
      color: '#FFFFFF',
      fontWeight: 'bold',
      marginHorizontal: 16,
    },
    content: {
      padding: 24,
      backgroundColor: theme.colors.surface,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: 12,
    },
    subtitle: {
      fontSize: 16,
      color: theme.colors.textSecondary,
      lineHeight: 22,
      textAlign: 'center',
      marginBottom: 20,
    },
    buttonsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    outlineButton: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.colors.border,
      alignItems: 'center',
      marginRight: 10,
    },
    outlineButtonText: {
      fontSize: 16,
      color: theme.colors.text,
      fontWeight: '500',
    },
    primaryButton: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 10,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      marginLeft: 10,
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    primaryButtonText: {
      fontSize: 16,
      color: '#FFFFFF',
      fontWeight: '600',
    },
  });
};


