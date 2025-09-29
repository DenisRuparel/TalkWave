import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Dimensions,
} from 'react-native';
import Icon from '@react-native-vector-icons/octicons';
import { useTheme } from '../contexts/ThemeContext';
import { getRestoreBackupStyles } from '../styles/restoreBackupStyles';
import HelpMenuScreen from './HelpMenuScreen';
import ProfileScreen from './ProfileScreen';

interface RestoreBackupScreenProps {
  onNavigateToProfile: () => void;
}

const RestoreBackupScreen: React.FC<RestoreBackupScreenProps> = ({
  onNavigateToProfile,
}) => {
  const { theme } = useTheme();
  const styles = getRestoreBackupStyles(theme);
  const progress = useRef(new Animated.Value(0)).current;
  const barWidth = useRef(new Animated.Value(0)).current;
  const [isCalculating, setIsCalculating] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [downloadSize, setDownloadSize] = useState('411 MB');
  const [showHelpMenu, setShowHelpMenu] = useState(false);

  // Mock backup data
  const backupData = {
    time: '3 minutes ago',
    size: '411 MB',
    account: 'technew1432@gmail.com',
    messages: '16,896 messages restored.',
  };

  const handleRestore = () => {
    setIsCalculating(true);
    
    // Simulate calculating download size
    setTimeout(() => {
      setIsCalculating(false);
      setIsRestoring(true);
      // start animation loop
      Animated.loop(
        Animated.timing(progress, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        })
      ).start();
      Animated.timing(barWidth, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: false,
      }).start();
      
      // Simulate restoration process
      setTimeout(() => {
        setIsRestoring(false);
        setIsComplete(true);
        progress.stopAnimation();
      }, 3000);
    }, 2000);
  };

  const handleSkip = () => {
    onNavigateToProfile();
  };

  const handleNext = () => {
    onNavigateToProfile();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.helpButton}
            onPress={() => setShowHelpMenu(true)}
          >
            <Icon name="question" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        {/* Cloud Icon */}
        <View style={styles.iconContainer}>
          <Icon name="cloud" size={80} color="#015ff7" />
        </View>

        {/* Title */}
        <Text style={styles.title}>
          {isComplete ? 'Restore complete' : 'Restore backup'}
        </Text>

        {/* Backup Info */}
        <View style={styles.backupInfo}>
          <Text style={styles.backupTime}>{backupData.time}</Text>
          <Text style={styles.backupSize}>Size: {backupData.size}</Text>
          <Text style={styles.backupAccount}>Account: {backupData.account}</Text>
        </View>

        {/* Status Messages */}
        {isCalculating && (
          <View style={styles.statusContainer}>
            <ActivityIndicator size="small" color="#015ff7" />
            <Text style={styles.statusText}>Calculating download size...</Text>
          </View>
        )}

        {isRestoring && (
          <View style={{width: '100%', alignItems: 'center', marginBottom: 16}}>
            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 12}}>
              <Icon name="history" size={28} color={theme.colors.text} />
              {/* Dotted arc animation */}
              <View style={{width: 180, height: 24, justifyContent: 'center', marginHorizontal: 8}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  {Array.from({ length: 12 }).map((_, i) => {
                    const input = [0, 1];
                    const translateY = progress.interpolate({ inputRange: [0, 1], outputRange: [0, 0] });
                    const opacity = progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [i / 12, ((i + 6) % 12) / 12],
                    });
                    return (
                      <Animated.View
                        key={i}
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: '#015ff7',
                          opacity,
                          transform: [{ translateY }],
                        }}
                      />
                    );
                  })}
                </View>
              </View>
              <Icon name="device-mobile" size={28} color={theme.colors.text} />
            </View>
            {/* Progress bar */}
            <View style={{width: '70%', height: 4, backgroundColor: theme.colors.border, borderRadius: 2}}>
              <Animated.View style={{
                height: 4,
                borderRadius: 2,
                backgroundColor: '#015ff7',
                width: barWidth.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }),
              }} />
            </View>
            <Text style={[styles.statusText, { marginTop: 12 }]}>Preparing...</Text>
            <Text style={styles.statusSubText}>
              Your media (about 104 MB) will restore in the background after your messages restore.
            </Text>
          </View>
        )}

        {isComplete && (
          <View style={styles.completeContainer}>
            <View style={styles.checkIcon}>
              <Icon name="check" size={40} color="#015ff7" />
            </View>
            <Text style={styles.completeText}>{backupData.messages}</Text>
            <Text style={styles.completeSubText}>
              Your media will restore in the background.
            </Text>
          </View>
        )}

        {/* Download Info */}
        {!isCalculating && !isRestoring && !isComplete && (
          <Text style={styles.downloadInfo}>
            About {downloadSize} will be downloaded. To reduce data usage, connect your phone to Wi-Fi.
          </Text>
        )}

        {/* Buttons */}
        {!isComplete ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.restoreButton} onPress={handleRestore}>
              <Text style={styles.restoreButtonText}>Restore</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
              <Text style={styles.skipButtonText}>Skip</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Help Menu */}
      <HelpMenuScreen
        visible={showHelpMenu}
        onClose={() => setShowHelpMenu(false)}
      />
    </SafeAreaView>
  );
};

export default RestoreBackupScreen;
