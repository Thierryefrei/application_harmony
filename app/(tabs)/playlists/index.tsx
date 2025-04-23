import { StyleSheet, Text, View, FlatList, Image, Pressable, TextInput } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from '@/hooks/useTranslation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { mockPlaylists, mockTracks } from '@/data/mockPlaylists';
import { Search, CirclePlay as PlayCircle, Pause, Plus, Music } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import MusicPlayer from '@/components/playlists/MusicPlayer';

export default function PlaylistsScreen() {
  const { colors, isDark } = useTheme();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const renderPlaylistItem = ({ item }) => (
    <Pressable 
      style={styles.playlistItem}
      onPress={() => router.push(`/playlists/${item.id}`)}
    >
      <Image source={{ uri: item.coverArt }} style={styles.playlistCover} />
      <Text style={[styles.playlistName, { color: colors.text }]} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={[styles.playlistCreator, { color: colors.textSecondary }]} numberOfLines={1}>
        {item.creator}
      </Text>
    </Pressable>
  );

  const renderTrackItem = ({ item }) => (
    <Pressable 
      style={[styles.trackItem, { backgroundColor: colors.card }]}
      onPress={() => {
        setCurrentTrack(item);
        setIsPlaying(true);
      }}
    >
      <Image source={{ uri: item.coverArt }} style={styles.trackCover} />
      <View style={styles.trackInfo}>
        <Text style={[styles.trackTitle, { color: colors.text }]} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={[styles.trackArtist, { color: colors.textSecondary }]} numberOfLines={1}>
          {item.artist}
        </Text>
      </View>
      <Pressable 
        style={styles.playButton}
        onPress={() => {
          if (currentTrack?.id === item.id) {
            setIsPlaying(!isPlaying);
          } else {
            setCurrentTrack(item);
            setIsPlaying(true);
          }
        }}
      >
        {currentTrack?.id === item.id && isPlaying ? (
          <Pause size={24} color={colors.primary} />
        ) : (
          <PlayCircle size={24} color={colors.primary} />
        )}
      </Pressable>
    </Pressable>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      <LinearGradient
        colors={[isDark ? '#4a148c' : '#9c27b0', colors.background]}
        style={styles.gradientHeader}
      >
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: isDark ? 'white' : 'white' }]}>
            {t('playlists.title')}
          </Text>
          <Pressable style={styles.addButton}>
            <Plus size={24} color={isDark ? 'white' : 'white'} />
          </Pressable>
        </View>
        
        <View style={[styles.searchContainer, { backgroundColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.3)' }]}>
          <Search size={20} color={'white'} />
          <TextInput
            style={[styles.searchInput, { color: 'white' }]}
            placeholder={t('playlists.searchPlaceholder')}
            placeholderTextColor={'rgba(255,255,255,0.7)'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </LinearGradient>

      <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 16 }]}>
        {t('playlists.yourPlaylists')}
      </Text>
      
      <FlatList
        data={mockPlaylists}
        renderItem={renderPlaylistItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.playlistsContainer}
      />
      
      <View style={styles.tracksHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {t('playlists.recentlyPlayed')}
        </Text>
        <Pressable>
          <Text style={[styles.seeAllText, { color: colors.primary }]}>
            {t('common.seeAll')}
          </Text>
        </Pressable>
      </View>
      
      <FlatList
        data={mockTracks}
        renderItem={renderTrackItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.tracksContainer}
        showsVerticalScrollIndicator={false}
      />
      
      {currentTrack && (
        <MusicPlayer 
          track={currentTrack} 
          isPlaying={isPlaying} 
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onClose={() => setCurrentTrack(null)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientHeader: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
  },
  addButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  playlistsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  playlistItem: {
    marginRight: 16,
    width: 140,
  },
  playlistCover: {
    width: 140,
    height: 140,
    borderRadius: 8,
    marginBottom: 8,
  },
  playlistName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    marginBottom: 4,
  },
  playlistCreator: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  tracksHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  seeAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  tracksContainer: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  trackCover: {
    width: 56,
    height: 56,
    borderRadius: 4,
  },
  trackInfo: {
    flex: 1,
    marginLeft: 12,
  },
  trackTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 4,
  },
  trackArtist: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  playButton: {
    padding: 8,
  },
});