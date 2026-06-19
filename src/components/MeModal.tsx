import { useGLTF, OrbitControls, Environment, Center } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';

function Model() {
  const { scene } = useGLTF('/3Dmodal/me.glb');
  return (
    <Center>
      <primitive object={scene} scale={2} />
    </Center>
  );
}

export default function MeModal() {
  const isMobile = useIsMobile();
  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 45 }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ antialias: !isMobile, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.9} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <directionalLight position={[-10, 10, -5]} intensity={0.5} />
          <Model />
          <OrbitControls
            enableZoom={true}
            minDistance={5}
            maxDistance={14}
            enablePan={false}
            autoRotate
            autoRotateSpeed={1}
            maxPolarAngle={Math.PI / 2 + 0.1}
            minPolarAngle={Math.PI / 2 - 0.5}
          />
          {!isMobile && <Environment preset="city" />}
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload('/3Dmodal/me.glb');
