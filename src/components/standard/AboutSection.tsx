import SectionLayout from './SectionLayout';
import SectionTitle from './SectionTitle';

interface AboutData {
  description: string[];
}

const ABOUT_SECTION_KEY = 'about';

export default function AboutSection({ about }: { about: AboutData }) {
  return (
    <SectionLayout id={ABOUT_SECTION_KEY}>
      <SectionTitle title={ABOUT_SECTION_KEY} />
      <div className='md:col-span-3'>
        {about.description.map((item, index) => (
          <p key={index} className='text-gray-700 leading-relaxed'>
            {item}
          </p>
        ))}
      </div>
    </SectionLayout>
  );
}
