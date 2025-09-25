import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SettingsData {
  // AI Model Settings
  defaultModel: string;
  responseTemperature: string;
  maxResponseLength: number;
  streamResponses: boolean;
  
  // Document Processing
  chunkSize: number;
  chunkOverlap: number;
  maxDocumentsRetrieved: string;
  autoIndexDocuments: boolean;
  
  // Interface Settings
  animations: boolean;
  soundEffects: boolean;
  compactMode: boolean;
}

const defaultSettings: SettingsData = {
  defaultModel: 'gemini-2.5-flash-lite',
  responseTemperature: '0.7',
  maxResponseLength: 2048,
  streamResponses: true,
  chunkSize: 1000,
  chunkOverlap: 200,
  maxDocumentsRetrieved: '2',
  autoIndexDocuments: true,
  animations: true,
  soundEffects: false,
  compactMode: false,
};

interface SettingsContextType {
  settings: SettingsData;
  updateSetting: <K extends keyof SettingsData>(key: K, value: SettingsData[K]) => void;
  resetSettings: () => void;
  loadSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<SettingsData>(defaultSettings);

  const loadSettings = () => {
    const savedSettings = localStorage.getItem('rag-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsed });
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  };

  const updateSetting = <K extends keyof SettingsData>(key: K, value: SettingsData[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  // Load settings on mount
  useEffect(() => {
    loadSettings();
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('rag-settings', JSON.stringify(settings));
  }, [settings]);

  const value: SettingsContextType = {
    settings,
    updateSetting,
    resetSettings,
    loadSettings,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
