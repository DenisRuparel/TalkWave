import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, Modal, Alert } from 'react-native';
import Icon from '@react-native-vector-icons/octicons';
import * as Contacts from 'expo-contacts';
import * as MediaLibrary from 'expo-media-library';
import { useTheme } from '../contexts/ThemeContext';
import { getContactsMediaPermissionStyles } from '../styles/contactsMediaPermissionStyles';

interface ContactsMediaPermissionModalProps {
  visible: boolean;
  onClose: () => void;
  onContinue: () => void;
}

const ContactsMediaPermissionModal: React.FC<ContactsMediaPermissionModalProps> = ({
  visible,
  onClose,
  onContinue,
}) => {
  const { theme } = useTheme();
  const styles = getContactsMediaPermissionStyles(theme);

	const handleContinue = useCallback(async () => {
		try {
			// Fire-and-forget permission requests; do not block navigation
			const requestContacts = Contacts.requestPermissionsAsync().catch(() => null);
			const requestMedia = MediaLibrary.requestPermissionsAsync().catch(() => null);
			await Promise.allSettled([requestContacts, requestMedia]);
		} catch (err) {
			// Intentionally ignore permission errors to proceed to the next process
			console.warn('Ignoring permission request error:', err);
		} finally {
			onContinue();
		}
	}, [onContinue]);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Icon name="image" size={28} color="#FFFFFF" />
            <Text style={styles.plusSign}>+</Text>
            <Icon name="file-directory" size={28} color="#FFFFFF" />
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>Contacts and media</Text>
            <Text style={styles.subtitle}>
              To easily send messages and photos to friends and family, allow the app to access your contacts, photos and other media.
            </Text>

            <View style={styles.buttonsRow}>
              <TouchableOpacity style={styles.outlineButton} onPress={onClose}>
                <Text style={styles.outlineButtonText}>Not now</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.primaryButton} onPress={handleContinue}>
                <Text style={styles.primaryButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ContactsMediaPermissionModal;


