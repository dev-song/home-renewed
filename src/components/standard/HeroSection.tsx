import { Mail, type LucideIcon } from 'lucide-react';

interface SocialLink {
  name: string;
  url: string;
  icon: LucideIcon;
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
      <div className='max-w-5xl mx-auto px-6 pt-16 pb-12 md:pb-16'>
        <Name name={hero.name} />
        <Title title={hero.title} />
        <Tagline tagline={hero.tagline} />

        <div className='flex flex-wrap gap-4'>
          {hero.socials.map((social) => (
            <SocialLink key={social.name} social={social} />
          ))}
          <EmailLink email={hero.email} />
        </div>
      </div>
    </header>
  );
}

/** --------------------
 *  Sub-components
 *  -------------------- */

interface NameProps {
  name: string;
}

function Name({ name }: NameProps) {
  return (
    <h1 className='text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4'>{name}</h1>
  );
}

interface TitleProps {
  title: string;
}

function Title({ title }: TitleProps) {
  return <h2 className='text-xl md:text-2xl text-gray-600 font-medium mb-2'>{title}</h2>;
}

interface TaglineProps {
  tagline: string;
}

function Tagline({ tagline }: TaglineProps) {
  return <p className='text-lg text-gray-600 leading-relaxed mb-8 max-w-2xl'>{tagline}</p>;
}

interface SocialLinkProps {
  social: SocialLink;
}

function SocialLink({ social }: SocialLinkProps) {
  return (
    <a
      className='inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors'
      href={social.url}
      target='_blank'
      rel='noopener noreferrer'
      data-umami-event={`${social.name} link button`}
    >
      <social.icon className='w-5 h-5' />
      <span className='font-medium'>{social.name}</span>
    </a>
  );
}

interface EmailLinkProps {
  email: string;
}

function EmailLink({ email }: EmailLinkProps) {
  return (
    <a
      className='inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors'
      href={`mailto:${email}`}
      data-umami-event='Email link button'
    >
      <Mail className='w-5 h-5' />
      <span className='font-medium'>Contact Me</span>
    </a>
  );
}
