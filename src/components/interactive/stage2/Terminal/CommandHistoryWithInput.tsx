import { useEffect, useRef, useState } from 'react';
import { useTerminalContext } from '../TerminalContext';
import { HISTORY_ITEM_TYPE, TERMINAL_COMMAND_KEY, type HistoryItem } from '../types';
import { cn } from '../../../../lib/utils';
import TerminalHistoryList from './HistoryList';
import TerminalInput from './Input';
import { TERMINAL_RESPONSE_BY_COMMAND } from '../constants';

type TerminalCommandHistoryWithInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

function TerminalCommandHistoryWithInput({ ref }: TerminalCommandHistoryWithInputProps) {
  const { isPaused, setIsPaused, setIsForbiddenCommand, currentThemeConfig } = useTerminalContext();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [input, setInput] = useState<string>('');

  // Auto-scroll to bottom
  useEffect(() => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history, isPaused]);

  const executeCommandOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;

    const trimmedInput = input.trim().toLowerCase();
    const inputHistory: HistoryItem[] = [
      ...history,
      { type: HISTORY_ITEM_TYPE.INPUT, content: input },
    ];

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
        setIsForbiddenCommand(true);
        setTimeout(() => setIsForbiddenCommand(false), 500);
        break;
    }

    const outputHistory: HistoryItem = {
      type: HISTORY_ITEM_TYPE.OUTPUT,
      content:
        TERMINAL_RESPONSE_BY_COMMAND[trimmedInput] ||
        `Command not supported: ${input}. Type "help" for available commands.`,
    };

    setHistory([...inputHistory, outputHistory]);
    setInput('');
  };

  return (
    <div
      ref={scrollRef}
      className={cn(
        'h-full overflow-y-auto mt-2 border-t pt-2 transition-colors duration-300',
        currentThemeConfig.colors.border,
      )}
    >
      <TerminalHistoryList history={history} />
      <TerminalInput
        ref={ref}
        value={input}
        onChange={setInput}
        onKeyDown={executeCommandOnEnter}
      />
      <div className={cn('mt-2 text-xs', currentThemeConfig.colors.muted)}>
        Type '{TERMINAL_COMMAND_KEY.CONTINUE}' to continue, '{TERMINAL_COMMAND_KEY.HELP}' for
        commands.
      </div>
    </div>
  );
}

export default TerminalCommandHistoryWithInput;
