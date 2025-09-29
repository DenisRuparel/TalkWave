import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Linking,
  Alert,
  Modal,
  Animated,
} from 'react-native';
// Simple country data
interface Country {
  cca2: string;
  callingCode: string[];
  flag: string;
  name: string;
}

const COUNTRIES: Country[] = [
  { cca2: 'US', callingCode: ['1'], flag: '🇺🇸', name: 'United States' },
  { cca2: 'CA', callingCode: ['1'], flag: '🇨🇦', name: 'Canada' },
  { cca2: 'GB', callingCode: ['44'], flag: '🇬🇧', name: 'United Kingdom' },
  { cca2: 'IN', callingCode: ['91'], flag: '🇮🇳', name: 'India' },
  { cca2: 'AU', callingCode: ['61'], flag: '🇦🇺', name: 'Australia' },
  { cca2: 'DE', callingCode: ['49'], flag: '🇩🇪', name: 'Germany' },
  { cca2: 'FR', callingCode: ['33'], flag: '🇫🇷', name: 'France' },
  { cca2: 'JP', callingCode: ['81'], flag: '🇯🇵', name: 'Japan' },
  { cca2: 'CN', callingCode: ['86'], flag: '🇨🇳', name: 'China' },
  { cca2: 'BR', callingCode: ['55'], flag: '🇧🇷', name: 'Brazil' },
];
import { useTheme } from '../contexts/ThemeContext';
import { getPhoneStyles } from '../styles/phoneStyles';

interface PhoneNumberScreenProps {
  onNavigateToOTP: (phoneNumber: string, countryCode: string) => void;
  onNavigateBack?: () => void;
}

