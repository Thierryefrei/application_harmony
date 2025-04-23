import { StyleSheet, Text, View, TextInput, Pressable, Image } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from '@/hooks/useTranslation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Eye, EyeOff, Music } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '@/components/core/Button';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginScreen() {
  const { colors, isDark } = useTheme();
  const { t } = useTranslation();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      login({ email, password });
      setLoading(false);
      router.replace('/(tabs)/discover');
    }, 1000);
  };

  const navigateToSignup = () => {
    router.push('/signup');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      <LinearGradient
        colors={[isDark ? '#4a148c80' : '#9c27b080', 'transparent']}
        style={styles.gradient}
      />
      
      <View style={styles.logoContainer}>
        <View style={[styles.logoCircle, { backgroundColor: colors.primary }]}>
          <Music size={32} color="white" />
        </View>
        <Text style={[styles.appName, { color: colors.text }]}>Harmony</Text>
        <Text style={[styles.tagline, { color: colors.textSecondary }]}>
          {t('auth.tagline')}
        </Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={[styles.formTitle, { color: colors.text }]}>
          {t('auth.welcomeBack')}
        </Text>
        
        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: colors.text }]}>
            {t('auth.email')}
          </Text>
          <TextInput
            style={[
              styles.input, 
              { 
                backgroundColor: colors.card,
                color: colors.text,
                borderColor: colors.border,
              }
            ]}
            placeholder={t('auth.emailPlaceholder')}
            placeholderTextColor={colors.textSecondary}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: colors.text }]}>
            {t('auth.password')}
          </Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[
                styles.input, 
                styles.passwordInput,
                { 
                  backgroundColor: colors.card,
                  color: colors.text,
                  borderColor: colors.border,
                }
              ]}
              placeholder={t('auth.passwordPlaceholder')}
              placeholderTextColor={colors.textSecondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <Pressable 
              style={styles.passwordToggle}
              onPress={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={20} color={colors.textSecondary} />
              ) : (
                <Eye size={20} color={colors.textSecondary} />
              )}
            </Pressable>
          </View>
          <Pressable style={styles.forgotPassword}>
            <Text style={[styles.forgotPasswordText, { color: colors.primary }]}>
              {t('auth.forgotPassword')}
            </Text>
          </Pressable>
        </View>
        
        <Button 
          title={t('auth.login')} 
          onPress={handleLogin}
          style={styles.loginButton}
          loading={loading}
        />
        
        <View style={styles.divider}>
          <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
          <Text style={[styles.dividerText, { color: colors.textSecondary }]}>
            {t('auth.or')}
          </Text>
          <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
        </View>
        
        <Button 
          title={t('auth.loginWithSpotify')} 
          onPress={() => {}}
          variant="secondary"
          style={styles.spotifyButton}
          icon={
            <Image 
              source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1982px-Spotify_icon.svg.png' }} 
              style={styles.spotifyIcon} 
            />
          }
        />
      </View>

      <View style={styles.signupContainer}>
        <Text style={[styles.signupText, { color: colors.textSecondary }]}>
          {t('auth.dontHaveAccount')}
        </Text>
        <Pressable onPress={navigateToSignup}>
          <Text style={[styles.signupLink, { color: colors.primary }]}>
            {t('auth.signup')}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  appName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    marginBottom: 8,
  },
  tagline: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  formContainer: {
    marginBottom: 32,
  },
  formTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    borderWidth: 1,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 50,
  },
  passwordToggle: {
    position: 'absolute',
    right: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  forgotPasswordText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  loginButton: {
    marginTop: 16,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    paddingHorizontal: 16,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  spotifyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spotifyIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  signupText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginRight: 4,
  },
  signupLink: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
});