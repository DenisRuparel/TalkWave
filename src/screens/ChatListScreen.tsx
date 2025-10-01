import React, { useMemo, useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, FlatList, Image, Modal } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import SvgIcon from '../components/SvgIcon';

type Chat = {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  avatar?: any;
  unread?: boolean;
};

const sampleChats: Chat[] = [
  { id: '1', name: 'Denis Ruparel (You)', lastMessage: '📷 Photo', time: '12:49 PM', unread: false },
  { id: '2', name: 'S W E E T  F A M I L Y', lastMessage: 'Maa: 📷 3 photos', time: '12:10 AM' },
  { id: '3', name: 'SJLVB  VVN Official', lastMessage: 'This message was deleted', time: 'Yesterday' },
  { id: '4', name: 'Jay Nathvani', lastMessage: 'You reacted 🙏 to "Okok thankyou"', time: 'Yesterday' },
  { id: '5', name: 'Nemis 🐶', lastMessage: 'Hello', time: 'Yesterday', unread: true },
  { id: '6', name: 'Placement Batch 2022-26', lastMessage: 'Announcements • We recently shared offer letters...', time: 'Yesterday' },
  { id: '7', name: 'Instamart', lastMessage: '•', time: 'Yesterday' },
  { id: '8', name: 'Google Cloud Arcade Community', lastMessage: 'Announcements • Arcade and Triva Games for September', time: 'Yesterday' },
  { id: '9', name: 'Yatri Cloud | Global ☁️', lastMessage: 'Announcements • https://youtube.com/shorts/...', time: 'Yesterday' },
];

const Pill: React.FC<{ label: string; active?: boolean }> = ({ label, active }) => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 999,
        marginRight: 8,
        backgroundColor: active ? theme.colors.primary : 'transparent',
        borderWidth: active ? 0 : 1,
        borderColor: theme.colors.border,
      }}
    >
      <Text style={{ color: active ? '#ffffff' : theme.colors.textSecondary, fontSize: 12 }}>{label}</Text>
    </View>
  );
};

const MenuItem: React.FC<{ label: string; onPress?: () => void }> = ({ label, onPress }) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity onPress={onPress} style={{ paddingVertical: 10 }}>
      <Text style={{ color: theme.colors.text, fontSize: 14 }}>{label}</Text>
    </TouchableOpacity>
  );
};

const ChatItem: React.FC<{ chat: Chat }> = ({ chat }) => {
  const { theme } = useTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12 }}>
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: theme.colors.surface,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 12,
          borderWidth: 1,
          borderColor: theme.colors.border,
        }}
      >
        <Text style={{ color: theme.colors.textSecondary, fontWeight: '600' }}>
          {chat.name.substring(0, 1)}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: theme.colors.text, fontSize: 16, flex: 1 }} numberOfLines={1}>
            {chat.name}
          </Text>
          <Text style={{ color: theme.colors.textSecondary, fontSize: 12 }}>{chat.time}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
          <Text style={{ color: theme.colors.textSecondary, fontSize: 13 }} numberOfLines={1}>
            {chat.lastMessage}
          </Text>
          {chat.unread ? (
            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: theme.colors.primary, marginLeft: 6 }} />
          ) : null}
        </View>
      </View>
    </View>
  );
};

