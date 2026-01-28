import { TerminalProvider } from './TerminalContext';
import Terminal from './Terminal';

export default function Stage2() {
  return (
    <TerminalProvider>
      <Terminal />
    </TerminalProvider>
  );
}
