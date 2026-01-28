import { useEffect, useRef, useState } from 'react';
import { useTerminalContext } from '../TerminalContext';
import { cn } from '../../../../lib/utils';
import { ChevronDown, type LucideIcon } from 'lucide-react';
import { TERMINAL_THEME, TERMINAL_THEMES } from '../constants';
import type { TerminalThemeKey } from '../types';

function TerminalThemeSelector() {
  const { currentThemeKey, setCurrentThemeKey, currentThemeConfig } = useTerminalContext();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const closeDropdownOnOutsideClick = (e: MouseEvent) => {
      if (!dropdownRef.current || dropdownRef.current.contains(e.target as Node)) return;

      setIsOpen(false);
    };

    document.addEventListener('mousedown', closeDropdownOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeDropdownOnOutsideClick);
  }, []);

  return (
    <div className='relative' onClick={(e) => e.stopPropagation()} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-1.5 px-2 py-1 rounded text-xs transition-colors duration-200 select-none',
          isOpen ? 'bg-black/20' : 'hover:bg-black/10',
          currentThemeConfig.colors.text,
        )}
      >
        <currentThemeConfig.icon />
        <span>{currentThemeConfig.name}</span>
        <ChevronDown size={12} className={cn('transition-transform', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <div
          className={cn(
            'absolute right-0 top-full mt-1 w-32 py-1 rounded shadow-xl border z-50 overflow-hidden',
            currentThemeConfig.colors.headerBg,
            currentThemeConfig.colors.border,
          )}
        >
          {(Object.keys(TERMINAL_THEMES) as TerminalThemeKey[]).map((key) => (
            <ThemeOption
              key={key}
              className={cn(currentThemeKey === TERMINAL_THEME.LIGHT ? 'text-black' : 'text-white')}
              icon={TERMINAL_THEMES[key].icon}
              name={TERMINAL_THEMES[key].name}
              onClick={() => {
                setCurrentThemeKey(key);
                setIsOpen(false);
              }}
              isActive={currentThemeKey === key}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TerminalThemeSelector;

/** --------------------
 *  Sub-components
 *  -------------------- */

interface ThemeOptionProps extends React.HTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  name: string;
  isActive: boolean;
}

function ThemeOption({ className, icon: Icon, name, isActive, ...props }: ThemeOptionProps) {
  return (
    <button
      className={cn(
        'w-full text-left px-3 py-1.5 text-xs flex items-center gap-2 transition-colors',
        isActive ? 'bg-black/20 font-bold' : 'hover:bg-black/10',
        className,
      )}
      {...props}
    >
      <Icon size={14} />
      {name}
    </button>
  );
}
