import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { useState, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedGestureHandler,
  runOnJS,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from '@/hooks/useTranslation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, X, Music, Star, Filter } from 'lucide-react-native';
import { mockProfiles } from '@/data/mockProfiles';
import ProfileCard from '@/components/discover/ProfileCard';
import IconButton from '@/components/core/IconButton';
import { StatusBar } from 'expo-status-bar';
import Button from '@/components/core/Button';
import { router } from 'expo-router';
import { Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.25;

export default function DiscoverScreen() {
  const { colors, isDark } = useTheme();
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);

  const handleSwipeLeft = () => {
    translateX.value = withSpring(-width * 1.5, { damping: 15 }, () => {
      runOnJS(nextCard)();
    });
  };

  const handleSwipeRight = () => {
    translateX.value = withSpring(width * 1.5, { damping: 15 }, () => {
      runOnJS(nextCard)();
    });
  };

  const nextCard = () => {
    setCurrentIndex((prevIndex) => prevIndex + 2);
    setNextIndex((prevIndex) => prevIndex + 2);
    translateX.value = 0;
    translateY.value = 0;
    rotate.value = 0;
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startX = translateX.value;
      context.startY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
      translateY.value = context.startY + event.translationY;
      rotate.value = translateX.value / 10;
    },
    onEnd: (event) => {
      if (translateX.value > SWIPE_THRESHOLD) {
        runOnJS(handleSwipeRight)();
      } else if (translateX.value < -SWIPE_THRESHOLD) {
        runOnJS(handleSwipeLeft)();
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        rotate.value = withSpring(0);
      }
    },
  });

  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate.value}deg` },
      ],
    };
  });

  const animatedNextCardStyle = useAnimatedStyle(() => {
    const scale = withSpring(
      Math.min(1, 0.9 + Math.abs(translateX.value) / (width * 5))
    );
    return {
      transform: [{ scale }],
    };
  });

  const goToFilters = () => {
    router.push('/discover/filters');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          {t('discover.title')}
        </Text>
        <IconButton 
          icon={Filter} 
          color={colors.text} 
          onPress={goToFilters}
          style={[styles.filterButton, { backgroundColor: colors.card }]}
        />
      </View>

      <View style={styles.cardsContainer}>
        {mockProfiles[nextIndex] && (
          <Animated.View style={[styles.cardContainer, animatedNextCardStyle]}>
            <ProfileCard profile={mockProfiles[nextIndex]} isNext />
          </Animated.View>
        )}

        {mockProfiles[currentIndex] && (
          <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View style={[styles.cardContainer, animatedCardStyle]}>
              <ProfileCard profile={mockProfiles[currentIndex]} />
            </Animated.View>
          </PanGestureHandler>
        )}

        {!mockProfiles[currentIndex] && (
          <View style={[styles.emptyStateContainer, { backgroundColor: colors.card }]}>
            <Text style={[styles.emptyStateText, { color: colors.text }]}>
              {t('discover.noMoreProfiles')}
            </Text>
            <Button 
              title={t('discover.refreshProfiles')}
              onPress={() => {
                setCurrentIndex(0);
                setNextIndex(1);
              }}
              style={{ marginTop: 20 }}
            />
          </View>
        )}
      </View>

      {mockProfiles[currentIndex] && (
        <View style={styles.actionButtons}>
          <IconButton
            icon={X}
            onPress={handleSwipeLeft}
            size={30}
            color="#F43F5E"
            style={[styles.actionButton, styles.dislikeButton, { backgroundColor: colors.card }]}
          />
          <IconButton
            icon={Star}
            onPress={() => {}}
            size={30}
            color="#F59E0B"
            style={[styles.actionButton, { backgroundColor: colors.card }]}
          />
          <IconButton
            icon={Music}
            onPress={() => {}}
            size={30}
            color="#60A5FA"
            style={[styles.actionButton, { backgroundColor: colors.card }]}
          />
          <IconButton
            icon={Heart}
            onPress={handleSwipeRight}
            size={30}
            color="#10B981"
            style={[styles.actionButton, styles.likeButton, { backgroundColor: colors.card }]}
          />
        </View>
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
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    position: 'absolute',
    width: width * 0.9,
    height: height * 0.65,
    borderRadius: 20,
    overflow: 'hidden',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dislikeButton: {
    borderWidth: 2,
    borderColor: '#F43F5E',
  },
  likeButton: {
    borderWidth: 2,
    borderColor: '#10B981',
  },
  emptyStateContainer: {
    width: width * 0.9,
    height: height * 0.5,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateText: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  }
});