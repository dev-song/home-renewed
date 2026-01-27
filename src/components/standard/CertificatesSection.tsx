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
          <Certificate key={index} certificate={cert} />
        ))}
      </div>
    </SectionLayout>
  );
}

/** --------------------
 *  Sub-components
 *  -------------------- */

interface CertificateProps {
  certificate: Certificate;
}

function Certificate({ certificate }: CertificateProps) {
  return (
    <article className='flex flex-col md:flex-row md:items-center md:justify-between'>
      <CertificateName name={certificate.name} />
      <CertificateDate date={certificate.date} />
    </article>
  );
}

/** --------------------
 *  Primitives
 *  -------------------- */

interface CertificateNameProps {
  name: string;
}

function CertificateName({ name }: CertificateNameProps) {
  return <h4 className='text-lg font-medium text-gray-900'>{name}</h4>;
}

interface CertificateDateProps {
  date: string;
}

function CertificateDate({ date }: CertificateDateProps) {
  return <span className='text-gray-500'>{date}</span>;
}
