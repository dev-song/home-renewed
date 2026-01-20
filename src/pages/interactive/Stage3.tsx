import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';
import { useMemo } from 'react';

// TODO: 추후 3D 두상 모델로 변경
const generateHeadData = () => {
  const points = [];
  for (let x = -2; x <= 2; x += 0.5) {
    for (let y = -2; y <= 3; y += 0.5) {
      for (let z = -2; z <= 2; z += 0.5) {
        // 구체 형태의 로직을 넣어 두상과 비슷하게 필터링
        const distance = Math.sqrt(x * x + y * y + z * z);
        if (distance < 2.5) {
          points.push([x, y, z]);
        }
      }
    }
  }
  return points;
};

const Stage3 = () => {
  const voxels = useMemo(() => generateHeadData(), []);

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#111' }}>
      <Canvas camera={{ position: [5, 5, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        {voxels.map((pos, idx) => (
          <Box key={idx} position={pos as [number, number, number]} args={[0.4, 0.4, 0.4]}>
            <meshStandardMaterial color={MESH_COLOR[idx % MESH_COLOR.length]} />
          </Box>
        ))}

        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default Stage3;

const MESH_COLOR = ['#A0C4FF', '#CAFFBF', '#FDFFB6', '#FFADAD', '#BDB2FF', '#FFFFFF'];
