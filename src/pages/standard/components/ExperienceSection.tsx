interface Job {
  company: string;
  role: string;
  period: string;
  description: string;
}

export default function ExperienceSection({ experience }: { experience: Job[] }) {
  return (
    <section id='experience' className='grid md:grid-cols-4 gap-8'>
      <h3 className='text-xl font-bold uppercase tracking-wider text-gray-400'>Experience</h3>
      <div className='md:col-span-3 space-y-12'>
        {experience.map((job, index) => (
          <div key={index} className='group'>
            <div className='flex flex-col md:flex-row md:items-baseline md:justify-between mb-2'>
              <h4 className='text-2xl font-bold text-gray-900'>{job.role}</h4>
              <span className='text-gray-500 font-medium'>{job.period}</span>
            </div>
            <div className='text-xl text-gray-700 mb-4'>{job.company}</div>
            <p className='text-gray-600 leading-relaxed'>{job.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
