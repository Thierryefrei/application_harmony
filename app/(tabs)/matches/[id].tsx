import { StyleSheet, Text, View, Image, TextInput, FlatList, Pressable } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from '@/hooks/useTranslation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ArrowLeft, Send, Gamepad2, Ticket } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { mockMatches } from '@/data/mockMatches';
import Button from '@/components/core/Button';

// Mock messages - in a real app, this would come from a database
const mockMessages = [
  {
    id: 1,
    senderId: 1,
    text: "Hey! I saw we both love indie rock. Have you listened to the new Arctic Monkeys album?",
    timestamp: "10:30",
  },
  {
    id: 2,
    senderId: 2,
    text: "Yes! It's amazing! 'There'd Better Be A Mirrorball' is my favorite track.",
    timestamp: "10:32",
  },
  {
    id: 3,
    senderId: 1,
    text: "Same here! Would you like to go to their concert next month?",
    timestamp: "10:35",
  },
];

export default function ChatScreen() {
  const { colors, isDark } = useTheme();
  const { t } = useTranslation();
  const { id } = useLocalSearchParams();
  const [message, setMessage] = useState('');
  
  const match = mockMatches.find(m => m.id === Number(id));
  
  if (!match) {
    return null;
  }

  const isOwnMessage = (senderId: number) => senderId === 2;

  const renderMessage = ({ item }) => (
    <View 
      style={[
        styles.messageContainer,
        isOwnMessage(item.senderId) ? styles.ownMessage : styles.otherMessage,
      ]}
    >
      <View 
        style={[
          styles.messageBubble,
          { 
            backgroundColor: isOwnMessage(item.senderId) ? colors.primary : colors.card,
          },
        ]}
      >
        <Text 
          style={[
            styles.messageText,
            { 
              color: isOwnMessage(item.senderId) ? 'white' : colors.text,
            },
          ]}
        >
          {item.text}
        </Text>
        <Text 
          style={[
            styles.messageTime,
            { 
              color: isOwnMessage(item.senderId) ? 'rgba(255,255,255,0.7)' : colors.textSecondary,
            },
          ]}
        >
          {item.timestamp}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </Pressable>
        
        <View style={styles.profileInfo}>
          <Image source={{ uri: match.profilePicture }} style={styles.avatar} />
          <Text style={[styles.name, { color: colors.text }]}>{match.name}</Text>
        </View>
        
        <View style={styles.actions}>
          <Button
            title={t('chat.playQuiz')}
            onPress={() => router.push('/matches/quiz')}
            variant="secondary"
            size="small"
            leftIcon={Gamepad2}
            style={styles.actionButton}
          />
          <Button
            title={t('chat.concert')}
            onPress={() => router.push('/matches/concert')}
            variant="secondary"
            size="small"
            leftIcon={Ticket}
            style={styles.actionButton}
          />
        </View>
      </View>

      <FlatList
        data={mockMessages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.messagesList}
        inverted
      />

      <View style={[styles.inputContainer, { backgroundColor: colors.card }]}>
        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholder={t('chat.messagePlaceholder')}
          placeholderTextColor={colors.textSecondary}
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <Pressable 
          style={[styles.sendButton, { backgroundColor: colors.primary }]}
          onPress={() => setMessage('')}
        >
          <Send size={20} color="white" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    padding: 8,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  name: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    paddingHorizontal: 12,
  },
  messagesList: {
    padding: 16,
  },
  messageContainer: {
    marginVertical: 4,
    maxWidth: '80%',
  },
  ownMessage: {
    alignSelf: 'flex-end',
  },
  otherMessage: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    borderRadius: 16,
    padding: 12,
  },
  messageText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  messageTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});