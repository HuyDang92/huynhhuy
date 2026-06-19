import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { useIsMobile } from "../hooks/useIsMobile";

const EarthModel = () => {
   const earth = useGLTF("/3Dmodal/earth_modal/scene.gltf");
   return <primitive object={earth.scene} scale={2.0} position-y={0} rotation-y={0} />;
};

const EarthCanvas = () => {
   const isMobile = useIsMobile();
   return (
      <Canvas
         shadows={!isMobile}
         frameloop="demand"
         dpr={[1, isMobile ? 1.5 : 2]}
         gl={{ preserveDrawingBuffer: true, antialias: !isMobile, powerPreference: "high-performance" }}
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
