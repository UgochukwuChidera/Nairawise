
'use client'

import * as React from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  isSubscribed: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
  subscribe: () => void;
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isSubscribed, setIsSubscribed] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    try {
      const authStatus = localStorage.getItem('isAuthenticated');
      const subStatus = localStorage.getItem('isSubscribed');
      if (authStatus === 'true') {
        setIsAuthenticated(true);
      }
      if (subStatus === 'true') {
        setIsSubscribed(true);
      }
    } catch (error) {
        console.error("Could not read from local storage", error)
    } finally {
        setIsLoading(false);
    }
  }, []);

  const login = () => {
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('isSubscribed');
    setIsAuthenticated(false);
    setIsSubscribed(false);
  };

  const subscribe = () => {
    localStorage.setItem('isSubscribed', 'true');
    setIsSubscribed(true);
  };
  
  const value = { isAuthenticated, isSubscribed, isLoading, login, logout, subscribe };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
