import { useGLTF, OrbitControls, Environment, useAnimations, Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';

function Model() {
  const { scene, animations } = useGLTF('/3Dmodal/robot_playground_modal/scene.gltf');
  const { actions, names } = useAnimations(animations, scene);

  useEffect(() => {
    // Play all animation tracks in the model
    names.forEach((name) => {
      const action = actions[name];
      if (action) {
        action.reset().fadeIn(0.5).play();
      }
    });
    return () => {
      names.forEach((name) => {
        actions[name]?.fadeOut(0.5);
      });
    };
  }, [actions, names]);

  // Adjust the scale and position to center the model nicely and make it larger
  return <primitive object={scene} scale={2.8} position={[0, -3.8, 0]} />;
}

export default function RobotModal() {
  const isMobile = useIsMobile();
  return (
    <div className="absolute inset-0 w-full h-full z-0 cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 2, 10], fov: 45 }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ antialias: !isMobile, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <directionalLight position={[-10, 10, -5]} intensity={0.5} />
          <Model />
          {!isMobile && (
            <Stars
              radius={80}
              depth={40}
              count={3000}
              factor={6}
              saturation={0.5}
              fade
              speed={1.5}
            />
          )}
          <OrbitControls
            enableZoom={true}
            minDistance={6}
            maxDistance={16}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2 + 0.1}
            minPolarAngle={Math.PI / 2 - 0.5}
          />
          {!isMobile && <Environment preset="city" />}
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload('/3Dmodal/robot_playground_modal/scene.gltf');
