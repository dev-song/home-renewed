import { cn } from '../../../../lib/utils';
import { useLanguageStore } from '../../../../store/languageStore';
import {
  TERMINAL_MAX_PROGRESS,
  TERMINAL_PROGRESS_BAR_WIDTH,
  TERMINAL_TRIVIA_AND_CAREER_TIMELINE,
} from '../constants';
import { useTerminalContext } from '../TerminalContext';
import { TerminalProgressProvider, useTerminalProgressContext } from './ProgressContext';

type TerminalProgressWithTriviaProps = React.HTMLAttributes<HTMLDivElement>;

function TerminalProgressWithTrivia({ className, ...props }: TerminalProgressWithTriviaProps) {
  return (
    <TerminalProgressProvider>
      <div className={cn('flex flex-col gap-1', className)} {...props}>
        <Progress />
        <Trivia />
      </div>
    </TerminalProgressProvider>
  );
}

export default TerminalProgressWithTrivia;

/** --------------------
 *  Sub-components
 *  -------------------- */

function Progress() {
  const { currentThemeConfig } = useTerminalContext();
  const { progress } = useTerminalProgressContext();

  return (
    <div className='flex items-center'>
      <span className={currentThemeConfig.colors.muted}>Progress:</span>
      <span className={cn('ml-1', currentThemeConfig.colors.muted)}>
        {formatProgress(progress)}%
      </span>
      <div className='flex w-full h-2 ml-2'>
        {Array.from({
          length: Math.floor(progress / TERMINAL_PROGRESS_BAR_WIDTH),
        }).map((_, index) => (
          <div
            key={index}
            className={cn(
              'h-2 not-last:border-r transition-colors duration-300',
              currentThemeConfig.colors.progressBar,
              currentThemeConfig.colors.progressBarBg,
            )}
            style={{ width: `${TERMINAL_PROGRESS_BAR_WIDTH}%` }}
          />
        ))}
      </div>
    </div>
  );
}

type TriviaProps = React.HTMLAttributes<HTMLParagraphElement>;

function Trivia({ className, ...props }: TriviaProps) {
  const { currentThemeConfig } = useTerminalContext();
  const { progress } = useTerminalProgressContext();
  const { language } = useLanguageStore();

  const timelineByLanguage = TERMINAL_TRIVIA_AND_CAREER_TIMELINE[language];
  const lastTriviaByProgress =
    timelineByLanguage[
      Math.ceil(progress / (TERMINAL_MAX_PROGRESS / timelineByLanguage.length)) - 1
    ];

  return (
    <p className={cn(currentThemeConfig.colors.muted, className)} {...props}>
      {lastTriviaByProgress}
    </p>
  );
}

/** --------------------
 *  Utils
 *  -------------------- */

function formatProgress(progress: number) {
  if (progress < 0) throw new Error('progress should exceed 0');
  if (progress > 100) throw new Error('progress should not exceed 100');
  if (progress < 100) return progress.toString().padStart(3, ' ');
  return progress.toString();
}
