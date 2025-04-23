import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Pause, Play, SkipBack, SkipForward, X } from 'lucide-react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';

type MusicPlayerProps = {
  track: {
    id: number;
    title: string;
    artist: string;
    coverArt: string;
    duration: string;
  };
  isPlaying: boolean;
  onPlayPause: () => void;
  onClose: () => void;
};

export default function MusicPlayer({ 
  track, 
  isPlaying, 
  onPlayPause,
  onClose
}: MusicPlayerProps) {
  const { colors } = useTheme();
  const translateY = useSharedValue(100);
  
  useEffect(() => {
    translateY.value = withTiming(0, { duration: 300 });
    
    return () => {
      translateY.value = withTiming(100, { duration: 200 });
    };
  }, []);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Animated.View 
      style={[
        styles.container, 
        { backgroundColor: colors.card },
        animatedStyle
      ]}
    >
      <View style={styles.handle} />
      
      <View style={styles.content}>
        <Image source={{ uri: track.coverArt }} style={styles.cover} />
        
        <View style={styles.trackInfo}>
          <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
            {track.title}
          </Text>
          <Text style={[styles.artist, { color: colors.textSecondary }]} numberOfLines={1}>
            {track.artist}
          </Text>
        </View>
        
        <View style={styles.controls}>
          <Pressable style={styles.controlButton}>
            <SkipBack size={24} color={colors.text} />
          </Pressable>
          
          <Pressable 
            style={[styles.playPauseButton, { backgroundColor: colors.primary }]}
            onPress={onPlayPause}
          >
            {isPlaying ? (
              <Pause size={24} color="white" />
            ) : (
              <Play size={24} color="white" />
            )}
          </Pressable>
          
          <Pressable style={styles.controlButton}>
            <SkipForward size={24} color={colors.text} />
          </Pressable>
        </View>
        
        <Pressable style={styles.closeButton} onPress={onClose}>
          <X size={20} color={colors.textSecondary} />
        </Pressable>
      </View>

      <View style={[styles.progressContainer, { backgroundColor: colors.border }]}>
        <View style={[styles.progress, { backgroundColor: colors.primary, width: '30%' }]} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  handle: {
    width: 36,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#00000020',
    alignSelf: 'center',
    marginBottom: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  cover: {
    width: 48,
    height: 48,
    borderRadius: 4,
  },
  trackInfo: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 2,
  },
  artist: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    padding: 8,
  },
  playPauseButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  closeButton: {
    padding: 8,
    marginLeft: 8,
  },
  progressContainer: {
    height: 2,
    marginTop: 8,
  },
  progress: {
    height: '100%',
  },
});