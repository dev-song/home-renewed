export default function Stage2() {
  return <Terminal />;
}

import React, { useState, useEffect, useRef, type KeyboardEvent } from 'react';
import { cn } from '../../lib/utils';

// 히스토리 아이템 타입 정의
interface HistoryItem {
  type: 'input' | 'output';
  content: string;
}

// mode: progress/input
const Terminal: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([
    { type: 'output', content: 'Welcome to my portfolio! Type "help" to see available commands.' },
  ]);
  const [input, setInput] = useState<string>('');
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
      const isPKeyPressed = e.key === 'p' || e.key === 'P';
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

  // 터미널 어디든 클릭하면 입력창에 포커스
  const focusInput = () => {
    if (isPaused) {
      inputRef.current?.focus();
    }
  };

  const handleCommand = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const trimmedInput = input.trim().toLowerCase();
      const newHistory: HistoryItem[] = [...history, { type: 'input', content: input }];

      let response = '';

      switch (trimmedInput) {
        case 'help':
          response = 'Available commands: about, skills, contact, clear, c (continue)';
          break;
        case 'about':
          response = '안녕하세요! 웹 프론트엔드 개발자 송상수입니다.';
          break;
        case 'skills':
          response = 'Frontend: React, TypeScript, Tailwind CSS\nBackend: Node.js, Next.js';
          break;
        case 'contact':
          response =
            'Email: dvlprsong@gmail.com\nGitHub: github.com/dev-song\nLinkedIn: linkedin.com/in/sangsu-song/';
          break;
        case 'sudo':
          response = 'Permission denied! contact with admin';
          break;
        case 'rm -rf /':
          // TODO: screen shake
          break;
        case 'cat':
          // TODO: pixel art cat
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        case 'c':
        case 'continue':
          setIsPaused(false);
          // 입력창이 사라지므로 history 업데이트나 response 불필요할 수 있으나,
          // resume 직전 메시지는 남겨두거나 초기화하는 방식 선택 가능.
          // 여기서는 히스토리에 남깁니다.
          response = 'Resuming progress...';
          break;
        case '':
          setHistory(newHistory);
          return;
        default:
          response = `Command not found: ${input}. Type "help" for assistance.`;
      }

      setHistory([...newHistory, { type: 'output', content: response }]);
      setInput('');
    }
  };

  return (
    <div
      className='w-full max-w-2xl mx-auto mt-10 font-mono text-sm shadow-2xl rounded-lg overflow-hidden border border-zinc-700'
      onClick={focusInput}
    >
      {/* 터미널 상단 바 (macOS 스타일) */}
      <div className='bg-zinc-800 px-4 py-2 flex items-center gap-2 border-b border-zinc-700'>
        <div className='w-3 h-3 rounded-full bg-red-500' />
        <div className='w-3 h-3 rounded-full bg-yellow-500' />
        <div className='w-3 h-3 rounded-full bg-green-500' />
        <span className='text-zinc-400 text-xs ml-2'>guest@portfolio: ~</span>
      </div>

      {/* 터미널 본문 */}
      <div className='flex flex-col bg-zinc-900 p-4 h-80 text-zinc-100 leading-relaxed'>
        {/* 진행상황 바 - 항상 표시 */}
        <ProgressWithTrivia progress={progress} />

        {/* 입력줄 및 히스토리 - 일시정지 상태일 때만 표시 */}
        {isPaused && (
          <div
            ref={scrollRef}
            className='h-full overflow-y-auto mt-4 border-t border-zinc-800 pt-2'
          >
            {history.map((item, index) => (
              <div key={index} className='mb-1 whitespace-pre-wrap'>
                {item.type === 'input' ? (
                  <span className='text-green-400 font-bold'>$ {item.content}</span>
                ) : (
                  <span className='text-zinc-300'>{item.content}</span>
                )}
              </div>
            ))}

            {/* 입력줄 */}
            <div className='flex items-center'>
              <span className='text-green-400 font-bold mr-2'>$</span>
              <input
                ref={inputRef}
                type='text'
                className='bg-transparent border-none outline-none flex-1 text-zinc-100'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommand}
                autoFocus
              />
            </div>

            <div className='mt-2 text-zinc-500 text-xs'>
              Type 'c' to continue, 'help' for commands.
            </div>
          </div>
        )}

        {!isPaused && (
          <div className='mt-auto text-zinc-500 text-xs animate-pulse'>
            Press 'p' to pause and enter commands.
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
}

const ProgressWithTrivia = ({
  progress,
  className,
  ...props
}: React.DetailedHTMLProps<ProgressWithTriviaProps, HTMLDivElement>) => {
  const triviaByProgress = TRIVIA_AND_CAREER_TIMELINE.slice(
    0,
    Math.ceil(progress / (MAX_PROGRESS / TRIVIA_AND_CAREER_TIMELINE.length)),
  );

  return (
    <div className={cn('flex flex-col gap-1', className)} {...props}>
      <div className='flex items-center'>
        <span className='text-zinc-400'>Progress:</span>
        <span className='text-zinc-400 ml-1'>{formatProgress(progress)}%</span>
        <div className='flex w-full h-2 ml-2'>
          {Array.from({ length: Math.floor(progress / PROGRESS_BAR_WIDTH) }).map((_, index) => (
            <div
              key={index}
              className={`bg-green-500 h-2 not-last:border-r border-zinc-700`}
              style={{ width: `${PROGRESS_BAR_WIDTH}%` }}
            />
          ))}
        </div>
      </div>

      <div className='h-6 overflow-hidden'>
        {triviaByProgress.reverse().map((el, index) => (
          <div key={index} className='whitespace-pre-wrap'>
            <span className='text-zinc-400'>{el}</span>
          </div>
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

const TRIVIA_AND_CAREER_TIMELINE = [
  '2013.06: 프로그래밍에 관심을 갖고 C언어 입문서에 도전하다',
  '2013.08: 포인터를 만나고 C언어를 그만두다',
  '2019.09: 생활코딩을 접하고 다시 프로그래밍을 시작하다',
  '2019.11: 웹 프론트엔드 개발자로 진로를 정하다',
  '2020.12: 에이셀테크놀로지스 입사, 커리어 시작',
  '2021.04: 회사가 강남역으로 이사 가다. 북적북적',
  '2022.09: 선정릉에서의 새로운 사옥. 평화롭다. 지하철에서는 좀 멀어',
  '2024.12: 충정로로 오다. 집에서 가까워!',
  '2025.12: 잠시 멈춤, 재충전을 위한 시간',
];
