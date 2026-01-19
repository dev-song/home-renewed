interface AboutData {
  description: string[];
}

export default function AboutSection({ about }: { about: AboutData }) {
  return (
    <section id='about' className='grid md:grid-cols-4 gap-8'>
      <h3 className='text-xl font-bold uppercase tracking-wider text-gray-400'>About</h3>
      <div className='md:col-span-3'>
        {about.description.map((item, index) => (
          <p key={index} className='text-lg text-gray-700 leading-relaxed'>
            {item}
          </p>
        ))}
      </div>
    </section>
  );
}
