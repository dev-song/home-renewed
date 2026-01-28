import { useEffect, useState } from 'react';
import { createSafeContext } from '../../../../lib/createSafeContext';
import { useTerminalContext } from '../TerminalContext';
import { TERMINAL_MAX_PROGRESS, TERMINAL_PROGRESS_INTERVAL } from '../constants';

type ProgressContextType = {
  progress: number;
};

const [SafeProgressProvider, useSafeProgressContext] =
  createSafeContext<ProgressContextType>('ProgressContext');

type TerminalProviderProps = React.PropsWithChildren;

const TerminalProgressProvider = ({ children }: TerminalProviderProps) => {
  const { isPaused } = useTerminalContext();
  const [progress, setProgress] = useState(0);

  // Gradually increase progress
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < TERMINAL_MAX_PROGRESS) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return TERMINAL_MAX_PROGRESS;
        }
      });
    }, TERMINAL_PROGRESS_INTERVAL);

    return () => clearInterval(interval);
  }, [isPaused]);

  return <SafeProgressProvider value={{ progress }}>{children}</SafeProgressProvider>;
};

export { TerminalProgressProvider, useSafeProgressContext as useTerminalProgressContext };
