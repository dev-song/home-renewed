import { Moon, Sun, Coffee, Circle, Contrast } from 'lucide-react';
import { BROWSER_LANGUAGE } from '../../../store/languageStore';
import {
  TERMINAL_THEME,
  type TerminalThemeKey,
  type ThemeConfig,
  TERMINAL_COMMAND_KEY,
} from './types';

export { TERMINAL_THEME, TERMINAL_COMMAND_KEY };

export const TERMINAL_MAX_PROGRESS = 100;
export const TERMINAL_PROGRESS_INTERVAL = 75;
export const TERMINAL_PROGRESS_BAR_WIDTH = 2;

export const TERMINAL_THEMES: Record<TerminalThemeKey, ThemeConfig> = {
  [TERMINAL_THEME.DARK]: {
    name: 'Dark',
    icon: Moon,
    colors: {
      bg: 'bg-zinc-900',
      text: 'text-zinc-100',
      border: 'border-zinc-700',
      headerBg: 'bg-zinc-800',
      accent: 'text-green-400',
      input: 'text-zinc-100',
      muted: 'text-zinc-500',
      progressBar: 'bg-green-500',
      progressBarBg: 'border-zinc-700',
    },
  },
  [TERMINAL_THEME.LIGHT]: {
    name: 'Light',
    icon: Sun,
    colors: {
      bg: 'bg-slate-50',
      text: 'text-slate-800',
      border: 'border-slate-300',
      headerBg: 'bg-slate-200',
      accent: 'text-blue-600',
      input: 'text-slate-900',
      muted: 'text-slate-500',
      progressBar: 'bg-blue-500',
      progressBarBg: 'border-slate-300',
    },
  },
  [TERMINAL_THEME.BROWN]: {
    name: 'Retro',
    icon: Coffee,
    colors: {
      bg: 'bg-[#2b2016]',
      text: 'text-[#e0cda7]',
      border: 'border-[#5c4632]',
      headerBg: 'bg-[#423122]',
      accent: 'text-[#ffae00]',
      input: 'text-[#ffeebb]',
      muted: 'text-[#8a7258]',
      progressBar: 'bg-[#ffae00]',
      progressBarBg: 'border-[#5c4632]',
    },
  },
  [TERMINAL_THEME.GRAY]: {
    name: 'Gray',
    icon: Circle,
    colors: {
      bg: 'bg-[#1a1a1a]',
      text: 'text-[#cccccc]',
      border: 'border-[#333333]',
      headerBg: 'bg-[#262626]',
      accent: 'text-[#ffffff]',
      input: 'text-[#eeeeee]',
      muted: 'text-[#666666]',
      progressBar: 'bg-[#888888]',
      progressBarBg: 'border-[#333333]',
    },
  },
  [TERMINAL_THEME.HIGH_CONTRAST]: {
    name: 'Hi-Contrast',
    icon: Contrast,
    colors: {
      bg: 'bg-black',
      text: 'text-white',
      border: 'border-white',
      headerBg: 'bg-black',
      accent: 'text-yellow-400',
      input: 'text-white',
      muted: 'text-white',
      progressBar: 'bg-yellow-400',
      progressBarBg: 'border-white',
    },
  },
};

// Trivia Timeline
export const TERMINAL_TRIVIA_AND_CAREER_TIMELINE = {
  [BROWSER_LANGUAGE.KOREAN]: [
    '2013.06: 프로그래밍을 해보고 싶어! 생애 첫 C언어 입문서를 구입하다.',
    '2013.08: "포인터"를 접하다. 눈물을 흘리며 책을 덮다.',
    '2019.09: 생활코딩을 접하고 프로그래밍을 다시 시작하다.',
    '2019.12: 웹 프론트엔드 개발자가 되겠어!',
    '2020.12: 에이셀테크놀로지스 입사: 프론트엔드 개발자로서 커리어 시작',
    '2021.03: BigFinance 프로젝트에서 처음으로 독립적인 기능을 맡아 구현하다. 🚀',
    '2024.01: 새로운 먹거리, epic AI의 프론트엔드를 책임지게 되다.',
    '2025.10: epic AI의 성공적 출시! 내가 만든 제품이 광고판에 뜨다니 믿기지 않아.',
    '2025.12: 잠시 쉬어가기, 재충전을 위한 시간. 🔋',
  ],
  [BROWSER_LANGUAGE.ENGLISH]: [
    '2013.06: Curiosity peaked! Bought my very first C programming book.',
    '2013.08: Met "The Pointer." Cried a little, closed the book, and walked away',
    '2019.09: Reunited with coding via Opentutorials.org. The spark was back!',
    '2019.11: Decision made: I’m going to be a Web Frontend Developer.',
    '2020.12: Officially kicked off my career at Aicel Technologies.',
    '2021.04: Took ownership of my first independent feature in the BigFinance project. 🚀',
    '2022.09: Stepped up to lead the frontend for our new venture, epic AI.',
    '2024.12: epic AI successfully launched! Seeing my product on a billboard was surreal.',
    '2025.12: Hitting the pause button for a well-deserved recharge. 🔋',
  ],
};

// Terminal Responses
export const TERMINAL_RESPONSE_BY_COMMAND: Record<string, string> = {
  [TERMINAL_COMMAND_KEY.CONTINUE]: 'Resuming progress...',
  [TERMINAL_COMMAND_KEY.HELP]: `Available commands: about, skills, contact, clear, c (continue)`,
  [TERMINAL_COMMAND_KEY.ABOUT]: `Hello! I am Web Frontend Developer Sangsu Song.`,
  [TERMINAL_COMMAND_KEY.SKILLS]: `Typescript, React, Vite, Tailwind CSS, Next.js, Highcharts, ...`,
  [TERMINAL_COMMAND_KEY.CONTACT]: `Email: ${import.meta.env.VITE_DEV_EMAIL}\nGitHub: ${import.meta.env.VITE_DEV_GITHUB_URL}\nLinkedIn: ${import.meta.env.VITE_DEV_LINKEDIN_URL}`,
  [TERMINAL_COMMAND_KEY.DO_NOT_USE_OR_YOU_WILL_BE_FIRED__SUDO]:
    'PERMISSION DENIED: You are not the admin',
  [TERMINAL_COMMAND_KEY.DO_NOT_USE_OR_YOU_WILL_BE_FIRED__DELETE_EVERYTHING]:
    'CRITICAL ERROR: System deletion prevented.',
  [TERMINAL_COMMAND_KEY.USE_AND_BE_HAPPY__CAT]: `
⠀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⣶⣿⣶⡾⠁
⠠⣿⡀⠀⠀⠀⢀⣀⣤⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠀
⠀⠙⢿⣶⣶⣾⣿⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠿⠃⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡃⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣰⣿⣿⢿⣿⣿⠟⠁⠀⠀⠀⠈⢿⣿⠛⠻⢿⣦⡀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣿⠟⠁⠘⢿⣿⠀⠀⠀⠀⠀⠀⠸⣿⡀⠀⠀⠹⠷⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣿⣤⠀⠀⠀⠙⠷⠶⠀⠀⠀⠀⠀⠙⠛⠁⠀⠀⠀⠀⠀
`,
};
