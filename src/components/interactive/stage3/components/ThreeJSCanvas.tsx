import { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useThreeJSScreenContext } from '../ThreeJSScreenContext';
import { VoxelBox } from './VoxelBox';
import { generateHeadData } from '../utils';
import { STAGE3_COLOR_BY_INFO_TYPE, STAGE3_ORDERED_INFO_TYPE } from '../constants';

function ThreeJSCanvas() {
  const { setActiveInfo, updateActiveInfoByVoxelIndex } = useThreeJSScreenContext();
  const voxels = useMemo(() => generateHeadData(), []);

  return (
    <Canvas
      className='w-full h-full'
      camera={{ position: [5, 5, 5] }}
      onPointerMissed={() => setActiveInfo(null)}
    >
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} />

      {voxels.map((pos, idx) => (
        <VoxelBox
          key={idx}
          position={pos as [number, number, number]}
          color={
            STAGE3_COLOR_BY_INFO_TYPE[
              STAGE3_ORDERED_INFO_TYPE[idx % STAGE3_ORDERED_INFO_TYPE.length]
            ]
          }
          onClick={() => updateActiveInfoByVoxelIndex(idx)}
        />
      ))}

      <OrbitControls enablePan={false} />
    </Canvas>
  );
}

export default ThreeJSCanvas;
