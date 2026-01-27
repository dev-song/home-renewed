import { Globe } from 'lucide-react';
import { BROWSER_LANGUAGE, useLanguageStore } from '../store/languageStore';

export default function LanguageSwitchButton() {
  const { language, toggleLanguage } = useLanguageStore();

  return (
    <button
      onClick={toggleLanguage}
      className='flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white transition-colors cursor-pointer'
      data-umami-event='Language toggle button'
    >
      <Globe size={14} />
      <span>{LANGUAGE_LABEL[language]}</span>
    </button>
  );
}

const LANGUAGE_LABEL = {
  [BROWSER_LANGUAGE.KOREAN]: '한국어',
  [BROWSER_LANGUAGE.ENGLISH]: 'English',
};