const PhoneNumberScreen: React.FC<PhoneNumberScreenProps> = ({ onNavigateToOTP, onNavigateBack }) => {
  const { theme } = useTheme();
  const styles = getPhoneStyles(theme);
  
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const phoneInputRef = useRef<TextInput>(null);
  const spinValue = useRef(new Animated.Value(0)).current;

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setError('');
  };

  const handlePhoneNumberChange = (text: string) => {
    // Remove any non-numeric characters
    const numericText = text.replace(/[^0-9]/g, '');
    setPhoneNumber(numericText);
    setError('');
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleWhatsMyNumber = () => {
    Linking.openURL('https://support.whatsapp.com/help/211972197923292').catch(() => {
      Alert.alert('Error', 'Could not open help link');
    });
  };

  const handleMenuPress = () => {
    setShowMenu(true);
  };

  const handleHelpPress = () => {
    setShowMenu(false);
    handleWhatsMyNumber();
  };

  const handleCloseMenu = () => {
    setShowMenu(false);
  };

  const validatePhoneNumber = (): boolean => {
    if (!phoneNumber.trim()) {
      setError('Phone number is required');
      return false;
    }
    
    if (phoneNumber.length < 7) {
      setError('Phone number is too short');
      return false;
    }
    
    if (phoneNumber.length > 15) {
      setError('Phone number is too long');
      return false;
    }
    
    return true;
  };

  const handleNext = () => {
    if (validatePhoneNumber()) {
      setShowConfirmation(true);
    }
  };

  const handleConfirmOK = () => {
    setShowConfirmation(false);
    setIsLoading(true);
    
    // Start spinner animation
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
    
    // Simulate API call or verification process
    setTimeout(() => {
      setIsLoading(false);
      spinValue.stopAnimation();
      onNavigateToOTP(phoneNumber, `+${selectedCountry.callingCode?.[0]}`);
    }, 2000);
  };

  const handleEditNumber = () => {
    setShowConfirmation(false);
    // Focus back to phone input
    phoneInputRef.current?.focus();
  };

  const isButtonDisabled = !phoneNumber.trim() || phoneNumber.length < 10;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Menu */}
      <View style={styles.header}>
        <View style={styles.headerSpacer} />
        <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
          <Text style={styles.menuIcon}>⋮</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <View style={styles.content}>
          {/* Title */}
          <Text style={styles.title}>Enter your phone number</Text>
          
          {/* Subtitle */}
          <Text style={styles.subtitle}>
            TalkWave will need to verify your phone number. Carrier charges may apply.
          </Text>
          

          {/* Input Container */}
          <View style={styles.inputContainer}>
            {/* Country Selector */}
            <TouchableOpacity 
              style={styles.countrySelector}
              onPress={() => setShowCountryPicker(true)}
            >
              <Text style={styles.countryFlag}>{selectedCountry.flag}</Text>
              <Text style={styles.countryName}>{selectedCountry.name}</Text>
              <Text style={styles.countryCode}>+{selectedCountry.callingCode[0]}</Text>
            </TouchableOpacity>
            
            {/* Phone Input Row */}
            <View style={styles.phoneInputContainer}>
              <View style={[
                styles.phoneInputRow,
                isFocused && styles.phoneInputFocused,
              ]}>
                {/* Country Code Section */}
                <View style={styles.countrySection}>
                  <Text style={styles.countryCodeText}>
                    +{selectedCountry.callingCode?.[0]}
                  </Text>
                </View>
                
                {/* Phone Number Input */}
                <TextInput
                  ref={phoneInputRef}
                  style={styles.phoneInput}
                  value={phoneNumber}
                  onChangeText={handlePhoneNumberChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder="Phone number"
                  placeholderTextColor="#AAAAAA"
                  keyboardType="numeric"
                  returnKeyType="done"
                  maxLength={15}
                />
              </View>
              
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
            </View>
          </View>

        </View>
      </KeyboardAvoidingView>

      {/* Bottom Next Button */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            isButtonDisabled && styles.buttonDisabled,
          ]}
          onPress={handleNext}
          disabled={isButtonDisabled}
        >
          <Text
            style={[
              styles.buttonText,
              isButtonDisabled && styles.buttonTextDisabled,
            ]}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>

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

      {/* Confirmation Dialog */}
      <Modal
        visible={showConfirmation}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowConfirmation(false)}
      >
        <View style={styles.dialogOverlay}>
          <View style={styles.confirmationDialog}>
            <Text style={styles.dialogTitle}>You entered the phone number:</Text>
            <Text style={styles.phoneNumberText}>
              +{selectedCountry.callingCode?.[0]} {phoneNumber}
            </Text>
            <Text style={styles.confirmationQuestion}>
              Is this OK, or would you like to edit the number?
            </Text>
            <View style={styles.dialogButtons}>
              <TouchableOpacity 
                style={styles.editButton} 
                onPress={handleEditNumber}
              >
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.okButton} 
                onPress={handleConfirmOK}
              >
                <Text style={styles.okButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Loading Dialog */}
      <Modal
        visible={isLoading}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {}} // Prevent closing during loading
      >
        <View style={styles.dialogOverlay}>
          <View style={styles.loadingDialog}>
            <Animated.View 
              style={[
                styles.loadingSpinner,
                {
                  transform: [{
                    rotate: spinValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '360deg'],
                    })
                  }]
                }
              ]} 
            />
            <Text style={styles.loadingText}>Connecting...</Text>
          </View>
        </View>
      </Modal>

      {/* Country Picker Modal */}
      <Modal
        visible={showCountryPicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCountryPicker(false)}
      >
        <View style={styles.countryPickerOverlay}>
          <View style={styles.countryPickerContainer}>
            <View style={styles.countryPickerHeader}>
              <Text style={styles.countryPickerTitle}>Select Country</Text>
              <TouchableOpacity 
                style={styles.countryPickerClose}
                onPress={() => setShowCountryPicker(false)}
              >
                <Text style={styles.countryPickerCloseText}>✕</Text>
              </TouchableOpacity>
            </View>
            {COUNTRIES.map((country) => (
              <TouchableOpacity
                key={country.cca2}
                style={[
                  styles.countryItem,
                  selectedCountry.cca2 === country.cca2 && styles.countryItemSelected
                ]}
                onPress={() => {
                  setSelectedCountry(country);
                  setShowCountryPicker(false);
                }}
              >
                <Text style={styles.countryItemFlag}>{country.flag}</Text>
                <Text style={styles.countryItemName}>{country.name}</Text>
                <Text style={styles.countryItemCode}>+{country.callingCode[0]}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default PhoneNumberScreen;
