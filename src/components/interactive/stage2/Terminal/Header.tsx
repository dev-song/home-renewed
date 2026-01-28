import { useTerminalContext } from '../TerminalContext';
import { cn } from '../../../../lib/utils';

type TerminalHeaderProps = React.HTMLAttributes<HTMLDivElement>;

function TerminalHeader({ className, children, ...props }: TerminalHeaderProps) {
  const { currentThemeConfig } = useTerminalContext();

  return (
    <div
      className={cn(
        'px-4 py-2 flex items-center justify-between border-b transition-colors duration-300',
        currentThemeConfig.colors.headerBg,
        currentThemeConfig.colors.border,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default TerminalHeader;
