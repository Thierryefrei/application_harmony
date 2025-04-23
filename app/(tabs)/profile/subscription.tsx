import { StyleSheet, Text, View, ScrollView, Pressable, Image } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from '@/hooks/useTranslation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ArrowLeft, Check, Crown, Music, Ticket, Zap } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '@/components/core/Button';
import { router } from 'expo-router';

const subscriptionPlans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    billing: 'free',
    features: ['10 swipes per day', 'Basic matching', 'Limited messaging'],
    popular: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 9.99,
    billing: 'month',
    features: [
      'Unlimited swipes',
      'See who likes you',
      'Advanced filters',
      'Unlimited messaging',
      'Ad-free experience',
    ],
    popular: true,
  },
  {
    id: 'vip',
    name: 'VIP',
    price: 24.99,
    billing: 'month',
    features: [
      'Unlimited swipes',
      'See who likes you',
      'Advanced filters',
      'Unlimited messaging',
      'Ad-free experience',
      '10% discount on concert tickets',
      'Exclusive concert pre-sales',
      'Priority customer support',
    ],
    popular: false,
  },
];

export default function SubscriptionScreen() {
  const { colors, isDark } = useTheme();
  const { t } = useTranslation();
  const [selectedPlan, setSelectedPlan] = useState('premium');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          {t('subscription.title')}
        </Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.heroSection}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg' }} 
            style={styles.heroImage} 
          />
          <LinearGradient
            colors={['transparent', colors.background]}
            style={styles.heroGradient}
          />
          <View style={styles.heroContent}>
            <Crown size={28} color="gold" style={styles.heroIcon} />
            <Text style={[styles.heroTitle, { color: colors.text }]}>
              {t('subscription.upgradeTitle')}
            </Text>
            <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}>
              {t('subscription.upgradeSubtitle')}
            </Text>
          </View>
        </View>

        <View style={styles.plansContainer}>
          {subscriptionPlans.map((plan) => (
            <Pressable
              key={plan.id}
              style={[
                styles.planCard,
                { 
                  backgroundColor: colors.card,
                  borderColor: selectedPlan === plan.id ? colors.primary : colors.border,
                },
                selectedPlan === plan.id && styles.selectedPlan,
                plan.popular && styles.popularPlan,
              ]}
              onPress={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <View style={[styles.popularBadge, { backgroundColor: colors.primary }]}>
                  <Text style={styles.popularText}>{t('subscription.mostPopular')}</Text>
                </View>
              )}
              
              <View style={styles.planHeader}>
                <Text style={[styles.planName, { color: colors.text }]}>
                  {plan.name}
                </Text>
                <View style={styles.priceContainer}>
                  {plan.price > 0 && (
                    <Text style={[styles.currencySymbol, { color: colors.text }]}>€</Text>
                  )}
                  <Text style={[styles.planPrice, { color: colors.text }]}>
                    {plan.price === 0 ? t('subscription.free') : plan.price}
                  </Text>
                  {plan.price > 0 && (
                    <Text style={[styles.planBilling, { color: colors.textSecondary }]}>
                      /{t(`subscription.${plan.billing}`)}
                    </Text>
                  )}
                </View>
              </View>

              <View style={styles.featuresContainer}>
                {plan.features.map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <Check size={16} color={colors.success} style={styles.featureIcon} />
                    <Text style={[styles.featureText, { color: colors.text }]}>
                      {feature}
                    </Text>
                  </View>
                ))}
              </View>
            </Pressable>
          ))}
        </View>

        <View style={styles.benefitsSection}>
          <Text style={[styles.benefitsSectionTitle, { color: colors.text }]}>
            {t('subscription.premiumBenefits')}
          </Text>
          
          <View style={styles.benefitsGrid}>
            <View style={[styles.benefitCard, { backgroundColor: colors.card }]}>
              <View style={[styles.benefitIconContainer, { backgroundColor: `${colors.primary}20` }]}>
                <Zap size={24} color={colors.primary} />
              </View>
              <Text style={[styles.benefitTitle, { color: colors.text }]}>
                {t('subscription.unlimitedSwipes')}
              </Text>
              <Text style={[styles.benefitDescription, { color: colors.textSecondary }]}>
                {t('subscription.unlimitedSwipesDesc')}
              </Text>
            </View>
            
            <View style={[styles.benefitCard, { backgroundColor: colors.card }]}>
              <View style={[styles.benefitIconContainer, { backgroundColor: `${colors.success}20` }]}>
                <Music size={24} color={colors.success} />
              </View>
              <Text style={[styles.benefitTitle, { color: colors.text }]}>
                {t('subscription.musicFilters')}
              </Text>
              <Text style={[styles.benefitDescription, { color: colors.textSecondary }]}>
                {t('subscription.musicFiltersDesc')}
              </Text>
            </View>
            
            <View style={[styles.benefitCard, { backgroundColor: colors.card }]}>
              <View style={[styles.benefitIconContainer, { backgroundColor: `${colors.warning}20` }]}>
                <Ticket size={24} color={colors.warning} />
              </View>
              <Text style={[styles.benefitTitle, { color: colors.text }]}>
                {t('subscription.concertPerks')}
              </Text>
              <Text style={[styles.benefitDescription, { color: colors.textSecondary }]}>
                {t('subscription.concertPerksDesc')}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={[styles.footer, { backgroundColor: colors.card }]}>
        <Button 
          title={
            selectedPlan === 'free' 
              ? t('subscription.continueFree') 
              : t('subscription.subscribe', { 
                  plan: subscriptionPlans.find(p => p.id === selectedPlan)?.name 
                })
          }
          onPress={() => {}}
          style={styles.subscribeButton}
        />
        <Text style={[styles.termsText, { color: colors.textSecondary }]}>
          {t('subscription.termsNotice')}
        </Text>
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  placeholder: {
    width: 40,
  },
  content: {
    paddingBottom: 120,
  },
  heroSection: {
    height: 200,
    marginBottom: 24,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  heroGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    alignItems: 'center',
  },
  heroIcon: {
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  plansContainer: {
    marginHorizontal: 20,
    marginBottom: 32,
  },
  planCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    position: 'relative',
    overflow: 'hidden',
  },
  selectedPlan: {
    borderWidth: 2,
  },
  popularPlan: {
    borderWidth: 2,
  },
  popularBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderBottomLeftRadius: 12,
  },
  popularText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  planHeader: {
    marginBottom: 16,
  },
  planName: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  currencySymbol: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginRight: 4,
  },
  planPrice: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
  },
  planBilling: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginBottom: 4,
    marginLeft: 2,
  },
  featuresContainer: {
    marginTop: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureIcon: {
    marginRight: 8,
  },
  featureText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  benefitsSection: {
    marginHorizontal: 20,
  },
  benefitsSectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 16,
  },
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  benefitCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  benefitIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  benefitTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
  },
  benefitDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    lineHeight: 18,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
    elevation: 6,
  },
  subscribeButton: {
    marginBottom: 12,
  },
  termsText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
});