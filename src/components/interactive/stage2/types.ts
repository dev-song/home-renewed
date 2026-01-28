import type { LucideIcon } from 'lucide-react';

export const TERMINAL_THEME = {
  DARK: 'dark',
  LIGHT: 'light',
  BROWN: 'brown',
  GRAY: 'gray',
  HIGH_CONTRAST: 'highContrast',
} as const;
export type TerminalThemeKey = (typeof TERMINAL_THEME)[keyof typeof TERMINAL_THEME];

export interface ThemeConfig {
  name: string;
  icon: LucideIcon;
  colors: {
    bg: string;
    text: string;
    border: string;
    headerBg: string;
    accent: string; // for prompt and special text
    input: string;
    muted: string;
    progressBar: string;
    progressBarBg: string;
  };
}

export const HISTORY_ITEM_TYPE = {
  INPUT: 'input',
  OUTPUT: 'output',
} as const;
export type HistoryItemType = (typeof HISTORY_ITEM_TYPE)[keyof typeof HISTORY_ITEM_TYPE];

export interface HistoryItem {
  type: HistoryItemType;
  content: string;
}

export const TERMINAL_COMMAND_KEY = {
  HELP: 'help',
  ABOUT: 'about',
  SKILLS: 'skills',
  CONTACT: 'contact',
  CLEAR: 'clear',
  CONTINUE: 'c',
  PAUSE: 'p',
  EMPTY: '',
  DO_NOT_USE_OR_YOU_WILL_BE_FIRED__SUDO: 'sudo',
  DO_NOT_USE_OR_YOU_WILL_BE_FIRED__DELETE_EVERYTHING: 'rm -rf /',
  USE_AND_BE_HAPPY__CAT: 'cat',
} as const;

export type TerminalCommandKey = (typeof TERMINAL_COMMAND_KEY)[keyof typeof TERMINAL_COMMAND_KEY];
