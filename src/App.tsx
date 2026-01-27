import { Routes, Route, useLocation } from 'react-router';
import StandardResume from './pages/StandardResume';
import InteractiveResume from './pages/InteractiveResume';
import ResumeSwitchLink from './components/ResumeSwitchLink';
import { RESUME_MODE } from './constants';
import NavSeparator from './components/NavSeparator';
import LanguageSwitchButton from './components/LanguageSwitchButton';
import PDFDownloadLink from './components/PDFDownloadLink';

function App() {
  const location = useLocation();
  const isInteractive = location.pathname.startsWith('/interactive');

  return (
    <>
      <nav className='fixed top-4 right-4 z-50 flex items-center gap-1 px-4 py-1 rounded-full border border-white/10 bg-black/70 backdrop-blur shadow-lg'>
        <ResumeSwitchLink mode={!isInteractive ? RESUME_MODE.STANDARD : RESUME_MODE.INTERACTIVE} />

        <NavSeparator />

        <LanguageSwitchButton />
        <NavSeparator />

        <PDFDownloadLink />
      </nav>

      <Routes>
        <Route path='/' element={<StandardResume />} />
        <Route path='/interactive' element={<InteractiveResume />} />
      </Routes>
    </>
  );
}

export default App;
