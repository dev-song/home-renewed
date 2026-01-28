import { cn } from '../../../../lib/utils';
import { useTerminalContext } from '../TerminalContext';

type TerminalBodyProps = React.HTMLAttributes<HTMLDivElement>;

function TerminalBody({ className, children, ...props }: TerminalBodyProps) {
  const { currentThemeConfig } = useTerminalContext();

  return (
    <div
      className={cn(
        'flex flex-col p-4 h-80 leading-relaxed transition-colors duration-300',
        currentThemeConfig.colors.bg,
        currentThemeConfig.colors.text,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default TerminalBody;
