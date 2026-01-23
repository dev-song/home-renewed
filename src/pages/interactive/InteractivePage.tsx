import { useCallback, lazy, Suspense, useState } from 'react';
import Stage1 from './Stage1';
import Stage2 from './Stage2';
const Stage3 = lazy(() => import('./Stage3'));

export default function InteractivePage() {
  const [stage, setStage] = useState(1);

  const goToNextStage = useCallback(() => {
    setStage((prev) => prev + 1);
  }, []);

  return (
    <main className='w-full h-screen p-4 bg-black text-white relative overflow-hidden'>
      <Stage stage={stage} />

      {stage < 3 && (
        <button
          className='z-10 absolute bottom-8 right-8 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full backdrop-blur transition-all border border-white/20 cursor-pointer'
          onClick={goToNextStage}
          data-umami-event='Next interactive resume stage button'
        >
          Next Stage &rarr;
        </button>
      )}
    </main>
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
    case 3:
      return (
        <Suspense
          fallback={
            <div className='flex items-center justify-center h-full text-white/50'>
              Loading 3D Scene...
            </div>
          }
        >
          <Stage3 />
        </Suspense>
      );
    default:
      return null;
  }
}
