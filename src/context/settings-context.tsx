"use client"

import * as React from 'react';
import type { SettingsContextType } from '@/lib/types';

export const SettingsContext = React.createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [showMonetaryValues, setShowMonetaryValues] = React.useState(true);

  const toggleMonetaryValues = () => {
    setShowMonetaryValues(prev => !prev);
  };
  
  return (
    <SettingsContext.Provider value={{ showMonetaryValues, toggleMonetaryValues }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = React.useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
