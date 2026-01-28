import {
  STAGE3_COLOR_BY_INFO_TYPE,
  STAGE3_LEGEND_LABEL_BY_INFO_TYPE,
  STAGE3_ORDERED_INFO_TYPE,
} from '../constants';
import type { Stage3InfoType } from '../types';

function Stage3Legend() {
  return (
    <div className='z-10 absolute bottom-5 right-5 p-4 rounded-lg backdrop-blur-xs pointer-events-none bg-black/60 font-sans text-sm'>
      <Title title='Legend' />

      <ul className='flex flex-col gap-2'>
        {STAGE3_ORDERED_INFO_TYPE.map((infoType, idx) => (
          <Item key={idx} infoType={infoType} />
        ))}
      </ul>
    </div>
  );
}

export default Stage3Legend;

/** --------------------
 *  Sub-components
 *  -------------------- */

interface TitleProps {
  title: string;
}

function Title({ title }: TitleProps) {
  return (
    <h3 className='text-white font-bold mb-2 text-xs uppercase tracking-wider border-b border-gray-600 pb-1'>
      {title}
    </h3>
  );
}

interface ItemProps {
  infoType: Stage3InfoType;
}

function Item({ infoType }: ItemProps) {
  return (
    <li className='flex items-center gap-2'>
      <div
        className='w-3 h-3 rounded-xs'
        style={{ background: STAGE3_COLOR_BY_INFO_TYPE[infoType] }}
      />
      <span className='text-gray-200'>{STAGE3_LEGEND_LABEL_BY_INFO_TYPE[infoType]}</span>
    </li>
  );
}
