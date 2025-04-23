import { Stack } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';

export default function MatchesLayout() {
  const { colors } = useTheme();
  
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background }
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="[id]" />
      <Stack.Screen name="quiz" options={{ presentation: 'modal' }} />
      <Stack.Screen name="concert" options={{ presentation: 'modal' }} />
    </Stack>
  );
}