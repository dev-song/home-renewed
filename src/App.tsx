import { Routes, Route, Link } from 'react-router';
import ResumePage from './pages/standard/ResumePage';
import InteractivePage from './pages/interactive/InteractivePage';
import { Download } from 'lucide-react';

function App() {
  return (
    <>
      {/* Temporary Navigation for Dev */}
      <nav className='fixed top-4 right-4 z-50 text-right'>
        <div className='flex gap-4 bg-black/50 backdrop-blur px-4 py-2 rounded-full border border-white/10'>
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
        </div>

        <a
          href='/resume.pdf'
          download='웹 프론트엔드 개발자 - 송상수.pdf'
          className='inline-flex items-center gap-2 mt-2 bg-black/50 backdrop-blur px-4 py-2 rounded-full border border-white/10 text-sm text-white/80 hover:text-white transition-colors'
        >
          <Download size={16} />
          <button className='cursor-pointer'>PDF</button>
        </a>
      </nav>

      <Routes>
        <Route path='/' element={<ResumePage />} />
        <Route path='/interactive' element={<InteractivePage />} />
      </Routes>
    </>
  );
}

export default App;
