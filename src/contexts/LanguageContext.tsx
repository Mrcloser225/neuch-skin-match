
import React, { createContext, useContext, useState, useEffect } from 'react';
import enTranslations from '../translations/en';
import esTranslations from '../translations/es';
import frTranslations from '../translations/fr';

// Define available languages and their labels
export const LANGUAGES = {
  en: { label: "English", nativeName: "English" },
  es: { label: "Spanish", nativeName: "Español" },
  fr: { label: "French", nativeName: "Français" },
  de: { label: "German", nativeName: "Deutsch" },
  zh: { label: "Chinese", nativeName: "中文" },
  ja: { label: "Japanese", nativeName: "日本語" },
  ko: { label: "Korean", nativeName: "한국어" },
  ar: { label: "Arabic", nativeName: "العربية" },
  hi: { label: "Hindi", nativeName: "हिन्दी" },
  pt: { label: "Portuguese", nativeName: "Português" },
  ru: { label: "Russian", nativeName: "Русский" },
  tr: { label: "Turkish", nativeName: "Türkçe" },
  // Additional languages can be added here
};

// Available translations
const translationFiles: Record<string, Record<string, string>> = {
  en: enTranslations,
  es: esTranslations,
  fr: frTranslations,
  // Add more languages as they become available
};

// Type for available language codes
export type LanguageCode = keyof typeof LANGUAGES;

// Context interface
interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  isRtl: boolean;
}

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
  isRtl: false,
});

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

// Provider component
export const LanguageProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  // Get browser language or use english as default
  const getBrowserLanguage = (): LanguageCode => {
    const browserLang = navigator.language.split('-')[0];
    return Object.keys(LANGUAGES).includes(browserLang) 
      ? browserLang as LanguageCode 
      : 'en';
  };

  // Initialize with browser language or stored preference
  const [language, setLanguage] = useState<LanguageCode>(() => {
    const stored = localStorage.getItem('neuch-language');
    return (stored && Object.keys(LANGUAGES).includes(stored)) 
      ? stored as LanguageCode 
      : getBrowserLanguage();
  });
  
  // Translations state
  const [translations, setTranslations] = useState<Record<string, string>>(
    translationFiles[language] || translationFiles.en
  );
  
  // RTL languages
  const rtlLanguages: LanguageCode[] = ['ar'];
  const isRtl = rtlLanguages.includes(language);

  // Set language function with immediate translation update
  const changeLanguage = (lang: LanguageCode) => {
    setLanguage(lang);
    // Immediately update translations for immediate UI response
    setTranslations(translationFiles[lang] || translationFiles.en);
    // Update localStorage
    localStorage.setItem('neuch-language', lang);
    // Update document direction and lang attribute
    document.documentElement.dir = rtlLanguages.includes(lang) ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  // Load translations and set document attributes on initial load
  useEffect(() => {
    // Set document direction based on language
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRtl]);

  // Translation function
  const t = (key: string) => {
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
};
