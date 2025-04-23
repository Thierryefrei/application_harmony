import { StyleSheet, Text, View, Pressable, Image, ScrollView } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from '@/hooks/useTranslation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, Calendar, MapPin, Clock, Users, Ticket } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import Button from '@/components/core/Button';

// Mock concert data - in a real app, this would come from an API
const mockConcert = {
  id: 1,
  title: "Coldplay World Tour",
  venue: "Stade de France",
  location: "Paris, France",
  date: "July 12, 2025",
  time: "20:00",
  image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg",
  description: "Experience the magic of Coldplay's Music Of The Spheres World Tour. An unforgettable evening of music, lights, and sustainable concert production.",
  price: {
    regular: "85€",
    vip: "200€"
  },
  availableTickets: 245
};

export default function ConcertScreen() {
  const { colors, isDark } = useTheme();
  const { t } = useTranslation();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="white" />
        </Pressable>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: mockConcert.image }} style={styles.image} />
          <LinearGradient
            colors={['transparent', colors.background]}
            style={styles.gradient}
          />
        </View>

        <View style={styles.details}>
          <Text style={[styles.title, { color: colors.text }]}>
            {mockConcert.title}
          </Text>

          <View style={styles.infoContainer}>
            <View style={[styles.infoItem, { backgroundColor: colors.card }]}>
              <Calendar size={20} color={colors.primary} style={styles.infoIcon} />
              <Text style={[styles.infoText, { color: colors.text }]}>{mockConcert.date}</Text>
            </View>
            
            <View style={[styles.infoItem, { backgroundColor: colors.card }]}>
              <Clock size={20} color={colors.primary} style={styles.infoIcon} />
              <Text style={[styles.infoText, { color: colors.text }]}>{mockConcert.time}</Text>
            </View>
          </View>

          <View style={[styles.venueContainer, { backgroundColor: colors.card }]}>
            <MapPin size={20} color={colors.primary} style={styles.venueIcon} />
            <View>
              <Text style={[styles.venueName, { color: colors.text }]}>{mockConcert.venue}</Text>
              <Text style={[styles.venueLocation, { color: colors.textSecondary }]}>{mockConcert.location}</Text>
            </View>
          </View>

          <View style={[styles.ticketsContainer, { backgroundColor: colors.card }]}>
            <View style={styles.ticketHeader}>
              <Text style={[styles.ticketsTitle, { color: colors.text }]}>Available Tickets</Text>
              <View style={styles.ticketCount}>
                <Users size={16} color={colors.success} style={styles.ticketIcon} />
                <Text style={[styles.ticketCountText, { color: colors.success }]}>
                  {mockConcert.availableTickets} left
                </Text>
              </View>
            </View>

            <View style={styles.ticketTypes}>
              <Pressable 
                style={[styles.ticketType, { backgroundColor: colors.background }]}
              >
                <View style={styles.ticketTypeHeader}>
                  <Text style={[styles.ticketTypeName, { color: colors.text }]}>Regular</Text>
                  <Text style={[styles.ticketTypePrice, { color: colors.primary }]}>
                    {mockConcert.price.regular}
                  </Text>
                </View>
                <Text style={[styles.ticketTypeDesc, { color: colors.textSecondary }]}>
                  Standard seating with good view
                </Text>
              </Pressable>

              <Pressable 
                style={[styles.ticketType, { backgroundColor: colors.background }]}
              >
                <View style={styles.ticketTypeHeader}>
                  <Text style={[styles.ticketTypeName, { color: colors.text }]}>VIP</Text>
                  <Text style={[styles.ticketTypePrice, { color: colors.primary }]}>
                    {mockConcert.price.vip}
                  </Text>
                </View>
                <Text style={[styles.ticketTypeDesc, { color: colors.textSecondary }]}>
                  Premium seating with exclusive perks
                </Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.description}>
            <Text style={[styles.descriptionTitle, { color: colors.text }]}>About Event</Text>
            <Text style={[styles.descriptionText, { color: colors.textSecondary }]}>
              {mockConcert.description}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: colors.card }]}>
        <Button 
          title={t('concert.bookTickets')} 
          onPress={() => {}}
          leftIcon={Ticket}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    padding: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    height: 300,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  details: {
    flex: 1,
    padding: 20,
    marginTop: -40,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginRight: 12,
  },
  infoIcon: {
    marginRight: 8,
  },
  infoText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  venueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  venueIcon: {
    marginRight: 12,
  },
  venueName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 4,
  },
  venueLocation: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  ticketsContainer: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  ticketsTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  ticketCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ticketIcon: {
    marginRight: 4,
  },
  ticketCountText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  ticketTypes: {
    gap: 12,
  },
  ticketType: {
    padding: 16,
    borderRadius: 12,
  },
  ticketTypeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ticketTypeName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  ticketTypePrice: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  ticketTypeDesc: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  description: {
    marginBottom: 100,
  },
  descriptionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 22,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
});