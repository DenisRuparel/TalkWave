import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Theme } from '../contexts/ThemeContext';

const { width, height } = Dimensions.get('window');

export const getOTPStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: 50,
      paddingBottom: 16,
    },
    headerSpacer: {
      flex: 1,
    },
    menuButton: {
      padding: 8,
      borderRadius: 20,
    },
    menuIcon: {
      fontSize: 30,
      color: theme.colors.text,
      fontWeight: 'bold',
      transform: [{ rotate: '180deg' }],
    },
    content: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 60,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: 16,
    },
    subtitleContainer: {
      marginBottom: 40,
    },
    subtitle: {
      fontSize: 16,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      lineHeight: 22,
      marginBottom: 8,
    },
    wrongNumberLink: {
      fontSize: 16,
      color: theme.colors.primary,
      textAlign: 'center',
      fontWeight: '500',
    },
    otpContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 40,
      paddingHorizontal: 20,
    },
    otpInput: {
      width: 45,
      height: 50,
      borderBottomWidth: 2,
      borderBottomColor: theme.colors.border,
      fontSize: 24,
      fontWeight: '600',
      color: theme.colors.text,
      textAlign: 'center',
    },
    didntReceiveContainer: {
      alignItems: 'center',
      marginTop: 20,
    },
    didntReceiveLink: {
      fontSize: 16,
      color: theme.colors.primary,
      fontWeight: '500',
    },
    bottomSheetOverlay: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    bottomSheetBackdrop: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    bottomSheet: {
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      paddingHorizontal: 24,
      paddingTop: 12,
      paddingBottom: 34,
      maxHeight: height * 0.6,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: -2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 8,
    },
    bottomSheetHandle: {
      width: 40,
      height: 4,
      backgroundColor: theme.colors.border,
      borderRadius: 20,
      alignSelf: 'center',
      marginBottom: 20,
    },
    bottomSheetTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: 24,
    },
    optionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 16,
      marginHorizontal: 16,
      marginVertical: 8,
      borderRadius: 12,
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    optionContainerSelected: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.surface,
    },
    optionLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    iconText: {
      fontSize: 20,
    },
    optionTextContainer: {
      flex: 1,
    },
    radioButton: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: theme.colors.border,
      justifyContent: 'center',
      alignItems: 'center',
    },
    radioButtonSelected: {
      borderColor: theme.colors.primary,
    },
    radioButtonInner: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: theme.colors.primary,
    },
    optionText: {
      fontSize: 16,
      color: theme.colors.text,
      fontWeight: '500',
    },
    timerText: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      marginTop: 4,
    },
    continueButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 24,
      shadowColor: theme.colors.primary,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    continueButtonDisabled: {
      backgroundColor: theme.colors.border,
      shadowOpacity: 0,
      elevation: 0,
    },
    continueButtonText: {
      fontSize: 16,
      color: '#FFFFFF',
      fontWeight: '600',
    },
    continueButtonTextDisabled: {
      color: theme.colors.textSecondary,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      paddingTop: 60,
      paddingRight: 16,
    },
    menuContainer: {
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      paddingVertical: 8,
      minWidth: 120,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    menuItem: {
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    menuItemText: {
      fontSize: 16,
      color: theme.colors.text,
      fontWeight: '500',
    },
  });
};
