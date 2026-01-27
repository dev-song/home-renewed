import { Link } from 'react-router';
import { RESUME_MODE, type ResumeMode } from '../constants';
import { cn } from '../lib/utils';

export default function ResumeSwitchLink({ mode }: { mode: ResumeMode }) {
  return (
    <Link
      to={RESUME_PATH_BY_MODE[mode]}
      className={cn(
        'transition-colors text-sm font-medium capitalize',
        mode === RESUME_MODE.INTERACTIVE
          ? 'text-emerald-300 hover:text-emerald-200'
          : 'text-white/80 hover:text-white',
      )}
      data-umami-event='Standard resume button'
    >
      {mode}
    </Link>
  );
}

const RESUME_PATH_BY_MODE = {
  [RESUME_MODE.STANDARD]: '/',
  [RESUME_MODE.INTERACTIVE]: '/interactive',
};
