import JsonView from '@uiw/react-json-view';
import { resumeData } from '../../data/resumeData';
import { lightTheme } from '@uiw/react-json-view/light';
import { darkTheme } from '@uiw/react-json-view/dark';
import { nordTheme } from '@uiw/react-json-view/nord';
import { githubLightTheme } from '@uiw/react-json-view/githubLight';
import { githubDarkTheme } from '@uiw/react-json-view/githubDark';
import { vscodeTheme } from '@uiw/react-json-view/vscode';
import { gruvboxTheme } from '@uiw/react-json-view/gruvbox';
import { monokaiTheme } from '@uiw/react-json-view/monokai';
import { basicTheme } from '@uiw/react-json-view/basic';
import { useState } from 'react';
import Highlighter from 'react-highlight-words';

const JSON_FORMAT_MODE = {
  MINIFY: 'minify',
  BEAUTIFY: 'beautify',
} as const;
type JsonFormatMode = (typeof JSON_FORMAT_MODE)[keyof typeof JSON_FORMAT_MODE];

const JSON_VIEW_THEME_TYPE = {
  BASIC: 'basic',
  LIGHT: 'light',
  DARK: 'dark',
  NORD: 'nord',
  GITHUB_LIGHT: 'githubLight',
  GITHUB_DARK: 'githubDark',
  VSCODE: 'vscode',
  GRUVBOX: 'gruvbox',
  MONOKAI: 'monokai',
};
const jsonViewThemeTypes = Object.values(JSON_VIEW_THEME_TYPE);

const JSON_VIEW_THEME = {
  [JSON_VIEW_THEME_TYPE.BASIC]: basicTheme,
  [JSON_VIEW_THEME_TYPE.LIGHT]: lightTheme,
  [JSON_VIEW_THEME_TYPE.DARK]: darkTheme,
  [JSON_VIEW_THEME_TYPE.NORD]: nordTheme,
  [JSON_VIEW_THEME_TYPE.GITHUB_LIGHT]: githubLightTheme,
  [JSON_VIEW_THEME_TYPE.GITHUB_DARK]: githubDarkTheme,
  [JSON_VIEW_THEME_TYPE.VSCODE]: vscodeTheme,
  [JSON_VIEW_THEME_TYPE.GRUVBOX]: gruvboxTheme,
  [JSON_VIEW_THEME_TYPE.MONOKAI]: monokaiTheme,
};

const LABEL_BY_JSON_VIEW_THEME = {
  [JSON_VIEW_THEME_TYPE.BASIC]: 'Basic',
  [JSON_VIEW_THEME_TYPE.LIGHT]: 'Light',
  [JSON_VIEW_THEME_TYPE.DARK]: 'Dark',
  [JSON_VIEW_THEME_TYPE.NORD]: 'Nord',
  [JSON_VIEW_THEME_TYPE.GITHUB_LIGHT]: 'GitHub Light',
  [JSON_VIEW_THEME_TYPE.GITHUB_DARK]: 'GitHub Dark',
  [JSON_VIEW_THEME_TYPE.VSCODE]: 'VSCode',
  [JSON_VIEW_THEME_TYPE.GRUVBOX]: 'Gruvbox',
  [JSON_VIEW_THEME_TYPE.MONOKAI]: 'Monokai',
};

export default function Stage1() {
  const [mode, setMode] = useState<JsonFormatMode>(JSON_FORMAT_MODE.BEAUTIFY);
  const [searchTerm, setSearchTerm] = useState('');
  const minifiedJson = JSON.stringify(resumeData);
  const [currentTheme, setCurrentTheme] = useState(JSON_VIEW_THEME_TYPE.VSCODE);

  return (
    <div className='flex flex-col h-full overflow-hidden'>
      <header className='flex flex-col gap-2 md:flex-row md:items-center md:gap-4 p-4'>
        <input
          type='text'
          placeholder='Search keys or values...'
          className='w-80 p-2 bg-[#161b22] border border-gray-600 rounded text-gray-300 focus:outline-none focus:border-blue-500'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className='flex items-center gap-2'>
          <select
            value={currentTheme}
            onChange={(e) => setCurrentTheme(e.target.value)}
            className='w-40 p-2 bg-[#161b22] border border-gray-600 rounded text-gray-300 focus:outline-none focus:border-blue-500'
          >
            {jsonViewThemeTypes.map((themeType) => (
              <option key={themeType} value={themeType}>
                {LABEL_BY_JSON_VIEW_THEME[themeType]}
              </option>
            ))}
          </select>

          <div className='relative'>
            {/* 배경 강조판 */}
            <div
              style={{
                position: 'absolute',
                width: mode === JSON_FORMAT_MODE.MINIFY ? '96px' : '64px',
                height: '100%',
                background: '#fff',
                opacity: 0.5,
                transition: 'all 0.3s ease-out',
                transform: mode === JSON_FORMAT_MODE.MINIFY ? 'translateX(0)' : 'translateX(96px)',
              }}
            />
            <button className='w-24' onClick={() => setMode(JSON_FORMAT_MODE.MINIFY)}>
              Minified
            </button>
            <button className='w-16' onClick={() => setMode(JSON_FORMAT_MODE.BEAUTIFY)}>
              Pretty
            </button>
          </div>
        </div>
      </header>
      <div className='flex-1 px-4 overflow-auto'>
        {mode === JSON_FORMAT_MODE.BEAUTIFY ? (
          <JsonView value={resumeData} style={JSON_VIEW_THEME[currentTheme]}>
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
