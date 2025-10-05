import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, FlatList, Image, Modal } from 'react-native';
import * as Contacts from 'expo-contacts';
import { useTheme } from '../contexts/ThemeContext';
import SvgIcon from '../components/SvgIcon';

type DeviceContact = Contacts.Contact;

type StaticAction = {
  key: string;
  label: string;
  icon: 'communities' | 'chats' | 'updates' | 'add-group' | 'add-contact' | 'community' | 'ai-chat';
  onPress?: () => void;
  rightAccessory?: React.ReactNode;
};

const ACCENT_BLUE = '#007AFF';

const SelectContactScreen: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
  const { theme } = useTheme();
  const [query, setQuery] = useState('');
  const [contacts, setContacts] = useState<DeviceContact[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [permissionAsked, setPermissionAsked] = useState(false);

  const loadContacts = useCallback(async () => {
    try {
      const { status } = await Contacts.requestPermissionsAsync();
      setPermissionAsked(true);
      if (status !== Contacts.PermissionStatus.GRANTED) {
        setContacts([]);
        return;
      }
      const { data } = await Contacts.getContactsAsync({ fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers, Contacts.Fields.Image] });
      setContacts(data || []);
    } catch (err) {
      setContacts([]);
    }
  }, []);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  const totalContacts = contacts.length;

  const filteredContacts = useMemo(() => {
    if (!query.trim()) return contacts;
    const q = query.toLowerCase();
    return contacts.filter(c => {
      const name = (c.name || '').toLowerCase();
      const phone = (c.phoneNumbers?.[0]?.number || '').toLowerCase();
      return name.includes(q) || phone.includes(q);
    });
  }, [contacts, query]);

  const staticItems: StaticAction[] = useMemo(() => [
    { key: 'new-group', label: 'New group', icon: 'add-group', onPress: () => {} },
    { key: 'new-contact', label: 'New contact', icon: 'add-contact', onPress: () => {} , rightAccessory: (
      <View style={{ paddingHorizontal: 6 }}>
        {/* placeholder for QR small icon if needed */}
      </View>
    )},
    { key: 'new-community', label: 'New community', icon: 'communities', onPress: () => {} },
    { key: 'chat-ais', label: 'Chat with AIs', icon: 'ai-chat', onPress: () => {} },
  ], []);

  const openChat = (contact: DeviceContact) => {
    console.log('openChat:', contact?.name, contact?.phoneNumbers?.[0]?.number);
  };

  const renderStaticItem = ({ item }: { item: StaticAction }) => {
    const pngIcons = ['add-group', 'add-contact', 'ai-chat'];
    const isPngIcon = pngIcons.includes(item.icon);
    
    const getIconSource = () => {
      switch (item.icon) {
        case 'add-group':
          return require('../../assets/icons/add-group.png');
        case 'add-contact':
          return require('../../assets/icons/add-contact.png');
        case 'ai-chat':
          return require('../../assets/icons/ai-chat.png');
        default:
          return null;
      }
    };

    return (
      <TouchableOpacity
        onPress={item.onPress}
        style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12 }}
        activeOpacity={0.7}
      >
        <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: theme.colors.primary, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
          {isPngIcon ? (
            <Image source={getIconSource()} style={{ width: 22, height: 22, tintColor: theme.colors.background }} />
          ) : (
            <SvgIcon 
              name={item.icon as any} 
              size={22} 
              color={theme.colors.background} 
            />
          )}
        </View>
        <Text style={{ color: theme.colors.text, fontSize: 16, flex: 1 }}>{item.label}</Text>
        {item.rightAccessory}
      </TouchableOpacity>
    );
  };

  const renderContact = ({ item }: { item: DeviceContact }) => {
    const initials = (item.name || '')
      .split(' ')
      .map(s => s.charAt(0))
      .join('')
      .slice(0, 2)
      .toUpperCase();
    const phone = item.phoneNumbers?.[0]?.number || '';

    return (
      <TouchableOpacity onPress={() => openChat(item)} activeOpacity={0.7} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
        {item.imageAvailable && item.image ? (
          <Image source={{ uri: item.image.uri as any }} style={{ width: 48, height: 48, borderRadius: 24, marginRight: 12 }} />
        ) : (
          <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: theme.colors.surface, alignItems: 'center', justifyContent: 'center', marginRight: 12, borderWidth: 1, borderColor: theme.colors.border }}>
            <Text style={{ color: theme.colors.textSecondary, fontWeight: '700' }}>{initials || 'U'}</Text>
          </View>
        )}
        <View style={{ flex: 1 }}>
          <Text style={{ color: theme.colors.text, fontSize: 16 }} numberOfLines={1}>{item.name || phone || 'Unknown'}</Text>
          <Text style={{ color: theme.colors.textSecondary, fontSize: 12 }} numberOfLines={1}>{phone || 'Hey there! I am using TalkWave'}</Text>
        </View>
      </TouchableOpacity>
    );
  };

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
          <TouchableOpacity onPress={onBack} activeOpacity={0.7} style={{ padding: 8, marginRight: 6 }}>
            <SvgIcon name="arrow-left" size={20} color={theme.colors.text} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={{ color: theme.colors.text, fontSize: 18, fontWeight: '700' }}>Select contact</Text>
            <Text style={{ color: theme.colors.textSecondary, fontSize: 12 }}>{totalContacts} contacts</Text>
          </View>
          <TouchableOpacity onPress={() => setMenuOpen(true)} activeOpacity={0.7} style={{ padding: 8 }}>
            <SvgIcon name={'dots'} size={22} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>
        {/* Search */}
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.surface, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8, marginTop: 8, borderWidth: 1, borderColor: theme.colors.border }}>
          <SvgIcon name={'search'} size={18} color={theme.colors.textSecondary} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder={'Search name or number'}
            placeholderTextColor={theme.colors.textSecondary}
            style={{ flex: 1, color: theme.colors.text, paddingLeft: 8 }}
          />
        </View>
      </View>

      {/* Content */}
      <FlatList
        data={filteredContacts}
        keyExtractor={(item, index) => `contact-${index}`}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 5, paddingBottom: 40 }}
        ListHeaderComponent={
          <View>
            <FlatList
              data={staticItems}
              keyExtractor={(i) => i.key}
              renderItem={renderStaticItem}
              ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: theme.colors.border }} />}
            />
            <View style={{ height: 12 }} />
            <Text style={{ color: theme.colors.textSecondary, fontSize: 12, marginVertical: 6 }}>Contacts on TalkWave</Text>
          </View>
        }
        renderItem={renderContact}
        ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: theme.colors.border }} />}
        initialNumToRender={20}
        windowSize={10}
        removeClippedSubviews
        getItemLayout={(_, index) => ({ length: 70, offset: 70 * index, index })}
      />

      {/* Overflow Menu */}
      <Modal visible={menuOpen} transparent animationType="fade" onRequestClose={() => setMenuOpen(false)}>
        <TouchableOpacity style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'flex-end' }} activeOpacity={1} onPress={() => setMenuOpen(false)}>
          <View style={{ marginTop: 60, marginRight: 12, backgroundColor: theme.colors.surface, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 8, width: 220, borderWidth: 1, borderColor: theme.colors.border }}>
            {['Contact settings', 'Invite a friend', 'Contacts', 'Refresh', 'Help'].map((label) => (
              <TouchableOpacity key={label} onPress={() => setMenuOpen(false)} style={{ paddingVertical: 10 }}>
                <Text style={{ color: theme.colors.text, fontSize: 14 }}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default SelectContactScreen;


