import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import * as THREE from 'three';

interface VoxelBoxProps {
  position: [number, number, number];
  color: string;
  onClick: () => void;
}

export const VoxelBox = ({ position, color, onClick }: VoxelBoxProps) => {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Scale animation for entry
  const targetScale = useRef(0);

  // Random initial delay for "pop" effect
  useEffect(() => {
    const delay = Math.random() * 1000;
    const timer = setTimeout(() => {
      targetScale.current = 1;
    }, delay);
    return () => clearTimeout(timer);
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      const target = hovered ? 1.3 : targetScale.current;
      // Smoothly interpolate scale
      ref.current.scale.lerp(new THREE.Vector3(target, target, target), delta * 10);
    }
  });

  return (
    <Box
      ref={ref}
      position={position}
      args={[0.4, 0.4, 0.4]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <meshStandardMaterial
        color={color}
        emissive={hovered ? color : 'black'}
        emissiveIntensity={hovered ? 0.5 : 0}
      />
    </Box>
  );
};
