import { cn } from '../../../../lib/utils';
import { useTerminalContext } from '../TerminalContext';

function TerminalHeaderDecoration() {
  const { currentThemeConfig } = useTerminalContext();

  return (
    <div className='flex items-center gap-2'>
      <div className='w-3 h-3 rounded-full bg-red-500' />
      <div className='w-3 h-3 rounded-full bg-yellow-500' />
      <div className='w-3 h-3 rounded-full bg-green-500' />
      <span
        className={cn(
          'text-xs ml-2 select-none transition-colors duration-300',
          currentThemeConfig.colors.muted,
        )}
      >
        guest@portfolio: ~
      </span>
    </div>
  );
}

export default TerminalHeaderDecoration;
