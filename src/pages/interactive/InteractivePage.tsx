import { useCallback } from 'react';
import { useParams, useNavigate } from 'react-router';
import Stage1 from './Stage1';
import Stage2 from './Stage2';
import Stage3 from './Stage3';

export default function InteractivePage() {
  const { stageId } = useParams();
  const navigate = useNavigate();
  const stage = Number(stageId) || 1;

  const goToNextStage = useCallback(() => {
    navigate(`/interactive/${stage + 1}`);
  }, [stage, navigate]);

  return (
    <main className='w-full h-screen p-4 bg-black text-white relative overflow-hidden'>
      <Stage stage={stage} />

      {stage < 3 && (
        <button
          className='z-10 absolute bottom-8 right-8 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full backdrop-blur transition-all border border-white/20 cursor-pointer'
          onClick={goToNextStage}
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
      return <Stage3 />;
    default:
      return null;
  }
}
