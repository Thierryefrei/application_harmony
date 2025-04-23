export type Theme = {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    card: string;
    text: string;
    textSecondary: string;
    border: string;
    notification: string;
    success: string;
    warning: string;
    error: string;
  };
  spacing: {
    xs: number;
    s: number;
    m: number;
    l: number;
    xl: number;
    xxl: number;
  };
  borderRadius: {
    xs: number;
    s: number;
    m: number;
    l: number;
    xl: number;
    xxl: number;
  };
};

export const lightTheme: Theme = {
  colors: {
    primary: '#9c27b0',
    secondary: '#6a1b9a',
    accent: '#e91e63',
    background: '#f8f9fa',
    card: '#ffffff',
    text: '#212121',
    textSecondary: '#757575',
    border: '#e0e0e0',
    notification: '#4caf50',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    xs: 2,
    s: 4,
    m: 8,
    l: 12,
    xl: 16,
    xxl: 24,
  },
};

export const darkTheme: Theme = {
  colors: {
    primary: '#bb86fc',
    secondary: '#3700b3',
    accent: '#cf6679',
    background: '#121212',
    card: '#1e1e1e',
    text: '#ffffff',
    textSecondary: '#b0b0b0',
    border: '#2c2c2c',
    notification: '#4caf50',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    xs: 2,
    s: 4,
    m: 8,
    l: 12,
    xl: 16,
    xxl: 24,
  },
};