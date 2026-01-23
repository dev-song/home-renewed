import { Mail, Phone, MapPin } from 'lucide-react';
import SectionLayout from './SectionLayout';
import SectionTitle from './SectionTitle';

interface ContactData {
  email: string;
  phone: string;
  location: string;
}

const CONTACT_SECTION_KEY = 'contact';

export default function ContactSection({ contact }: { contact: ContactData }) {
  return (
    <SectionLayout id={CONTACT_SECTION_KEY}>
      <SectionTitle title={CONTACT_SECTION_KEY} />
      <div className='md:col-span-3 bg-gray-900 text-white rounded-2xl p-6 space-y-4'>
        <div className='flex items-center gap-3'>
          <Mail className='w-4 h-4 text-gray-400' />
          <a href={`mailto:${contact.email}`} className='hover:text-gray-300 transition-colors'>
            {contact.email}
          </a>
        </div>
        <div className='flex items-center gap-3'>
          <Phone className='w-4 h-4 text-gray-400' />
          <span>{contact.phone}</span>
        </div>
        <div className='flex items-center gap-3'>
          <MapPin className='w-4 h-4 text-gray-400' />
          <span>{contact.location}</span>
        </div>
      </div>
    </SectionLayout>
  );
}
