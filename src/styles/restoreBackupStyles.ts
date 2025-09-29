import { StyleSheet, Dimensions } from 'react-native';
import { Theme } from '../contexts/ThemeContext';

const { width, height } = Dimensions.get('window');

export const getRestoreBackupStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      width: '100%',
      paddingHorizontal: 16,
      paddingTop: 50,
      paddingBottom: 16,
    },
    helpButton: {
      padding: 8,
      borderRadius: 20,
    },
    content: {
      flex: 1,
      paddingHorizontal: 24,
      alignItems: 'center',
    },
    iconContainer: {
      marginTop: 40,
      marginBottom: 24,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: 24,
    },
    backupInfo: {
      alignItems: 'center',
      marginBottom: 32,
    },
    backupTime: {
      fontSize: 16,
      color: theme.colors.textSecondary,
      marginBottom: 8,
    },
    backupSize: {
      fontSize: 16,
      color: theme.colors.textSecondary,
      marginBottom: 8,
    },
    backupAccount: {
      fontSize: 16,
      color: theme.colors.textSecondary,
    },
    statusContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    statusText: {
      fontSize: 16,
      color: theme.colors.text,
      marginLeft: 8,
    },
    statusSubText: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginTop: 8,
      lineHeight: 20,
    },
    completeContainer: {
      alignItems: 'center',
      marginBottom: 32,
    },
    checkIcon: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: theme.colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    completeText: {
      fontSize: 16,
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: 8,
    },
    completeSubText: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
    downloadInfo: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginBottom: 32,
      lineHeight: 20,
    },
    buttonContainer: {
      width: '100%',
      marginTop: 'auto',
      marginBottom: 40,
    },
    restoreButton: {
      backgroundColor: '#015ff7',
      paddingVertical: 16,
      borderRadius: 8,
      alignItems: 'center',
      marginBottom: 16,
      shadowColor: '#015ff7',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    restoreButtonText: {
      fontSize: 16,
      color: '#FFFFFF',
      fontWeight: '600',
    },
    skipButton: {
      backgroundColor: 'transparent',
      paddingVertical: 16,
      borderRadius: 8,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    skipButtonText: {
      fontSize: 16,
      color: theme.colors.text,
      fontWeight: '500',
    },
    nextButton: {
      backgroundColor: '#015ff7',
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 'auto',
      marginBottom: 40,
      width: '100%',
      shadowColor: '#015ff7',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    nextButtonText: {
      fontSize: 16,
      color: '#FFFFFF',
      fontWeight: '600',
    },
  });
};
