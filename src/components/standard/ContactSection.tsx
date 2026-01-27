import { Mail, Phone, MapPin, type LucideIcon } from 'lucide-react';
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
        <ContactItem icon={Mail}>
          <a href={`mailto:${contact.email}`} className='hover:text-gray-300 transition-colors'>
            {contact.email}
          </a>
        </ContactItem>
        <ContactItem icon={Phone}>{contact.phone}</ContactItem>
        <ContactItem icon={MapPin}>{contact.location}</ContactItem>
      </div>
    </SectionLayout>
  );
}

/** --------------------
 *  Sub-components
 *  -------------------- */

interface ContactItemProps extends React.PropsWithChildren {
  icon: LucideIcon;
}

function ContactItem({ icon: Icon, children }: ContactItemProps) {
  return (
    <div className='flex items-center gap-3'>
      <Icon className='w-4 h-4 text-gray-400' />
      <span>{children}</span>
    </div>
  );
}
