import { cn } from '../../../../lib/utils';
import { useTerminalContext } from '../TerminalContext';
import { TERMINAL_COMMAND_KEY } from '../types';

function TerminalPauseGuide() {
  const { currentThemeConfig } = useTerminalContext();
  return (
    <div className={cn('mt-auto text-xs animate-pulse', currentThemeConfig.colors.muted)}>
      Press '{TERMINAL_COMMAND_KEY.PAUSE}' to pause and enter commands.
    </div>
  );
}

export default TerminalPauseGuide;
