interface Certificate {
  name: string;
  date: string;
}

export default function CertificatesSection({ certificates }: { certificates: Certificate[] }) {
  return (
    <section id='certificates' className='grid md:grid-cols-4 gap-8'>
      <h3 className='text-xl font-bold uppercase tracking-wider text-gray-400'>Certificates</h3>
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
    </section>
  );
}
