import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Lang, TranslationKey } from './translations';
import { translations } from './translations';

type I18nContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
  restoring: boolean;
  ready: boolean;
};

const STORAGE_KEY = 'i18n.lang';

const I18nContext = createContext<I18nContextValue | null>(null);

function format(template: string, vars?: Record<string, string | number>) {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (m, k) => {
    const v = vars[k];
    return v === undefined || v === null ? m : String(v);
  });
}

function isLang(x: any): x is Lang {
  return x === 'en' || x === 'hi' || x === 'bn';
}

export function I18nProvider({ children, initialLang = 'en' }: { children: React.ReactNode; initialLang?: Lang }) {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const [restoring, setRestoring] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function restore() {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (!cancelled && isLang(saved)) setLangState(saved);
      } finally {
        if (!cancelled) setRestoring(false);
      }
    }
    restore();
    return () => {
      cancelled = true;
    };
  }, []);

  const setLang = (next: Lang) => {
    setLangState(next);
    AsyncStorage.setItem(STORAGE_KEY, next);
  };

  const value = useMemo<I18nContextValue>(() => {
    function t(key: TranslationKey, vars?: Record<string, string | number>) {
      const raw = translations[lang]?.[key] ?? translations.en[key] ?? key;
      return format(raw, vars);
    }

    return { lang, setLang, t, restoring, ready: !restoring };
  }, [lang, restoring]);

  if (restoring) return null;

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
