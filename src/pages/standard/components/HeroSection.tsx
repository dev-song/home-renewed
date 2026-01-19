import { Mail } from 'lucide-react';
import type { ElementType } from 'react';

interface SocialLink {
  name: string;
  url: string;
  icon: ElementType;
}

interface HeroData {
  name: string;
  title: string;
  tagline: string;
  socials: SocialLink[];
  email: string;
}

export default function HeroSection({ hero }: { hero: HeroData }) {
  return (
    <header className='bg-white border-b border-gray-200'>
      <div className='max-w-5xl mx-auto px-6 py-16 md:py-24'>
        <div className='max-w-3xl'>
          <h1 className='text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6'>
            {hero.name}
          </h1>
          <h2 className='text-2xl md:text-3xl text-gray-600 font-medium mb-6'>{hero.title}</h2>
          <p className='text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl'>{hero.tagline}</p>

          <div className='flex flex-wrap gap-4'>
            {hero.socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors'
              >
                <social.icon className='w-5 h-5' />
                <span className='font-medium'>{social.name}</span>
              </a>
            ))}
            <a
              href={`mailto:${hero.email}`}
              className='inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors'
            >
              <Mail className='w-5 h-5' />
              <span className='font-medium'>Contact Me</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