const ChatListScreen: React.FC = () => {
  const { theme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [activeTab, setActiveTab] = useState(0); // Track active tab
  const data = useMemo(() => sampleChats, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Header */}
      <View style={{ 
        paddingHorizontal: 16, 
        paddingBottom: 8, 
        backgroundColor: theme.colors.background, 
        marginTop: 50,
        minHeight: 60
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', minHeight: 44, paddingBottom: 10 }}>
          <Text style={{ 
            color: theme.colors.text, 
            fontSize: 22, 
            fontWeight: '700', 
            flex: 1,
            textAlign: 'left'
          }}>
            TalkWave
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity 
              style={{ 
                marginRight: 4, 
                padding: 8,
                borderRadius: 20,
                backgroundColor: 'transparent'
              }}
              activeOpacity={0.6}
            >
              <Image source={require('../../assets/icons/scanner.png')} style={{ width: 22, height: 22, tintColor: theme.colors.textSecondary }} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={{ 
                marginRight: 4, 
                padding: 8,
                borderRadius: 20,
                backgroundColor: 'transparent'
              }}
              activeOpacity={0.6}
            >
              <Image source={require('../../assets/icons/camera.png')} style={{ width: 22, height: 22, tintColor: theme.colors.textSecondary }} />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setMenuOpen((v) => !v)} 
              style={{ 
                padding: 8,
                borderRadius: 20,
                backgroundColor: 'transparent'
              }}
              activeOpacity={0.6}
            >
              <SvgIcon name="dots" size={22} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search */}
        <View
          style={{
            marginTop: 8,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.colors.surface,
            borderRadius: 12,
            paddingHorizontal: 12,
            borderWidth: 1,
            borderColor: theme.colors.border,
          }}
        >
          <View style={{ marginRight: 8 }}>
            <SvgIcon name="search" size={18} color={theme.colors.textSecondary} />
          </View>
          <TextInput
            placeholder="Search"
            placeholderTextColor={theme.colors.textSecondary}
            style={{ flex: 1, color: theme.colors.text, paddingVertical: 10 }}
          />
        </View>

        {/* Pills */}
        <View style={{ marginTop: 20 }}>
          <FlatList
            data={[
              { label: "All", active: true },
              { label: "Unread", active: false },
              { label: "Favorites", active: false },
              { label: "Groups", active: false },
              { label: "Communities", active: false },
              { label: "Home", active: false },
              { label: "+", active: false }
            ]}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 16 }}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <Pill label={item.label} active={item.active} />}
          />
        </View>

        {/* Archived */}
        <TouchableOpacity 
          style={{ 
            marginTop: 20, 
            flexDirection: 'row', 
            alignItems: 'center',
            paddingVertical: 12,
            paddingHorizontal: 8,
            borderRadius: 12,
            backgroundColor: 'transparent'
          }}
          activeOpacity={0.7}
        >
          <View style={{ marginRight: 12 }}>
            <SvgIcon name="archived" size={20} color={theme.colors.textSecondary} />
          </View>
          <Text style={{ color: theme.colors.textSecondary, fontSize: 16, flex: 1 }}>Archived</Text>
          <View style={{ 
            backgroundColor: theme.colors.surface, 
            paddingHorizontal: 8, 
            paddingVertical: 4,
            borderRadius: 12,
            minWidth: 24,
            alignItems: 'center'
          }}>
            <Text style={{ color: theme.colors.textSecondary, fontSize: 12, fontWeight: '500' }}>11</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 5, paddingBottom: 80 }}
        renderItem={({ item }) => <ChatItem chat={item} />}
      />

      {/* Bottom Nav */}
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          paddingHorizontal: 24,
          paddingTop: 10,
          paddingBottom: 25,
          backgroundColor: theme.colors.background,
          // borderTopWidth: 1,
          borderTopColor: theme.colors.border,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        {[
          { label: 'Chats', icon: 'chats' },
          { label: 'Updates', icon: 'updates' },
          { label: 'Communities', icon: 'communities' },
          { label: 'Calls', icon: 'calls' }
        ].map((item, idx) => (
          <TouchableOpacity 
            key={item.label} 
            style={{ 
              alignItems: 'center',
              paddingVertical: 8,
              paddingHorizontal: 12,
              minWidth: 60,
            }}
            activeOpacity={0.7}
            onPress={() => setActiveTab(idx)}
          >
            <SvgIcon 
              name={item.icon as any} 
              size={24} 
              color={activeTab === idx ? '#007AFF' : theme.colors.textSecondary} 
            />
            <Text style={{ 
              color: activeTab === idx ? '#007AFF' : theme.colors.textSecondary, 
              fontSize: 12,
              marginTop: 4,
              fontWeight: activeTab === idx ? '600' : '400'
            }}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* New Chat Button */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 120,
          right: 20,
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: theme.colors.primary,
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
        }}
        onPress={() => setShowNewChatModal(true)}
      >
        <SvgIcon name="new-chats" size={24} color="#ffffff" />
      </TouchableOpacity>

      {/* Transparent Menu Modal */}
      <Modal
        visible={menuOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMenuOpen(false)}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
            paddingTop: 100,
            paddingRight: 20,
          }}
          activeOpacity={1}
          onPress={() => setMenuOpen(false)}
        >
          <View
            style={{
              backgroundColor: theme.colors.surface,
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingVertical: 8,
              width: 200,
              borderWidth: 1,
              borderColor: theme.colors.border,
              elevation: 8,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
            }}
          >
            <MenuItem label="New group" />
            <MenuItem label="New community" />
            <MenuItem label="New broadcast" />
            <MenuItem label="Linked devices" />
            <MenuItem label="Starred" />
            <MenuItem label="Payments" />
            <MenuItem label="Settings" />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* New Chat Modal */}
      <Modal
        visible={showNewChatModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowNewChatModal(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: theme.colors.surface, borderRadius: 12, padding: 20, width: '80%' }}>
            <Text style={{ color: theme.colors.text, fontSize: 18, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>
              New Chat
            </Text>
            <Text style={{ color: theme.colors.textSecondary, textAlign: 'center', marginBottom: 20 }}>
              Start a new conversation
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: theme.colors.primary,
                paddingVertical: 12,
                borderRadius: 8,
                alignItems: 'center',
              }}
              onPress={() => setShowNewChatModal(false)}
            >
              <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>Start Chat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ChatListScreen;