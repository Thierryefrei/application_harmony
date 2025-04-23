import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type User = {
  id: string;
  email: string;
  name: string;
};

type AuthContextType = {
  isAuthenticated: boolean | null;
  user: User | null;
  login: (credentials: { email: string; password: string }) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: null,
  user: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Simulate loading auth state
    const timer = setTimeout(() => {
      // For demo purposes, check if we have a saved user
      const savedUser = null; // In a real app, would check storage
      if (savedUser) {
        setUser(savedUser);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const login = (credentials: { email: string; password: string }) => {
    // In a real app, this would make an API call
    const fakeUser = {
      id: '1',
      email: credentials.email,
      name: 'Demo User',
    };
    
    setUser(fakeUser);
    setIsAuthenticated(true);
    
    // In a real app, would save to secure storage
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    
    // In a real app, would clear from secure storage
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);