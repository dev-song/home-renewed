import { Mail, Phone, MapPin } from 'lucide-react';

interface ContactData {
  email: string;
  phone: string;
  location: string;
}

export default function ContactSection({ contact }: { contact: ContactData }) {
  return (
    <section id='contact' className='grid md:grid-cols-4 gap-8'>
      <h3 className='text-xl font-bold uppercase tracking-wider text-gray-400'>Contact</h3>
      <div className='md:col-span-3'>
        <div className='bg-gray-900 text-white rounded-2xl p-8 md:p-12'>
          <h4 className='text-2xl font-bold mb-6'>Let's work together</h4>
          <p className='text-gray-300 mb-8 max-w-lg'>
            I'm currently available for freelance work or full-time opportunities. If you have a
            project that needs some creative attention, I'd love to hear from you.
          </p>

          <div className='space-y-4'>
            <div className='flex items-center gap-3 text-lg'>
              <Mail className='w-6 h-6 text-gray-400' />
              <a href={`mailto:${contact.email}`} className='hover:text-gray-300 transition-colors'>
                {contact.email}
              </a>
            </div>
            <div className='flex items-center gap-3 text-lg'>
              <Phone className='w-6 h-6 text-gray-400' />
              <span>{contact.phone}</span>
            </div>
            <div className='flex items-center gap-3 text-lg'>
              <MapPin className='w-6 h-6 text-gray-400' />
              <span>{contact.location}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
