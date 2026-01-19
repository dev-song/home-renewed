export default function Stage2() {
  return <Terminal />;
}

import React, { useState, useEffect, useRef, type KeyboardEvent } from 'react';

// 히스토리 아이템 타입 정의
interface HistoryItem {
  type: 'input' | 'output';
  content: string;
}

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
