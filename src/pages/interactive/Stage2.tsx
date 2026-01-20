export default function Stage2() {
  return <Terminal />;
}

import React, { useState, useEffect, useRef, type KeyboardEvent } from 'react';

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
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 새로운 메시지가 추가될 때마다 하단으로 자동 스크롤
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  // 터미널 어디든 클릭하면 입력창에 포커스
  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const trimmedInput = input.trim().toLowerCase();
      const newHistory: HistoryItem[] = [...history, { type: 'input', content: input }];

      let response = '';

      switch (trimmedInput) {
        case 'help':
          response = 'Available commands: about, skills, contact, clear';
          break;
        case 'about':
          response = '안녕하세요! 성장을 즐기는 프론트엔드 개발자 홍길동입니다.';
          break;
        case 'skills':
          response = 'Frontend: React, TypeScript, Tailwind CSS\nBackend: Node.js, Next.js';
          break;
        case 'contact':
          response = 'Email: dev@example.com\nGitHub: github.com/username';
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
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
      <div
        ref={scrollRef}
        className='bg-zinc-900 p-4 h-80 overflow-y-auto text-zinc-100 leading-relaxed'
      >
        {/* 진행상황 바 */}
        <ProgressWithTrivia />

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
      </div>
    </div>
  );
};

const MAX_PROGRESS = 100;
const PROGRESS_INTERVAL = 75;
const PROGRESS_BAR_WIDTH = 2;

const ProgressWithTrivia = () => {
  const [progress, setProgress] = useState(0);
  const triviaByProgress = TRIVIA_AND_CAREER_TIMELINE.slice(
    0,
    Math.ceil(progress / (MAX_PROGRESS / TRIVIA_AND_CAREER_TIMELINE.length)),
  );

  // 진행상황 바 애니메이션
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < MAX_PROGRESS) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return MAX_PROGRESS;
        }
      });
    }, PROGRESS_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex flex-col gap-1'>
      <div className='flex items-center'>
        <span className='text-zinc-400'>Progress:</span>
        <span className='text-zinc-400 ml-1'>{formatProgress(progress)}%</span>
        <div className='flex w-full h-2 ml-2'>
          {Array.from({ length: Math.floor(progress / PROGRESS_BAR_WIDTH) }).map((_, index) => (
            <div
              key={index}
              className={`bg-green-500 h-2 w-[${PROGRESS_BAR_WIDTH}%] not-last:border-r border-zinc-700`}
            />
          ))}
        </div>
      </div>

      <span className='text-zinc-400'>You can pause by pressing 'p', restart by 'r'</span>

      <div className='h-12 overflow-hidden'>
        {triviaByProgress.reverse().map((el, index) => (
          <div key={index} className='whitespace-pre-wrap'>
            <span className='text-zinc-300'>{el}</span>
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
  'trivia 1',
  'trivia 2',
  'trivia 3',
  'trivia 4',
  'trivia 5',
  'trivia 6',
];
