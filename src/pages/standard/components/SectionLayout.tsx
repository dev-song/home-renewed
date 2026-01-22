function SectionLayout({ id, children }: React.HTMLAttributes<HTMLElement>) {
  return (
    <section id={id} className='grid gap-4 md:grid-cols-4 md:gap-8'>
      {children}
    </section>
  );
}

export default SectionLayout;
