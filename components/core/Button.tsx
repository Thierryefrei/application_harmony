import { StyleSheet, Text, Pressable, ActivityIndicator, View } from 'react-native';
import { ReactNode } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: object;
  leftIcon?: React.ComponentType<{ size: number; color: string }>;
  icon?: ReactNode;
};

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  leftIcon: LeftIcon,
  icon,
}: ButtonProps) {
  const { colors } = useTheme();
  
  const getBackgroundColor = () => {
    if (disabled) return `${colors.textSecondary}40`;
    
    switch (variant) {
      case 'primary':
        return colors.primary;
      case 'secondary':
        return colors.card;
      case 'outline':
        return 'transparent';
      default:
        return colors.primary;
    }
  };
  
  const getTextColor = () => {
    if (disabled) return colors.textSecondary;
    
    switch (variant) {
      case 'primary':
        return 'white';
      case 'secondary':
        return colors.text;
      case 'outline':
        return colors.primary;
      default:
        return 'white';
    }
  };
  
  const getBorderColor = () => {
    if (disabled) return `${colors.textSecondary}40`;
    
    switch (variant) {
      case 'outline':
      case 'secondary':
        return colors.border;
      default:
        return 'transparent';
    }
  };
  
  const getHeight = () => {
    switch (size) {
      case 'small':
        return 36;
      case 'large':
        return 56;
      default:
        return 48;
    }
  };
  
  const getFontSize = () => {
    switch (size) {
      case 'small':
        return 14;
      case 'large':
        return 18;
      default:
        return 16;
    }
  };

  return (
    <Pressable
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          height: getHeight(),
        },
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'primary' ? 'white' : colors.primary} 
          size="small" 
        />
      ) : (
        <View style={styles.contentContainer}>
          {LeftIcon && <LeftIcon size={size === 'small' ? 16 : 20} color={getTextColor()} />}
          {icon}
          <Text
            style={[
              styles.title,
              {
                color: getTextColor(),
                fontSize: getFontSize(),
                marginLeft: (LeftIcon || icon) ? 8 : 0,
              },
            ]}
          >
            {title}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  disabled: {
    opacity: 0.6,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});