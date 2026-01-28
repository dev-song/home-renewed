import { ThreeJSScreenProvider, useThreeJSScreenContext } from './ThreeJSScreenContext';
import ThreeJSCanvas from './components/ThreeJSCanvas';
import Stage3InfoOverlay from './components/InfoOverlay';
import Stage3Legend from './components/Legend';

const Stage3Impl = () => {
  const { activeInfo } = useThreeJSScreenContext();

  return (
    <div className='relative w-full h-full bg-gray-950'>
      <ThreeJSCanvas />
      <Stage3Legend />
      {activeInfo && <Stage3InfoOverlay />}
    </div>
  );
};

const Stage3 = () => {
  return (
    <ThreeJSScreenProvider>
      <Stage3Impl />
    </ThreeJSScreenProvider>
  );
};

export default Stage3;
