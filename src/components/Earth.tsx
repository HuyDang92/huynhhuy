import * as THREE from "three";
import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Html, OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { Icon } from "@iconify/react/dist/iconify.js";

function Model(props: any) {
   const { nodes, materials }: any = useGLTF("/earth.gltf");
   return (
      <group rotation={[-Math.PI / 2, 0, Math.PI]} {...props} dispose={null}>
         <mesh geometry={nodes["URF-Height_Lampd_Ice_0"].geometry} material={materials.Lampd_Ice} />
         <mesh geometry={nodes["URF-Height_watr_0"].geometry} material={materials.watr} material-roughness={0} />
         <mesh geometry={nodes["URF-Height_Lampd_0"].geometry} material={materials.Lampd} material-color="lightgreen">
            <Marker rotation={[0, Math.PI / 2, 0]} position={[0, 1.3, 0]}>
               {/* Anything in here is regular HTML, these markers are from font-awesome */}
               <Icon icon="mdi:address-marker" style={{ color: "orange" }} />
            </Marker>
            <group position={[0, 0, 1.3]} rotation={[0, 0, Math.PI]}>
               <Marker rotation={[0, Math.PI / 2, Math.PI / 2]}>
                  <div style={{ position: "absolute", fontSize: 10, letterSpacing: -0.5, left: 17.5 }}>north</div>
                  <Icon icon="mdi:address-marker" style={{ color: "indianred" }} />
               </Marker>
            </group>
         </mesh>
      </group>
   );
}

function Marker({ children, ...props }: any) {
   const ref = useRef<any>();
   const [isOccluded, setOccluded] = useState<any>();
   const [isInRange, setInRange] = useState<any>();
   const isVisible = isInRange && !isOccluded;
   const vec = new THREE.Vector3();
   useFrame((state) => {
      const range = state.camera.position.distanceTo(ref.current.getWorldPosition(vec)) <= 10;
      if (range !== isInRange) setInRange(range);
   });
   return (
      <group ref={ref}>
         <Html
            transform
            occlude
            onOcclude={setOccluded}
            style={{ transition: "all 0.2s", opacity: isVisible ? 1 : 0, transform: `scale(${isVisible ? 1 : 0.25})` }}
            {...props}
         >
            {children}
         </Html>
      </group>
   );
}

export default function Earth() {
   return (
      <Canvas camera={{ position: [5, 0, 0], fov: 50 }}>
         <ambientLight intensity={0.5} />
         <Model position={[0, 0.25, 0]} />
         <Environment preset="city" />
         <ContactShadows frames={1} scale={5} position={[0, -1, 0]} far={1} blur={5} opacity={0.5} color="#204080" />
         <OrbitControls />
      </Canvas>
   );
}
