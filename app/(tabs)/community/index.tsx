import { StyleSheet, Text, View, FlatList, Image, Pressable, TextInput } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from '@/hooks/useTranslation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { mockPosts } from '@/data/mockPosts';
import { Heart, MessageCircle, RefreshCw, Search, TrendingUp } from 'lucide-react-native';
import { router } from 'expo-router';

export default function CommunityScreen() {
  const { colors, isDark } = useTheme();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'forYou' | 'trending'>('forYou');
  const [searchQuery, setSearchQuery] = useState('');

  const renderPostItem = ({ item }) => (
    <Pressable 
      style={[styles.postContainer, { backgroundColor: colors.card }]}
      onPress={() => router.push(`/community/${item.id}`)}
    >
      <View style={styles.postHeader}>
        <Image source={{ uri: item.authorAvatar }} style={styles.authorAvatar} />
        <View>
          <Text style={[styles.authorName, { color: colors.text }]}>{item.authorName}</Text>
          <Text style={[styles.postTime, { color: colors.textSecondary }]}>{item.time}</Text>
        </View>
      </View>
      
      <Text style={[styles.postContent, { color: colors.text }]}>
        {item.content}
      </Text>
      
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.postImage} />
      )}
      
      <View style={styles.postActions}>
        <Pressable style={styles.actionButton}>
          <Heart size={18} color={item.liked ? colors.error : colors.textSecondary} />
          <Text style={[styles.actionText, { color: colors.textSecondary }]}>{item.likes}</Text>
        </Pressable>
        
        <Pressable style={styles.actionButton}>
          <MessageCircle size={18} color={colors.textSecondary} />
          <Text style={[styles.actionText, { color: colors.textSecondary }]}>{item.comments}</Text>
        </Pressable>
        
        <Pressable style={styles.actionButton}>
          <RefreshCw size={18} color={colors.textSecondary} />
          <Text style={[styles.actionText, { color: colors.textSecondary }]}>{item.shares}</Text>
        </Pressable>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          {t('community.title')}
        </Text>
      </View>

      <View style={[styles.searchContainer, { backgroundColor: colors.card }]}>
        <Search size={20} color={colors.textSecondary} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder={t('community.searchPlaceholder')}
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.tabs}>
        <Pressable 
          style={[
            styles.tab, 
            activeTab === 'forYou' && [styles.activeTab, { borderBottomColor: colors.primary }]
          ]}
          onPress={() => setActiveTab('forYou')}
        >
          <Text 
            style={[
              styles.tabText, 
              { color: activeTab === 'forYou' ? colors.primary : colors.textSecondary }
            ]}
          >
            {t('community.forYou')}
          </Text>
        </Pressable>
        <Pressable 
          style={[
            styles.tab, 
            activeTab === 'trending' && [styles.activeTab, { borderBottomColor: colors.primary }]
          ]}
          onPress={() => setActiveTab('trending')}
        >
          <TrendingUp 
            size={18} 
            color={activeTab === 'trending' ? colors.primary : colors.textSecondary} 
            style={styles.tabIcon} 
          />
          <Text 
            style={[
              styles.tabText, 
              { color: activeTab === 'trending' ? colors.primary : colors.textSecondary }
            ]}
          >
            {t('community.trending')}
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={activeTab === 'forYou' ? mockPosts.filter(post => post.forYou) : mockPosts.filter(post => post.trending)}
        renderItem={renderPostItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
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
  postContainer: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  authorName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  postTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  postContent: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  postActions: {
    flexDirection: 'row',
    marginTop: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  actionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginLeft: 6,
  },
});