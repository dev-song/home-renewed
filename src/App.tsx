import { Routes, Route, Link, useLocation } from 'react-router';
import ResumePage from './pages/standard/ResumePage';
import InteractivePage from './pages/interactive/InteractivePage';
import { Download, Globe } from 'lucide-react';
import resumePdf from './assets/resume.pdf';
import { BROWSER_LANGUAGE, useLanguageStore } from './store/languageStore';

function App() {
  const location = useLocation();
  const isInteractive = location.pathname.startsWith('/interactive');
  const { language, toggleLanguage } = useLanguageStore();

  return (
    <>
      {/* Temporary Navigation for Dev */}
      <nav className='fixed top-4 right-4 z-50'>
        <div className='flex items-center bg-black/50 backdrop-blur px-4 py-1 rounded-full border border-white/10 shadow-lg gap-1'>
          {isInteractive ? (
            <Link
              to='/'
              className='text-sm font-medium text-white/80 hover:text-white transition-colors px-2'
              data-umami-event='Standard resume button'
            >
              Standard
            </Link>
          ) : (
            <Link
              to='/interactive'
              className='text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors'
              data-umami-event='Interactive resume button'
            >
              Interactive
            </Link>
          )}

          <div className='w-px h-3.5 bg-white/20 mx-2' />

          <button
            onClick={toggleLanguage}
            className='flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white transition-colors cursor-pointer'
            data-umami-event='Language toggle button'
          >
            <Globe size={14} />
            <span>{LANGUAGE_LABEL[language]}</span>
          </button>

          <div className='w-px h-3.5 bg-white/20 mx-2' />

          <a
            href={resumePdf}
            download='웹 프론트엔드 개발자 - 송상수.pdf'
            className='flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white transition-colors'
            data-umami-event='PDF download button'
          >
            <Download size={14} />
            <span className='cursor-pointer'>PDF</span>
          </a>
        </div>
      </nav>

      <Routes>
        <Route path='/' element={<ResumePage />} />
        <Route path='/interactive' element={<InteractivePage />} />
      </Routes>
    </>
  );
}

export default App;

const LANGUAGE_LABEL = {
  [BROWSER_LANGUAGE.KOREAN]: '한국어',
  [BROWSER_LANGUAGE.ENGLISH]: 'English',
};
