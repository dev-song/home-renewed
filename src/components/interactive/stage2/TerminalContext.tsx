import { useState } from 'react';
import { createSafeContext } from '../../../lib/createSafeContext';
import { TERMINAL_THEMES } from './constants';
import { TERMINAL_THEME, type TerminalThemeKey, type ThemeConfig } from './types';

type TerminalContextType = {
  isPaused: boolean;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
  isForbiddenCommand: boolean;
  setIsForbiddenCommand: React.Dispatch<React.SetStateAction<boolean>>;
  currentThemeKey: TerminalThemeKey;
  setCurrentThemeKey: React.Dispatch<React.SetStateAction<TerminalThemeKey>>;
  currentThemeConfig: ThemeConfig;
};

const [SafeTerminalProvider, useSafeTerminalContext] =
  createSafeContext<TerminalContextType>('TerminalContext');

type TerminalProviderProps = React.PropsWithChildren;

const TerminalProvider = ({ children }: TerminalProviderProps) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isForbiddenCommand, setIsForbiddenCommand] = useState(false);
  const [currentThemeKey, setCurrentThemeKey] = useState<TerminalThemeKey>(TERMINAL_THEME.DARK);

  return (
    <SafeTerminalProvider
      value={{
        isPaused,
        setIsPaused,
        isForbiddenCommand,
        setIsForbiddenCommand,
        currentThemeKey,
        setCurrentThemeKey,
        currentThemeConfig: TERMINAL_THEMES[currentThemeKey],
      }}
    >
      {children}
    </SafeTerminalProvider>
  );
};

export { TerminalProvider, useSafeTerminalContext as useTerminalContext };
