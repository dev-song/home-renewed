import { useState, useCallback } from 'react';
import { type Stage3InfoType } from './types';
import { STAGE3_ORDERED_INFO_TYPE } from './constants';
import { createSafeContext } from '../../../lib/createSafeContext';

interface ThreeJSScreenContextType {
  activeInfo: Stage3InfoType | null;
  setActiveInfo: (infoType: Stage3InfoType | null) => void;
  updateActiveInfoByVoxelIndex: (index: number) => void;
}

const [SafeThreeJSScreenProvider, useSafeThreeJSScreenContext] =
  createSafeContext<ThreeJSScreenContextType>('ThreeJSScreenContext');

type ThreeJSScreenProviderProps = React.PropsWithChildren;

const ThreeJSScreenProvider = ({ children }: ThreeJSScreenProviderProps) => {
  const [activeInfo, setActiveInfo] = useState<Stage3InfoType | null>(null);

  const updateActiveInfoByVoxelIndex = useCallback((index: number) => {
    const sectionIndex = index % STAGE3_ORDERED_INFO_TYPE.length;
    setActiveInfo(STAGE3_ORDERED_INFO_TYPE[sectionIndex]);
  }, []);

  return (
    <SafeThreeJSScreenProvider
      value={{
        activeInfo,
        setActiveInfo,
        updateActiveInfoByVoxelIndex,
      }}
    >
      {children}
    </SafeThreeJSScreenProvider>
  );
};

export { ThreeJSScreenProvider, useSafeThreeJSScreenContext as useThreeJSScreenContext };
