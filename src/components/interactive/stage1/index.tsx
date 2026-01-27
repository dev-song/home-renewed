import JsonView from '@uiw/react-json-view';
import { motion } from 'motion/react';
import { resumeData } from '../../../data/resumeData';
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
import { useLanguageStore } from '../../../store/languageStore';
import { cn } from '../../../lib/utils';

export default function Stage1() {
  const { language } = useLanguageStore();
  const [formatMode, setFormatMode] = useState<JsonFormatMode>(JSON_FORMAT_MODE.BEAUTIFY);
  const [searchTerm, setSearchTerm] = useState('');
  const resumeDataByLanguage = resumeData[language];
  const minifiedJson = JSON.stringify(resumeDataByLanguage);
  const [currentTheme, setCurrentTheme] = useState(JSON_VIEW_THEME_TYPE.VSCODE);

  return (
    <div className='flex flex-col h-full overflow-hidden'>
      <header className='flex flex-col gap-2 md:flex-row md:items-center md:gap-4 px-4 pt-8 pb-2 md:py-4'>
        <SearchInput
          placeholder='Search values...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className='flex items-center gap-2 md:gap-4'>
          <ThemeSelector value={currentTheme} onChange={(e) => setCurrentTheme(e.target.value)} />

          <div className='relative flex-1 flex items-center h-10 bg-[#161b22] border border-gray-600 rounded p-1'>
            {[JSON_FORMAT_MODE.MINIFY, JSON_FORMAT_MODE.BEAUTIFY].map((mode) => (
              <AnimatedFormatModeButton
                key={mode}
                className={formatMode === mode ? 'text-black' : 'text-gray-400 hover:text-gray-200'}
                onClick={() => setFormatMode(mode)}
                formatMode={mode}
                isActive={formatMode === mode}
              />
            ))}
          </div>
        </div>
      </header>

      <div className='flex-1 px-4 overflow-auto'>
        {formatMode === JSON_FORMAT_MODE.BEAUTIFY ? (
          <JsonView
            value={resumeDataByLanguage}
            className='break-all'
            style={JSON_VIEW_THEME[currentTheme]}
          >
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
          <MinifiedJson jsonString={minifiedJson} />
        )}
      </div>
    </div>
  );
}

/** --------------------
 *  Sub-components
 *  -------------------- */

type SearchInputProps = React.InputHTMLAttributes<HTMLInputElement>;

function SearchInput({ ...props }: SearchInputProps) {
  return (
    <input
      type='text'
      className='w-80 max-w-full h-10 px-2 bg-[#161b22] border border-gray-600 rounded text-gray-300 focus:outline-none focus:border-blue-500'
      {...props}
    />
  );
}

type ThemeSelectorProps = React.SelectHTMLAttributes<HTMLSelectElement>;

function ThemeSelector({ ...props }: ThemeSelectorProps) {
  return (
    <select
      className='min-w-36 h-10 px-2 bg-[#161b22] border border-gray-600 rounded text-gray-300 focus:outline-none focus:border-blue-500'
      {...props}
    >
      {jsonViewThemeTypes.map((themeType) => (
        <option key={themeType} value={themeType}>
          {LABEL_BY_JSON_VIEW_THEME[themeType]}
        </option>
      ))}
    </select>
  );
}

interface AnimatedFormatModeButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  formatMode: JsonFormatMode;
  isActive: boolean;
}

function AnimatedFormatModeButton({
  formatMode,
  isActive,
  className,
  ...props
}: AnimatedFormatModeButtonProps) {
  return (
    <button
      className={cn(
        'relative z-10 w-full h-full px-2 text-sm font-medium capitalize transition-colors duration-200',
        className,
      )}
      {...props}
    >
      {isActive && (
        <motion.div
          layoutId='active-pill'
          className='absolute inset-0 bg-white rounded'
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        />
      )}
      <span className='relative z-10'>{formatMode}</span>
    </button>
  );
}

interface MinifiedJsonProps {
  jsonString: string;
}

function MinifiedJson({ jsonString }: MinifiedJsonProps) {
  return <span className='text-orange-300/75 text-sm'>{jsonString}</span>;
}

/** --------------------
 *  Constants
 *  -------------------- */

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
