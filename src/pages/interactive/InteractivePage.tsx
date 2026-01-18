export default function InteractivePage() {
  return (
    <div className='w-full h-screen bg-black text-white relative overflow-hidden'>
      {/* Overlay UI */}
      <div className='absolute top-0 left-0 p-8 z-10 pointer-events-none'>
        <h1 className='text-xl font-mono text-green-400 mb-2'>&gt; INIT_SYSTEM...</h1>
        <p className='text-sm text-gray-400'>Interactive Mode (Stage 1: JSON)</p>
      </div>

      {/* Main Content Area (will be Canvas) */}
      <div className='flex items-center justify-center h-full'>
        <div className='border border-green-500/30 bg-green-900/10 p-12 rounded-lg backdrop-blur text-center'>
          <p className='font-mono text-green-300 animate-pulse'>
            [ 3D SYSTEM ONLINE ]
            <br />
            Initializing Stage 1...
          </p>
        </div>
      </div>

      {/* Controls Overlay */}
      <div className='absolute bottom-8 right-8 z-10'>
        <button className='bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full backdrop-blur transition-all border border-white/20'>
          Next Stage &rarr;
        </button>
      </div>
    </div>
  );
}
