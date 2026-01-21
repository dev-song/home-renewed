import JsonView from '@uiw/react-json-view';
import { resumeData } from '../../data/resumeData';
import { vscodeTheme } from '@uiw/react-json-view/vscode';
import { useState } from 'react';
import Highlighter from 'react-highlight-words';

export default function Stage1() {
  const [mode, setMode] = useState<'minified' | 'pretty'>('pretty');
  const [searchTerm, setSearchTerm] = useState('');
  const minifiedJson = JSON.stringify(resumeData);

  return (
    <div className='flex flex-col h-full overflow-hidden'>
      <div className='flex items-center gap-4 p-4 border-b border-gray-700 bg-[#0d1117]'>
        <input
          type='text'
          placeholder='Search keys or values...'
          className='w-80 p-2 bg-[#161b22] border border-gray-600 rounded text-gray-300 focus:outline-none focus:border-blue-500'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className='relative'>
          {/* 배경 강조판 */}
          <div
            style={{
              position: 'absolute',
              width: mode === 'minified' ? '96px' : '64px',
              height: '100%',
              background: '#fff',
              opacity: 0.5,
              transition: 'all 0.3s ease-out',
              transform: mode === 'minified' ? 'translateX(0)' : 'translateX(96px)',
            }}
          />
          <button className='w-24' onClick={() => setMode('minified')}>
            Minified
          </button>
          <button className='w-16' onClick={() => setMode('pretty')}>
            Pretty
          </button>
        </div>
      </div>
      <div className='flex-1 p-4 overflow-auto bg-[#0d1117]'>
        {mode === 'pretty' ? (
          <JsonView value={resumeData} style={vscodeTheme}>
            <JsonView.String
              render={(props, { type, value }) => (
                <span {...props}>
                  {type === 'type' ? (
                    props['data-type']
                  ) : (
                    <Highlighter
                      textToHighlight={`"${value}"`}
                      searchWords={[searchTerm]}
                      autoEscape
                    />
                  )}
                </span>
              )}
            />
          </JsonView>
        ) : (
          <span className='text-orange-300/75 text-sm'>{minifiedJson}</span>
        )}
      </div>
    </div>
  );
}
