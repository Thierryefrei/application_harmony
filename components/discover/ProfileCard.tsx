import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';
import { MapPin, Music } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = height * 0.65;

type ProfileCardProps = {
  profile: {
    id: number;
    name: string;
    age: number;
    location: string;
    distance: string;
    bio: string;
    images: string[];
    favoriteGenres: string[];
    favoriteArtists: string[];
  };
  isNext?: boolean;
};

export default function ProfileCard({ profile, isNext = false }: ProfileCardProps) {
  const { colors, isDark } = useTheme();

  return (
    <View style={[styles.card, { opacity: isNext ? 0.8 : 1 }]}>
      <Image source={{ uri: profile.images[0] }} style={styles.image} />
      
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.9)']}
        style={styles.cardGradient}
      />
      
      <View style={styles.cardContent}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{profile.name}, {profile.age}</Text>
          <View style={styles.locationContainer}>
            <MapPin size={16} color="white" style={styles.locationIcon} />
            <Text style={styles.location}>
              {profile.location} • {profile.distance}
            </Text>
          </View>
        </View>
        
        <Text style={styles.bio} numberOfLines={2}>
          {profile.bio}
        </Text>

        <View style={styles.musicTasteContainer}>
          <View style={styles.sectionHeader}>
            <Music size={18} color="white" style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>Music Taste</Text>
          </View>
          
          <View style={styles.genreTags}>
            {profile.favoriteGenres.map((genre, index) => (
              <View 
                key={`genre-${index}`} 
                style={[styles.tag, { backgroundColor: colors.primary + '90' }]}
              >
                <Text style={styles.tagText}>{genre}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.artistsContainer}>
            <Text style={styles.artistsTitle}>Favorite Artists:</Text>
            <Text style={styles.artistsList}>{profile.favoriteArtists.join(', ')}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  cardGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: CARD_HEIGHT * 0.5,
  },
  cardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  nameContainer: {
    marginBottom: 8,
  },
  name: {
    color: 'white',
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    marginRight: 4,
  },
  location: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    opacity: 0.8,
  },
  bio: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 16,
    opacity: 0.9,
  },
  musicTasteContainer: {
    marginTop: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionIcon: {
    marginRight: 8,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  genreTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  artistsContainer: {
    marginTop: 4,
  },
  artistsTitle: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  artistsList: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    opacity: 0.9,
  },
});