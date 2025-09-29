import React, { useMemo, useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

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
  { id: '5', name: 'Nemis 🐶', lastMessage: 'Gaind', time: 'Yesterday', unread: true },
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
  const data = useMemo(() => sampleChats, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Header */}
      <View style={{ paddingHorizontal: 16, paddingBottom: 8, backgroundColor: theme.colors.background, marginTop: 50 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', height: 44, paddingBottom: 10 }}>
          <Text style={{ color: theme.colors.text, fontSize: 22, fontWeight: '700', flex: 1 }}>TalkWave</Text>
          <TouchableOpacity style={{ marginRight: 16 }}>
            <Text style={{ color: theme.colors.textSecondary }}>⌁</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginRight: 16 }}>
            <Text style={{ color: theme.colors.textSecondary }}>📷</Text>
          </TouchableOpacity>
          <View>
            <TouchableOpacity onPress={() => setMenuOpen((v) => !v)}>
              <Text style={{ color: theme.colors.textSecondary, fontSize: 20 }}>⋮</Text>
            </TouchableOpacity>
            {menuOpen ? (
              <View
                style={{
                  position: 'absolute',
                  top: 28,
                  right: 0,
                  backgroundColor: theme.colors.surface,
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  width: 200,
                  borderWidth: 1,
                  borderColor: theme.colors.border,
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
            ) : null}
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
          <Text style={{ color: theme.colors.textSecondary, marginRight: 8 }}>🔍</Text>
          <TextInput
            placeholder="Ask Meta AI or Search"
            placeholderTextColor={theme.colors.textSecondary}
            style={{ flex: 1, color: theme.colors.text, paddingVertical: 10 }}
          />
        </View>

        {/* Pills */}
        <View style={{ flexDirection: 'row', marginTop: 12 }}>
          <Pill label="All" active />
          <Pill label="Unread" />
          <Pill label="Favorites" />
          <Pill label="Groups" />
          <Pill label="Communities" />
          <Pill label="Home" />
        </View>

        {/* Archived */}
        <View style={{ marginTop: 12, flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: theme.colors.textSecondary, marginRight: 8 }}>🗂️</Text>
          <Text style={{ color: theme.colors.textSecondary }}>Archived</Text>
          <View style={{ marginLeft: 6, backgroundColor: theme.colors.surface, paddingHorizontal: 6, borderRadius: 8 }}>
            <Text style={{ color: theme.colors.textSecondary, fontSize: 12 }}>11</Text>
          </View>
        </View>
      </View>

      {/* List */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 80 }}
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: theme.colors.border }} />
        )}
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
          paddingBottom: 35,
          backgroundColor: theme.colors.background,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        {['Chats', 'Updates', 'Communities', 'Calls'].map((label, idx) => (
          <View key={label} style={{ alignItems: 'center' }}>
            <Text style={{ color: idx === 0 ? theme.colors.primary : theme.colors.textSecondary }}>●</Text>
            <Text style={{ color: idx === 0 ? theme.colors.primary : theme.colors.textSecondary, fontSize: 12 }}>{label}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default ChatListScreen;


