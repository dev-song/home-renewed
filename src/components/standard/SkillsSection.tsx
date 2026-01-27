import SectionLayout from './SectionLayout';
import SectionTitle from './SectionTitle';

interface SkillCategory {
  category: string;
  items: string[];
}

const SKILLS_SECTION_KEY = 'skills';

export default function SkillsSection({ skills }: { skills: SkillCategory[] }) {
  return (
    <SectionLayout id={SKILLS_SECTION_KEY}>
      <SectionTitle title={SKILLS_SECTION_KEY} />
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:col-span-3 md:gap-8'>
        {skills.map(({ category, items }, index) => (
          <SkillCategory key={index} category={category} skills={items} />
        ))}
      </div>
    </SectionLayout>
  );
}

/** --------------------
 *  Sub-components
 *  -------------------- */

interface SkillCategoryProps {
  category: string;
  skills: string[];
}

function SkillCategory({ category, skills }: SkillCategoryProps) {
  return (
    <article>
      <CategoryName name={category} />
      <ul className='flex flex-wrap gap-2'>
        {skills.map((skill) => (
          <Skill key={skill} skill={skill} />
        ))}
      </ul>
    </article>
  );
}

/** --------------------
 *  Primitives
 *  -------------------- */

interface CategoryNameProps {
  name: string;
}

function CategoryName({ name }: CategoryNameProps) {
  return <h4 className='font-bold text-gray-900 mb-2'>{name}</h4>;
}

interface SkillProps {
  skill: string;
}

function Skill({ skill }: SkillProps) {
  return (
    <li className='bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium'>
      {skill}
    </li>
  );
}
