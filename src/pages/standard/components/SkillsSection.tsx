interface SkillCategory {
  category: string;
  items: string[];
}

export default function SkillsSection({ skills }: { skills: SkillCategory[] }) {
  return (
    <section id='skills' className='grid md:grid-cols-4 gap-8'>
      <h3 className='text-xl font-bold uppercase tracking-wider text-gray-400'>Skills</h3>
      <div className='md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8'>
        {skills.map((category, index) => (
          <div key={index}>
            <h4 className='font-bold text-gray-900 mb-4'>{category.category}</h4>
            <div className='flex flex-wrap gap-2'>
              {category.items.map((item) => (
                <span
                  key={item}
                  className='bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium'
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
