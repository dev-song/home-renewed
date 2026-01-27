export default function Footer({ name }: { name: string }) {
  return (
    <footer className='bg-white border-t border-gray-200 py-2'>
      <p className='max-w-5xl mx-auto px-6 text-center text-gray-500'>
        © {new Date().getFullYear()} {name}. All rights reserved.
      </p>
    </footer>
  );
}
