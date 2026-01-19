interface Education {
  school: string;
  degree: string;
  period: string;
}

export default function EducationSection({ education }: { education: Education[] }) {
  return (
    <section id='education' className='grid md:grid-cols-4 gap-8'>
      <h3 className='text-xl font-bold uppercase tracking-wider text-gray-400'>Education</h3>
      <div className='md:col-span-3 space-y-8'>
        {education.map((edu, index) => (
          <div key={index} className='group'>
            <div className='flex flex-col md:flex-row md:items-baseline md:justify-between mb-1'>
              <h4 className='text-xl font-bold text-gray-900'>{edu.school}</h4>
              <span className='text-gray-500 font-medium'>{edu.period}</span>
            </div>
            <p className='text-lg text-gray-700'>{edu.degree}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
