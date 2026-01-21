import { Routes, Route, Link, useLocation, Navigate } from 'react-router';
import ResumePage from './pages/standard/ResumePage';
import InteractivePage from './pages/interactive/InteractivePage';
import { Download } from 'lucide-react';
import resumePdf from './assets/resume.pdf';

function App() {
  const location = useLocation();
  const isInteractive = location.pathname.startsWith('/interactive');

  return (
    <>
      {/* Temporary Navigation for Dev */}
      <nav className='fixed top-4 right-4 z-50 text-right'>
        <div className='flex gap-4 bg-black/50 backdrop-blur px-4 py-2 rounded-full border border-white/10'>
          {isInteractive ? (
            <Link to='/' className='text-sm text-white/80 hover:text-white transition-colors'>
              Standard
            </Link>
          ) : (
            <Link
              to='/interactive/1'
              className='text-sm text-emerald-400 hover:text-emerald-300 transition-colors'
            >
              Interactive
            </Link>
          )}
        </div>

        <a
          href={resumePdf}
          download='웹 프론트엔드 개발자 - 송상수.pdf'
          className='inline-flex items-center gap-2 mt-2 bg-black/50 backdrop-blur px-4 py-2 rounded-full border border-white/10 text-sm text-white/80 hover:text-white transition-colors'
        >
          <Download size={16} />
          <button className='cursor-pointer'>PDF</button>
        </a>
      </nav>

      <Routes>
        <Route path='/' element={<ResumePage />} />
        <Route path='/interactive' element={<Navigate to='/interactive/1' replace />} />
        <Route path='/interactive/:stageId' element={<InteractivePage />} />
      </Routes>
    </>
  );
}

export default App;
