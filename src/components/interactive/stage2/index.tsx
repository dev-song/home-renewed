import React, { useState, useEffect, useRef, type KeyboardEvent } from 'react';
import { cn } from '../../../lib/utils';
import { ChevronDown, Moon, Sun, Coffee, Circle, Contrast } from 'lucide-react';
import { BROWSER_LANGUAGE, useLanguageStore } from '../../../store/languageStore';

export default function Stage2() {
  return <Terminal />;
}

interface HistoryItem {
  type: 'input' | 'output';
  content: string;
}

const TERMINAL_THEME = {
  DARK: 'dark',
  LIGHT: 'light',
  BROWN: 'brown',
  GRAY: 'gray',
  HIGH_CONTRAST: 'highContrast',
} as const;
type TerminalThemeKey = (typeof TERMINAL_THEME)[keyof typeof TERMINAL_THEME];

interface Theme {
  name: string;
  icon: React.ReactNode;
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

const THEMES: Record<TerminalThemeKey, Theme> = {
  [TERMINAL_THEME.DARK]: {
    name: 'Dark',
    icon: <Moon size={14} />,
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
    icon: <Sun size={14} />,
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
    icon: <Coffee size={14} />,
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
    icon: <Circle size={14} />,
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
    icon: <Contrast size={14} />,
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

const TERMINAL_COMMAND_KEY = {
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

// mode: progress/input
const Terminal: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [input, setInput] = useState<string>('');
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<TerminalThemeKey>(TERMINAL_THEME.DARK);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const themeDropdownRef = useRef<HTMLDivElement>(null);

  const theme = THEMES[currentTheme];

  // 진행상황 바 애니메이션
  useEffect(() => {
    const interval = setInterval(() => {
      // 일시정지 상태가 아닐 때만 진행
      if (!isPaused) {
        setProgress((prev) => {
          if (prev < MAX_PROGRESS) {
            return prev + 1;
          } else {
            clearInterval(interval);
            return MAX_PROGRESS;
          }
        });
      }
    }, PROGRESS_INTERVAL);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Global key listener for 'p' to pause
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (isPaused) return;
      // 입력 중이 아니고, 테마 드롭다운이 닫혀있을 때만 동작
      const isInputFocused = document.activeElement === inputRef.current;
      if (isInputFocused) return;

      const isPKeyPressed = e.key.toLowerCase() === TERMINAL_COMMAND_KEY.PAUSE;
      if (!isPKeyPressed) return;

      e.preventDefault();
      setIsPaused(true);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPaused]);

  // 새로운 메시지가 추가될 때마다 하단으로 자동 스크롤
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isPaused]);

  // Paused 상태가 되면 입력창 포커스
  useEffect(() => {
    if (isPaused) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isPaused]);

  // Click outside to close theme dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(event.target as Node)) {
        setIsThemeOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleContainerTouch = () => {
    if (isPaused) {
      inputRef.current?.focus();
    } else {
      setIsPaused(true);
    }
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    // 드롭다운 클릭 시 포커스 이동 방지
    if (themeDropdownRef.current?.contains(e.target as Node)) {
      return;
    }

    if (isPaused) {
      inputRef.current?.focus();
    }
  };

  const handleCommand = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const inputHistory: HistoryItem[] = [...history, { type: 'input', content: input }];
      const trimmedInput = input.trim().toLowerCase();
      switch (trimmedInput) {
        case TERMINAL_COMMAND_KEY.EMPTY:
          setHistory(inputHistory);
          return;
        case TERMINAL_COMMAND_KEY.CLEAR:
          setHistory([]);
          setInput('');
          return;

        case TERMINAL_COMMAND_KEY.CONTINUE:
          setIsPaused(false);
          break;
        case TERMINAL_COMMAND_KEY.DO_NOT_USE_OR_YOU_WILL_BE_FIRED__DELETE_EVERYTHING:
          setIsShaking(true);
          setTimeout(() => setIsShaking(false), 500);
          break;
      }

      const outputHistory: HistoryItem = {
        type: 'output',
        content:
          TERMINAL_RESPONSE_BY_COMMAND[trimmedInput] ||
          `Command not supported: ${input}. Type "help" for available commands.`,
      };

      setHistory([...inputHistory, outputHistory]);
      setInput('');
    }
  };

  return (
    <div
      className={cn(
        'w-full max-w-2xl mx-auto mt-10 font-mono text-sm shadow-2xl rounded-lg overflow-hidden border transition-colors duration-300',
        theme.colors.border,
        isShaking && 'animate-shake',
      )}
      onClick={handleContainerClick}
      onTouchEnd={handleContainerTouch}
    >
      {/* 터미널 상단 바 */}
      <div
        className={cn(
          'px-4 py-2 flex items-center justify-between border-b transition-colors duration-300',
          theme.colors.headerBg,
          theme.colors.border,
        )}
      >
        <div className='flex items-center gap-2'>
          <div className='w-3 h-3 rounded-full bg-red-500' />
          <div className='w-3 h-3 rounded-full bg-yellow-500' />
          <div className='w-3 h-3 rounded-full bg-green-500' />
          <span
            className={cn(
              'text-xs ml-2 select-none transition-colors duration-300',
              theme.colors.muted,
            )}
          >
            guest@portfolio: ~
          </span>
        </div>

        {/* Theme Selector */}
        <div className='relative' ref={themeDropdownRef}>
          <button
            onClick={() => setIsThemeOpen(!isThemeOpen)}
            className={cn(
              'flex items-center gap-1.5 px-2 py-1 rounded text-xs transition-colors duration-200 select-none',
              isThemeOpen ? 'bg-black/20' : 'hover:bg-black/10',
              theme.colors.text,
            )}
          >
            {theme.icon}
            <span>{theme.name}</span>
            <ChevronDown
              size={12}
              className={cn('transition-transform', isThemeOpen && 'rotate-180')}
            />
          </button>

          {isThemeOpen && (
            <div
              className={cn(
                'absolute right-0 top-full mt-1 w-32 py-1 rounded shadow-xl border z-50 overflow-hidden',
                theme.colors.headerBg,
                theme.colors.border,
              )}
            >
              {(Object.keys(THEMES) as TerminalThemeKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    setCurrentTheme(key);
                    setIsThemeOpen(false);
                  }}
                  className={cn(
                    'w-full text-left px-3 py-1.5 text-xs flex items-center gap-2 transition-colors',
                    currentTheme === key ? 'bg-black/20 font-bold' : 'hover:bg-black/10',
                    currentTheme === TERMINAL_THEME.LIGHT ? 'text-black' : 'text-white',
                  )}
                >
                  {THEMES[key].icon}
                  {THEMES[key].name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 터미널 본문 */}
      <div
        className={cn(
          'flex flex-col p-4 h-80 leading-relaxed transition-colors duration-300',
          theme.colors.bg,
          theme.colors.text,
        )}
      >
        {/* 진행상황 바 - 항상 표시 */}
        <ProgressWithTrivia progress={progress} theme={theme} />

        {/* 입력줄 및 히스토리 - 일시정지 상태일 때만 표시 */}
        {isPaused && (
          <div
            ref={scrollRef}
            className={cn(
              'h-full overflow-y-auto mt-2 border-t pt-2 transition-colors duration-300',
              theme.colors.border,
            )}
          >
            {history.map((item, index) => (
              <div key={index} className='mb-1 whitespace-pre-wrap'>
                {item.type === 'input' ? (
                  <span className={cn('font-bold', theme.colors.accent)}>$ {item.content}</span>
                ) : (
                  <span className={theme.colors.text}>{item.content}</span>
                )}
              </div>
            ))}

            {/* 입력줄 */}
            <div className='flex items-center'>
              <span className={cn('font-bold mr-2', theme.colors.accent)}>$</span>
              <input
                ref={inputRef}
                type='text'
                className={cn('bg-transparent border-none outline-none flex-1', theme.colors.input)}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommand}
                autoFocus
              />
            </div>

            <div className={cn('mt-2 text-xs', theme.colors.muted)}>
              Type '{TERMINAL_COMMAND_KEY.CONTINUE}' to continue, '{TERMINAL_COMMAND_KEY.HELP}' for
              commands.
            </div>
          </div>
        )}

        {!isPaused && (
          <div className={cn('mt-auto text-xs animate-pulse', theme.colors.muted)}>
            Press '{TERMINAL_COMMAND_KEY.PAUSE}' to pause and enter commands.
          </div>
        )}
      </div>
    </div>
  );
};

