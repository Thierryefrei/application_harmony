import { StyleSheet, Text, View, FlatList, Image, Pressable } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from '@/hooks/useTranslation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { mockMatches, mockMessages } from '@/data/mockMatches';
import { Search, Users, Ticket } from 'lucide-react-native';
import { router } from 'expo-router';

export default function MatchesScreen() {
  const { colors, isDark } = useTheme();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'chats' | 'concerts'>('chats');

  const renderMatchItem = ({ item }) => (
    <Pressable 
      style={[styles.matchItem, { backgroundColor: colors.card }]}
      onPress={() => router.push(`/matches/${item.id}`)}
    >
      <Image source={{ uri: item.profilePicture }} style={styles.matchAvatar} />
      <View style={styles.matchInfo}>
        <Text style={[styles.matchName, { color: colors.text }]}>{item.name}</Text>
        <Text style={[styles.matchLastMessage, { color: colors.textSecondary }]} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
      <Text style={[styles.matchTime, { color: colors.textSecondary }]}>{item.lastMessageTime}</Text>
    </Pressable>
  );

  const renderConcertItem = ({ item }) => (
    <Pressable 
      style={[styles.concertItem, { backgroundColor: colors.card }]}
      onPress={() => router.push(`/concerts/${item.id}`)}
    >
      <Image source={{ uri: item.image }} style={styles.concertImage} />
      <View style={styles.concertInfo}>
        <Text style={[styles.concertName, { color: colors.text }]}>{item.name}</Text>
        <Text style={[styles.concertVenue, { color: colors.textSecondary }]}>{item.venue}</Text>
        <Text style={[styles.concertDate, { color: colors.accent }]}>{item.date}</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          {t('matches.title')}
        </Text>
        <Pressable style={styles.searchButton}>
          <Search color={colors.text} size={24} />
        </Pressable>
      </View>

      <View style={styles.tabs}>
        <Pressable 
          style={[
            styles.tab, 
            activeTab === 'chats' && [styles.activeTab, { borderBottomColor: colors.primary }]
          ]}
          onPress={() => setActiveTab('chats')}
        >
          <Users 
            size={18} 
            color={activeTab === 'chats' ? colors.primary : colors.textSecondary} 
            style={styles.tabIcon} 
          />
          <Text 
            style={[
              styles.tabText, 
              { color: activeTab === 'chats' ? colors.primary : colors.textSecondary }
            ]}
          >
            {t('matches.chats')}
          </Text>
        </Pressable>
        <Pressable 
          style={[
            styles.tab, 
            activeTab === 'concerts' && [styles.activeTab, { borderBottomColor: colors.primary }]
          ]}
          onPress={() => setActiveTab('concerts')}
        >
          <Ticket 
            size={18} 
            color={activeTab === 'concerts' ? colors.primary : colors.textSecondary} 
            style={styles.tabIcon} 
          />
          <Text 
            style={[
              styles.tabText, 
              { color: activeTab === 'concerts' ? colors.primary : colors.textSecondary }
            ]}
          >
            {t('matches.concerts')}
          </Text>
        </Pressable>
      </View>

      {activeTab === 'chats' ? (
        <FlatList
          data={mockMatches}
          renderItem={renderMatchItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          data={mockMessages}
          renderItem={renderConcertItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
  },
  searchButton: {
    padding: 8,
  },
  tabs: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginRight: 24,
  },
  activeTab: {
    borderBottomWidth: 2,
  },
  tabIcon: {
    marginRight: 6,
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  listContent: {
    padding: 16,
  },
  matchItem: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  matchAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  matchInfo: {
    flex: 1,
    marginLeft: 12,
  },
  matchName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 4,
  },
  matchLastMessage: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  matchTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginLeft: 8,
  },
  concertItem: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  concertImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  concertInfo: {
    flex: 1,
    marginLeft: 12,
  },
  concertName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 4,
  },
  concertVenue: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 4,
  },
  concertDate: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
});