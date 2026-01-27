import { Link } from 'react-router';
import { RESUME_MODE, type ResumeMode } from '../constants';
import { cn } from '../lib/utils';

interface ResumeSwitchLinkProps {
  mode: ResumeMode;
}

export default function ResumeSwitchLink({ mode }: ResumeSwitchLinkProps) {
  return (
    <Link
      to={SWITCH_PATH_BY_RESUME_MODE[mode]}
      className={cn(
        'transition-colors text-sm font-medium capitalize',
        mode === RESUME_MODE.STANDARD
          ? 'text-emerald-300 hover:text-emerald-200'
          : 'text-white/80 hover:text-white',
      )}
      data-umami-event='Standard resume button'
    >
      {SWITCH_BUTTON_LABEL_BY_RESUME_MODE[mode]}
    </Link>
  );
}

const SWITCH_PATH_BY_RESUME_MODE = {
  [RESUME_MODE.STANDARD]: '/interactive',
  [RESUME_MODE.INTERACTIVE]: '/',
};

const SWITCH_BUTTON_LABEL_BY_RESUME_MODE = {
  [RESUME_MODE.STANDARD]: 'Interactive',
  [RESUME_MODE.INTERACTIVE]: 'Standard',
};