const MAX_PROGRESS = 100;
const PROGRESS_INTERVAL = 75;
const PROGRESS_BAR_WIDTH = 2;

interface ProgressWithTriviaProps extends React.HTMLAttributes<HTMLDivElement> {
  progress: number;
  theme: Theme;
}

const ProgressWithTrivia = ({
  progress,
  className,
  theme,
  ...props
}: React.DetailedHTMLProps<ProgressWithTriviaProps, HTMLDivElement>) => {
  const { language } = useLanguageStore();
  const timeline = TRIVIA_AND_CAREER_TIMELINE[language];
  const triviaByProgress = timeline.slice(
    0,
    Math.ceil(progress / (MAX_PROGRESS / timeline.length)),
  );

  return (
    <div className={cn('flex flex-col gap-1', className)} {...props}>
      <div className='flex items-center'>
        <span className={theme.colors.muted}>Progress:</span>
        <span className={cn('ml-1', theme.colors.muted)}>{formatProgress(progress)}%</span>
        <div className='flex w-full h-2 ml-2'>
          {Array.from({
            length: Math.floor(progress / PROGRESS_BAR_WIDTH),
          }).map((_, index) => (
            <div
              key={index}
              className={cn(
                'h-2 not-last:border-r transition-colors duration-300',
                theme.colors.progressBar,
                theme.colors.progressBarBg,
              )}
              style={{ width: `${PROGRESS_BAR_WIDTH}%` }}
            />
          ))}
        </div>
      </div>

      <div className='h-auto'>
        {triviaByProgress.reverse().map((item, index) => (
          <p key={index} className={cn(theme.colors.muted, index !== 0 && 'hidden')}>
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};

function formatProgress(progress: number) {
  if (progress < 0) throw new Error('progress should exceed 0');
  if (progress > 100) throw new Error('progress should not exceed 100');
  if (progress < 100) return progress.toString().padStart(3, ' ');
  return progress.toString();
}

const TRIVIA_AND_CAREER_TIMELINE = {
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

const TERMINAL_RESPONSE_BY_COMMAND: Record<string, string> = {
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
