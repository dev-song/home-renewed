import { cn } from '../../../../lib/utils';
import { useTerminalContext } from '../TerminalContext';

interface TerminalInputProps extends Omit<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'type' | 'onChange'
> {
  onChange: (value: string) => void;
}

function TerminalInput({ ref, onChange, ...props }: TerminalInputProps) {
  const { currentThemeConfig } = useTerminalContext();

  return (
    <div className='flex items-center'>
      <span className={cn('font-bold mr-2', currentThemeConfig.colors.accent)}>$</span>
      <input
        ref={ref}
        type='text'
        className={cn(
          'bg-transparent border-none outline-none flex-1',
          currentThemeConfig.colors.input,
        )}
        onChange={(e) => onChange(e.target.value)}
        autoFocus
        {...props}
      />
    </div>
  );
}
TerminalInput.displayName = 'TerminalInput';

export default TerminalInput;
