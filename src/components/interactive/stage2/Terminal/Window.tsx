import { cn } from '../../../../lib/utils';
import { useTerminalContext } from '../TerminalContext';

interface TerminalWindowProps extends React.HTMLAttributes<HTMLDivElement> {
  shakeWindow: boolean;
}

function TerminalWindow({ shakeWindow, className, children, ...props }: TerminalWindowProps) {
  const { currentThemeConfig } = useTerminalContext();

  return (
    <div
      className={cn(
        'w-full max-w-2xl mx-auto mt-10 font-mono text-sm shadow-2xl rounded-lg overflow-hidden border transition-colors duration-300',
        currentThemeConfig.colors.border,
        shakeWindow && 'animate-shake',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default TerminalWindow;
