import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import Icon from '@react-native-vector-icons/octicons';
import { useTheme } from '../contexts/ThemeContext';
import { getHelpMenuStyles } from '../styles/helpMenuStyles';

interface HelpMenuScreenProps {
  visible: boolean;
  onClose: () => void;
}

const { width, height } = Dimensions.get('window');

const HelpMenuScreen: React.FC<HelpMenuScreenProps> = ({
  visible,
  onClose,
}) => {
  const { theme } = useTheme();
  const styles = getHelpMenuStyles(theme);

  const helpItems = [
    {
      icon: 'question',
      title: 'Help Center',
      description: 'Find answers to common questions',
    },
    {
      icon: 'book',
      title: 'Privacy Policy',
      description: 'Learn how we protect your data',
    },
    {
      icon: 'shield-check',
      title: 'Security',
      description: 'Keep your account secure',
    },
    {
      icon: 'gear',
      title: 'Settings',
      description: 'Customize your experience',
    },
  ];

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Help & Support</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Icon name="x" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View style={styles.content}>
            {helpItems.map((item, index) => (
              <TouchableOpacity key={index} style={styles.helpItem}>
                <View style={styles.helpIcon}>
                  <Icon name={item.icon} size={24} color="#015ff7" />
                </View>
                <View style={styles.helpText}>
                  <Text style={styles.helpTitle}>{item.title}</Text>
                  <Text style={styles.helpDescription}>{item.description}</Text>
                </View>
                <Icon name="chevron-right" size={20} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Need more help? Contact our support team.
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default HelpMenuScreen;
