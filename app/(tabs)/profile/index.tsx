import { StyleSheet, Text, View, Image, ScrollView, Pressable, Switch } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from '@/hooks/useTranslation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { mockUser } from '@/data/mockUser';
import { User, Settings, Moon, Sun, Music, Globe, CreditCard, Lock, LogOut, ChevronRight, CreditCard as Edit, Heart } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '@/components/core/Button';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const { colors, isDark, toggleTheme } = useTheme();
  const { t, changeLanguage, language } = useTranslation();
  const user = mockUser;

  const navigateToSubscription = () => {
    router.push('/profile/subscription');
  };

  const navigateToSettings = () => {
    router.push('/profile/settings');
  };

  const navigateToEditProfile = () => {
    router.push('/profile/edit');
  };

  const MenuOption = ({ icon: Icon, title, onPress, rightElement, showBorder = true }) => (
    <Pressable 
      style={[
        styles.menuOption, 
        { borderBottomColor: colors.border },
        showBorder ? styles.withBorder : null
      ]}
      onPress={onPress}
    >
      <View style={styles.menuOptionLeft}>
        <View style={[styles.menuIconContainer, { backgroundColor: colors.card }]}>
          <Icon size={20} color={colors.primary} />
        </View>
        <Text style={[styles.menuOptionText, { color: colors.text }]}>{title}</Text>
      </View>
      <View style={styles.menuOptionRight}>
        {rightElement || <ChevronRight size={20} color={colors.textSecondary} />}
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            {t('profile.title')}
          </Text>
          <Pressable onPress={navigateToSettings}>
            <Settings size={24} color={colors.text} />
          </Pressable>
        </View>

        <View style={[styles.profileCard, { backgroundColor: colors.card }]}>
          <View style={styles.profileHeader}>
            <Image source={{ uri: user.profilePicture }} style={styles.profilePicture} />
            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, { color: colors.text }]}>{user.name}</Text>
              <Text style={[styles.profileAge, { color: colors.textSecondary }]}>
                {user.age} • {user.location}
              </Text>
              
              <View style={styles.premiumBadge}>
                {user.isPremium ? (
                  <LinearGradient
                    colors={['#FFD700', '#FFA500']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.premiumGradient}
                  >
                    <Text style={styles.premiumText}>{t('profile.premiumBadge')}</Text>
                  </LinearGradient>
                ) : (
                  <Button 
                    title={t('profile.getPremium')} 
                    onPress={navigateToSubscription} 
                    size="small"
                  />
                )}
              </View>
            </View>
          </View>
          
          <Text style={[styles.profileBio, { color: colors.text }]}>{user.bio}</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.text }]}>{user.matches}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                {t('profile.matches')}
              </Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.text }]}>{user.favoriteTracks}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                {t('profile.tracks')}
              </Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.text }]}>{user.concerts}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                {t('profile.concerts')}
              </Text>
            </View>
          </View>
          
          <Button 
            title={t('profile.editProfile')} 
            onPress={navigateToEditProfile} 
            variant="secondary"
            leftIcon={Edit}
            style={styles.editButton}
          />
        </View>

        <View style={styles.musicTastes}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t('profile.musicTaste')}
          </Text>
          <View style={styles.genresContainer}>
            {user.favoriteGenres.map((genre, index) => (
              <View 
                key={index} 
                style={[styles.genreTag, { backgroundColor: colors.card }]}
              >
                <Music size={14} color={colors.primary} style={styles.genreIcon} />
                <Text style={[styles.genreText, { color: colors.text }]}>{genre}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.menuSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t('profile.preferences')}
          </Text>
          
          <View style={[styles.menuContainer, { backgroundColor: colors.card }]}>
            <MenuOption 
              icon={Moon} 
              title={t('profile.darkMode')} 
              onPress={toggleTheme}
              rightElement={
                <Switch
                  value={isDark}
                  onValueChange={toggleTheme}
                  trackColor={{ false: colors.border, true: `${colors.primary}80` }}
                  thumbColor={isDark ? colors.primary : colors.textSecondary}
                />
              }
            />
            
            <MenuOption 
              icon={Globe} 
              title={t('profile.language')} 
              onPress={() => {
                const nextLang = language === 'en' ? 'fr' : 'en';
                changeLanguage(nextLang);
              }}
              rightElement={
                <Text style={{ color: colors.primary, fontFamily: 'Inter-Medium' }}>
                  {language === 'en' ? 'English' : 'Français'}
                </Text>
              }
            />
            
            <MenuOption 
              icon={CreditCard} 
              title={t('profile.subscription')} 
              onPress={navigateToSubscription}
            />
            
            <MenuOption 
              icon={Lock} 
              title={t('profile.privacy')} 
              onPress={() => {}}
            />
            
            <MenuOption 
              icon={LogOut} 
              title={t('profile.logout')} 
              onPress={() => {}}
              showBorder={false}
            />
          </View>
        </View>
      </ScrollView>
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
  profileCard: {
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  profileHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  profileName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    marginBottom: 4,
  },
  profileAge: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 8,
  },
  premiumBadge: {
    alignSelf: 'flex-start',
  },
  premiumGradient: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  premiumText: {
    color: 'white',
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
  },
  profileBio: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingVertical: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  statDivider: {
    width: 1,
    height: '100%',
  },
  editButton: {
    marginTop: 8,
  },
  musicTastes: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    marginBottom: 16,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  genreTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  genreIcon: {
    marginRight: 6,
  },
  genreText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  menuSection: {
    marginHorizontal: 20,
    marginBottom: 32,
  },
  menuContainer: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  menuOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  withBorder: {
    borderBottomWidth: 1,
  },
  menuOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuOptionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  menuOptionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});