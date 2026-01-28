// TODO: 추후 3D 두상 모델로 변경
export const generateHeadData = () => {
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
