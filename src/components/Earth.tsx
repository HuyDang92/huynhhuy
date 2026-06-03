import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

const EarthModel = () => {
   const earth = useGLTF("/3Dmodal/earth_modal/scene.gltf");
   return <primitive object={earth.scene} scale={2.0} position-y={0} rotation-y={0} />;
};

const EarthCanvas = () => {
   return (
      <Canvas
         shadows
         frameloop="demand"
         gl={{ preserveDrawingBuffer: true }}
         camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [-4, 3, 6],
         }}
      >
         <ambientLight intensity={2.5} />
         <directionalLight position={[10, 5, 10]} intensity={2} />
         <Suspense fallback={null}>
            <OrbitControls autoRotate enableZoom={false} />
            <EarthModel />
         </Suspense>
         <Preload all />
      </Canvas>
   );
};

export default EarthCanvas;
