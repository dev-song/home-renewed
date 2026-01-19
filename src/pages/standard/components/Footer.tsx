export default function Footer({ name }: { name: string }) {
  return (
    <footer className='bg-white border-t border-gray-200 py-12'>
      <div className='max-w-5xl mx-auto px-6 text-center text-gray-500'>
        <p>
          © {new Date().getFullYear()} {name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
