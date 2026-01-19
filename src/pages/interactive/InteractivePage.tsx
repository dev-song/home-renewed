import { useCallback, useState } from 'react';
import Stage1 from './Stage1';
import Stage2 from './Stage2';

export default function InteractivePage() {
  const [stage, setStage] = useState(1);

  const goToNextStage = useCallback(() => setStage((prev) => prev + 1), []);

  return (
    <div className='w-full h-screen p-4 bg-black text-white relative overflow-hidden'>
      <Stage stage={stage} />

      <div className='absolute bottom-8 right-8 z-10'>
        <button
          className='bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full backdrop-blur transition-all border border-white/20 cursor-pointer'
          onClick={goToNextStage}
        >
          Next Stage &rarr;
        </button>
      </div>
    </div>
  );
}

/** --------------------
 *  Sub-components
 *  -------------------- */

function Stage({ stage }: { stage: number }) {
  switch (stage) {
    case 1:
      return <Stage1 />;
    case 2:
      return <Stage2 />;
    default:
      return null;
  }
}
