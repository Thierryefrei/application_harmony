import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import { translations } from '@/data/translations';

type I18nContextType = {
  t: (key: string, options?: object) => string;
  language: string;
  changeLanguage: (lang: string) => void;
};

const I18nContext = createContext<I18nContextType>({
  t: (key: string) => key,
  language: 'en',
  changeLanguage: () => {},
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState('en');
  const i18n = new I18n(translations);

  useEffect(() => {
    // Get device language
    const locale = Localization.getLocales()[0];
    const deviceLanguage = locale?.languageCode || 'en';
    
    // Check if we support this language
    if (translations[deviceLanguage]) {
      setLanguage(deviceLanguage);
    }
  }, []);

  // Set language and fallback
  i18n.locale = language;
  i18n.enableFallback = true;
  i18n.defaultLocale = 'en';

  const t = (key: string, options?: object) => {
    return i18n.t(key, options);
  };

  const changeLanguage = (lang: string) => {
    if (translations[lang]) {
      setLanguage(lang);
    }
  };

  return (
    <I18nContext.Provider value={{ t, language, changeLanguage }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18nContext = () => useContext(I18nContext);