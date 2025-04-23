import { StyleSheet, Pressable, ViewStyle } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

type IconButtonProps = {
  icon: React.ComponentType<{ size: number; color: string }>;
  onPress: () => void;
  color?: string;
  size?: number;
  style?: ViewStyle;
  disabled?: boolean;
};

export default function IconButton({
  icon: Icon,
  onPress,
  color,
  size = 24,
  style,
  disabled = false,
}: IconButtonProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      style={[styles.container, style, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
      hitSlop={8}
    >
      <Icon size={size} color={color || colors.text} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
});