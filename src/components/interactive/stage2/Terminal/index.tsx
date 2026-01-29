import React, { useCallback, useEffect, useRef } from 'react';
import { useTerminalContext } from '../TerminalContext';
import TerminalWindow from './Window';
import TerminalHeader from './Header';
import TerminalBody from './Body';
import TerminalProgressWithTrivia from './ProgressWithTrivia';
import TerminalCommandHistoryWithInput from './CommandHistoryWithInput';
import TerminalPauseGuide from './PauseGuide';
import { TERMINAL_COMMAND_KEY } from '../types';
import TerminalHeaderDecoration from './HeaderDecoration';
import TerminalThemeSelector from './ThemeSelector';

const Terminal: React.FC = () => {
  const { isPaused, setIsPaused, isForbiddenCommand } = useTerminalContext();
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInputIfPaused = useCallback(() => {
    if (!isPaused || !inputRef.current) return;

    inputRef.current.focus();
  }, [isPaused]);

  useEffect(() => {
    focusInputIfPaused();
  }, [focusInputIfPaused]);

  useEffect(() => {
    const pauseOnPKeyDown = (e: globalThis.KeyboardEvent) => {
      const isInputFocused = document.activeElement === inputRef.current;
      const isPauseKeyDown = e.key.toLowerCase() === TERMINAL_COMMAND_KEY.PAUSE || e.code === 'KeyP';

      if (isPaused || isInputFocused || !isPauseKeyDown) return;

      e.preventDefault();
      setIsPaused(true);
    };

    window.addEventListener('keydown', pauseOnPKeyDown);
    return () => window.removeEventListener('keydown', pauseOnPKeyDown);
  }, [isPaused, setIsPaused]);

  const pauseProgressOrFocusInput = () => {
    if (!isPaused) {
      setIsPaused(true);
      return;
    }

    if (!inputRef.current) return;

    inputRef.current.focus();
  };

  return (
    <TerminalWindow
      shakeWindow={isForbiddenCommand}
      onClick={focusInputIfPaused}
      onTouchEnd={pauseProgressOrFocusInput}
    >
      <TerminalHeader>
        <TerminalHeaderDecoration />
        <TerminalThemeSelector />
      </TerminalHeader>
      <TerminalBody>
        <TerminalProgressWithTrivia />

        {isPaused ? <TerminalCommandHistoryWithInput ref={inputRef} /> : <TerminalPauseGuide />}
      </TerminalBody>
    </TerminalWindow>
  );
};

export default Terminal;
