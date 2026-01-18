import { FileText } from 'lucide-react';

export default function ResumePage() {
  return (
    <div className='min-h-screen bg-white text-gray-900 p-8 max-w-4xl mx-auto'>
      <header className='mb-12 border-b pb-8'>
        <h1 className='text-4xl font-bold mb-4'>Sangsu's Portfolio</h1>
        <div className='flex items-center gap-2 text-gray-600'>
          <FileText className='w-5 h-5' />
          <span>Front-end Developer</span>
        </div>
      </header>

      <main className='space-y-12'>
        <section>
          <h2 className='text-2xl font-semibold mb-4 border-l-4 border-black pl-3'>About</h2>
          <p className='text-gray-700 leading-relaxed'>
            Passionate about creating immersive web experiences. (This is a skeleton for the
            Standard Resume view).
          </p>
        </section>

        <section>
          <h2 className='text-2xl font-semibold mb-4 border-l-4 border-black pl-3'>Experience</h2>
          <div className='space-y-6'>
            <div className='bg-gray-50 p-6 rounded-lg'>
              <h3 className='font-bold'>Senior Frontend Developer</h3>
              <p className='text-sm text-gray-500 mb-2'>2023 - Present</p>
              <p>Building high-performance web applications.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
