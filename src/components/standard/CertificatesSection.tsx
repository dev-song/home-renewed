import SectionLayout from './SectionLayout';
import SectionTitle from './SectionTitle';

interface Certificate {
  name: string;
  date: string;
}

const CERTIFICATES_SECTION_KEY = 'certificates';

export default function CertificatesSection({ certificates }: { certificates: Certificate[] }) {
  return (
    <SectionLayout id={CERTIFICATES_SECTION_KEY}>
      <SectionTitle title={CERTIFICATES_SECTION_KEY} />
      <div className='md:col-span-3 space-y-4'>
        {certificates.map((cert, index) => (
          <article
            key={index}
            className='flex flex-col md:flex-row md:items-center md:justify-between'
          >
            <h4 className='text-lg font-medium text-gray-900'>{cert.name}</h4>
            <span className='text-gray-500'>{cert.date}</span>
          </article>
        ))}
      </div>
    </SectionLayout>
  );
}
