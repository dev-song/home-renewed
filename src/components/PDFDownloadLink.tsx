import { Download } from 'lucide-react';
import { BROWSER_LANGUAGE, useLanguageStore } from '../store/languageStore';
import resumePdf from '../assets/resume.pdf';

export default function PDFDownloadLink() {
  const { language } = useLanguageStore();
  return (
    <a
      href={resumePdf}
      download={PDF_FILENAME[language]}
      className='flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white transition-colors'
      data-umami-event='PDF download button'
    >
      <Download size={14} />
      <span className='cursor-pointer'>PDF</span>
    </a>
  );
}

const PDF_FILENAME = {
  [BROWSER_LANGUAGE.KOREAN]: '웹 프론트엔드 개발자 이력서 - 송상수.pdf',
  [BROWSER_LANGUAGE.ENGLISH]: 'Web Frontend Developer Resume - Sangsu Song.pdf',
};
