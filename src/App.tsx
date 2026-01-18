import { Routes, Route, Link } from 'react-router';
import ResumePage from './pages/standard/ResumePage';
import InteractivePage from './pages/interactive/InteractivePage';

function App() {
  return (
    <>
      {/* Temporary Navigation for Dev */}
      <nav className='fixed top-4 right-4 z-50 flex gap-4 bg-black/50 backdrop-blur px-4 py-2 rounded-full border border-white/10'>
        <Link to='/' className='text-sm text-white/80 hover:text-white transition-colors'>
          Standard
        </Link>
        <div className='w-px h-4 bg-white/20 my-auto' />
        <Link
          to='/interactive'
          className='text-sm text-emerald-400 hover:text-emerald-300 transition-colors'
        >
          Interactive
        </Link>
      </nav>

      <Routes>
        <Route path='/' element={<ResumePage />} />
        <Route path='/interactive' element={<InteractivePage />} />
      </Routes>
    </>
  );
}

export default App;
