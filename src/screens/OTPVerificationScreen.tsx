import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Modal,
  Animated,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Icon from '@react-native-vector-icons/octicons';
import { useTheme } from '../contexts/ThemeContext';
import { getOTPStyles } from '../styles/otpStyles';

interface OTPVerificationScreenProps {
  phoneNumber: string;
  countryCode: string;
  onNavigateBack: () => void;
  onNavigateToPermission: () => void;
}

const { width, height } = Dimensions.get('window');

const OTPVerificationScreen: React.FC<OTPVerificationScreenProps> = ({ 
  phoneNumber, 
  countryCode,
  onNavigateBack,
  onNavigateToPermission
}) => {
  const { theme } = useTheme();
  const styles = getOTPStyles(theme);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showVerifying, setShowVerifying] = useState(false);
  const [selectedOption, setSelectedOption] = useState('sms');
  const [smsTimer, setSmsTimer] = useState(7200); // 2 hours in seconds
  const [callTimer, setCallTimer] = useState(62); // 1:02 in seconds
  const [voiceTimer, setVoiceTimer] = useState(62); // 1:02 in seconds
  
  const slideAnim = useRef(new Animated.Value(height)).current;
  const inputRefs = useRef<TextInput[]>([]);

  useEffect(() => {
    if (showBottomSheet) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [showBottomSheet]);

  // Countdown timers
  useEffect(() => {
    const interval = setInterval(() => {
      setSmsTimer(prev => prev > 0 ? prev - 1 : 0);
      setCallTimer(prev => prev > 0 ? prev - 1 : 0);
      setVoiceTimer(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if all 6 digits are entered
    const updatedOtp = [...newOtp];
    if (updatedOtp.every(digit => digit !== '')) {
      const enteredOTP = updatedOtp.join('');
      if (enteredOTP === '123456') {
        setShowVerifying(true);
        // Simulate verification delay
        setTimeout(() => {
          setShowVerifying(false);
          onNavigateToPermission();
        }, 2000);
      }
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const formatTimer = (seconds: number) => {
    if (seconds >= 3600) {
      // Format as hours
      const hours = Math.floor(seconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''}`;
    } else {
      // Format as minutes:seconds
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
  };

  const handleWrongNumber = () => {
    if (onNavigateBack) {
      onNavigateBack();
    }
  };

  const handleDidntReceiveCode = () => {
    setShowBottomSheet(true);
  };

  const handleCloseBottomSheet = () => {
    setShowBottomSheet(false);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleContinue = () => {
    // Handle continue logic
    setShowBottomSheet(false);
  };


  const handleMenuPress = () => {
    setShowMenu(true);
  };

  const handleHelpPress = () => {
    setShowMenu(false);
    // Open help link
  };

  const handleCloseMenu = () => {
    setShowMenu(false);
  };

  const isContinueDisabled = selectedOption === 'sms' && smsTimer > 0 ||
                           selectedOption === 'call' && callTimer > 0 ||
                           selectedOption === 'voice' && voiceTimer > 0;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Menu */}
      <View style={styles.header}>
        <View style={styles.headerSpacer} />
        <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
          <Text style={styles.menuIcon}>⋮</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>Verifying your number</Text>
        
        {/* Subtitle with phone number */}
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>
            Waiting to automatically detect 6-digit code sent to {countryCode} {phoneNumber}
          </Text>
          <TouchableOpacity onPress={handleWrongNumber}>
            <Text style={styles.wrongNumberLink}>Wrong number?</Text>
          </TouchableOpacity>
        </View>

        {/* OTP Input */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                if (ref) inputRefs.current[index] = ref;
              }}
              style={styles.otpInput}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
              keyboardType="numeric"
              maxLength={1}
              textAlign="center"
              selectTextOnFocus
            />
          ))}
        </View>

        {/* Didn't receive code link */}
        <TouchableOpacity onPress={handleDidntReceiveCode} style={styles.didntReceiveContainer}>
          <Text style={styles.didntReceiveLink}>Didn't receive code?</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Sheet */}
      <Modal
        visible={showBottomSheet}
        transparent={true}
        animationType="none"
        onRequestClose={handleCloseBottomSheet}
      >
        <View style={styles.bottomSheetOverlay}>
          <TouchableOpacity 
            style={styles.bottomSheetBackdrop} 
            activeOpacity={1} 
            onPress={handleCloseBottomSheet}
          />
          <Animated.View 
            style={[
              styles.bottomSheet,
              { transform: [{ translateY: slideAnim }] }
            ]}
          >
            <View style={styles.bottomSheetHandle} />
            <Text style={styles.bottomSheetTitle}>Choose how to verify</Text>
            
            {/* SMS Option */}
            <TouchableOpacity 
              style={[
                styles.optionContainer,
                selectedOption === 'sms' && styles.optionContainerSelected
              ]}
              onPress={() => handleOptionSelect('sms')}
            >
              <View style={styles.optionLeft}>
                <View style={styles.iconContainer}>
                  <Icon name="comment" size={20} color={theme.colors.primary} />
                </View>
                <View style={styles.optionTextContainer}>
                  <Text style={styles.optionText}>Receive new SMS</Text>
                  {smsTimer > 0 && (
                    <Text style={styles.timerText}>Try again in {formatTimer(smsTimer)}</Text>
                  )}
                </View>
              </View>
              <View style={[
                styles.radioButton,
                selectedOption === 'sms' && styles.radioButtonSelected
              ]}>
                {selectedOption === 'sms' && <View style={styles.radioButtonInner} />}
              </View>
            </TouchableOpacity>

            {/* Missed Call Option */}
            <TouchableOpacity 
              style={[
                styles.optionContainer,
                selectedOption === 'call' && styles.optionContainerSelected
              ]}
              onPress={() => handleOptionSelect('call')}
            >
              <View style={styles.optionLeft}>
                <View style={styles.iconContainer}>
                  <Icon name="device-mobile" size={20} color={theme.colors.primary} />
                </View>
                <View style={styles.optionTextContainer}>
                  <Text style={styles.optionText}>Missed call</Text>
                  {callTimer > 0 && (
                    <Text style={styles.timerText}>Try again in {formatTimer(callTimer)}</Text>
                  )}
                </View>
              </View>
              <View style={[
                styles.radioButton,
                selectedOption === 'call' && styles.radioButtonSelected
              ]}>
                {selectedOption === 'call' && <View style={styles.radioButtonInner} />}
              </View>
            </TouchableOpacity>

            {/* Voice Call Option */}
            <TouchableOpacity 
              style={[
                styles.optionContainer,
                selectedOption === 'voice' && styles.optionContainerSelected
              ]}
              onPress={() => handleOptionSelect('voice')}
            >
              <View style={styles.optionLeft}>
                <View style={styles.iconContainer}>
                  <Icon name="megaphone" size={20} color={theme.colors.primary} />
                </View>
                <View style={styles.optionTextContainer}>
                  <Text style={styles.optionText}>Voice call</Text>
                  {voiceTimer > 0 && (
                    <Text style={styles.timerText}>Try again in {formatTimer(voiceTimer)}</Text>
                  )}
                </View>
              </View>
              <View style={[
                styles.radioButton,
                selectedOption === 'voice' && styles.radioButtonSelected
              ]}>
                {selectedOption === 'voice' && <View style={styles.radioButtonInner} />}
              </View>
            </TouchableOpacity>

            {/* Continue Button */}
            <TouchableOpacity
              style={[
                styles.continueButton,
                isContinueDisabled && styles.continueButtonDisabled
              ]}
              onPress={handleContinue}
              disabled={isContinueDisabled}
            >
              <Text style={[
                styles.continueButtonText,
                isContinueDisabled && styles.continueButtonTextDisabled
              ]}>
                Continue
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>

      {/* Menu Modal */}
      <Modal
        visible={showMenu}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseMenu}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={handleCloseMenu}
        >
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem} onPress={handleHelpPress}>
              <Text style={styles.menuItemText}>Help</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Verifying Modal */}
      <Modal
        visible={showVerifying}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {}} // Prevent closing during verification
      >
        <View style={styles.verifyingOverlay}>
          <View style={styles.verifyingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={styles.verifyingText}>Verifying...</Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default OTPVerificationScreen;
