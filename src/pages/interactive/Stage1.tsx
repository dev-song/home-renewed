import JsonView from '@uiw/react-json-view';
import { resumeData } from '../../data/resumeData';
import { githubDarkTheme } from '@uiw/react-json-view/githubDark';

export default function Stage1() {
  return (
    <div className='grid h-full overflow-auto'>
      <JsonView className='w-full h-full' value={resumeData} style={githubDarkTheme} />
    </div>
  );
}
