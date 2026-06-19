import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useIsMobile } from "../hooks/useIsMobile";

function StarField() {
   const ref = useRef<THREE.Points>(null);
   const count = 1200;

   const positions = useMemo(() => {
      const arr = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
         arr[i * 3] = (Math.random() - 0.5) * 28;
         arr[i * 3 + 1] = (Math.random() - 0.5) * 28;
         arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
      }
      return arr;
   }, []);

   useFrame(({ clock }) => {
      if (ref.current) {
         ref.current.rotation.y = clock.elapsedTime * 0.02;
         ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.008) * 0.08;
      }
   });

   return (
      <points ref={ref}>
         <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} args={[positions, 3]} />
         </bufferGeometry>
         <pointsMaterial size={0.045} color="#49D1FF" transparent opacity={0.75} sizeAttenuation />
      </points>
   );
}

export default function Stars3D() {
   const isMobile = useIsMobile();

   // Skip the full-screen WebGL starfield on mobile to free a whole context.
   if (isMobile) return null;

   return (
      <Canvas
         camera={{ position: [0, 0, 5], fov: 60 }}
         style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: -1 }}
         dpr={[1, 1.5]}
         gl={{ antialias: false, powerPreference: "high-performance" }}
      >
         <StarField />
      </Canvas>
   );
}
