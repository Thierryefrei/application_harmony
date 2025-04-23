import { StyleSheet, View } from 'react-native';
import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

export default function Index() {
  const { isAuthenticated } = useAuth();
  
  // Redirect to the appropriate screen based on authentication status
  if (isAuthenticated === null) {
    // Loading state, show nothing until we know authentication state
    return <View style={styles.container} />;
  }
  
  return isAuthenticated ? 
    <Redirect href="/(tabs)/discover" /> : 
    <Redirect href="/login" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});