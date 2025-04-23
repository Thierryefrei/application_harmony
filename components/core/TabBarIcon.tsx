import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

type TabBarIconProps = {
  icon: React.ComponentType<{ size: number; color: string }>;
  color: string;
  size: number;
  focused?: boolean;
};

export default function TabBarIcon({
  icon: Icon,
  color,
  size,
  focused = false,
}: TabBarIconProps) {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { 
          scale: withTiming(focused ? 1.1 : 1, { 
            duration: 200 
          }) 
        }
      ],
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Icon size={size} color={color} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});