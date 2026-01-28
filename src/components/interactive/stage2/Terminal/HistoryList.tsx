import { cn } from '../../../../lib/utils';
import { useTerminalContext } from '../TerminalContext';
import type { HistoryItem } from '../types';

interface TerminalHistoryListProps {
  history: HistoryItem[];
}

function TerminalHistoryList({ history }: TerminalHistoryListProps) {
  const { currentThemeConfig } = useTerminalContext();

  return (
    <>
      {history.map((item, index) => (
        <div key={index} className='mb-1 whitespace-pre-wrap'>
          {item.type === 'input' ? (
            <span className={cn('font-bold', currentThemeConfig.colors.accent)}>
              $ {item.content}
            </span>
          ) : (
            <span className={currentThemeConfig.colors.text}>{item.content}</span>
          )}
        </div>
      ))}
    </>
  );
}

export default TerminalHistoryList;
