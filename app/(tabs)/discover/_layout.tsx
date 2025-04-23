import { Stack } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';

export default function DiscoverLayout() {
  const { colors } = useTheme();
  
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background }
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="filters" />
      <Stack.Screen name="[id]" />
    </Stack>
  );
}