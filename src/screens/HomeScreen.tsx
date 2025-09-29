import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Icon from '@react-native-vector-icons/octicons';
import { useTheme } from '../contexts/ThemeContext';
import { getHomeStyles } from '../styles/homeStyles';

interface HomeScreenProps {
  onNavigateBack?: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigateBack }) => {
  const { theme } = useTheme();
  const styles = getHomeStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>TalkWave</Text>
          {onNavigateBack && (
            <TouchableOpacity style={styles.backButton} onPress={onNavigateBack}>
              <Icon name="arrow-left" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          )}
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          <Icon name="check-circle" size={80} color="#25D366" />
          <Text style={styles.welcomeText}>Welcome to the app!</Text>
          <Text style={styles.subText}>
            You have successfully completed the setup process.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
