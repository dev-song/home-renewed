import { create } from 'zustand';

export const BROWSER_LANGUAGE = {
  KOREAN: 'ko',
  ENGLISH: 'en',
} as const;
type BrowserLanguage = (typeof BROWSER_LANGUAGE)[keyof typeof BROWSER_LANGUAGE];
const DEFAULT_LANGUAGE = BROWSER_LANGUAGE.KOREAN;

interface LanguageState {
  language: BrowserLanguage;
  setLanguage: (language: BrowserLanguage) => void;
  toggleLanguage: () => void;
}

const getBrowserLanguage = (): BrowserLanguage => {
  if (typeof navigator === 'undefined') return DEFAULT_LANGUAGE;
  const browserLang = navigator.language || navigator.languages?.[0];
  return browserLang?.startsWith(BROWSER_LANGUAGE.ENGLISH)
    ? BROWSER_LANGUAGE.ENGLISH
    : BROWSER_LANGUAGE.KOREAN;
};

export const useLanguageStore = create<LanguageState>((set) => ({
  language: getBrowserLanguage(),
  setLanguage: (language) => set({ language }),
  toggleLanguage: () =>
    set((state) => ({
      language:
        state.language === BROWSER_LANGUAGE.KOREAN
          ? BROWSER_LANGUAGE.ENGLISH
          : BROWSER_LANGUAGE.KOREAN,
    })),
}));
