import { useEffect, useRef, useState } from "react";
import { useProgress } from "@react-three/drei";
import { gsap } from "gsap";

function Preloader() {
   const { active, progress } = useProgress();
   const [display, setDisplay] = useState(0);
   const [visible, setVisible] = useState(true);
   const doneRef = useRef(false);

   // Smoothly follow the real asset-loading progress
   useEffect(() => {
      let raf: number;
      const tick = () => {
         setDisplay((prev) => {
            const diff = progress - prev;
            if (Math.abs(diff) < 0.5) return progress;
            return prev + diff * 0.25; // ease toward the real value
         });
         raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
   }, [progress]);

   // Close as soon as real loading finishes
   useEffect(() => {
      if (doneRef.current) return;
      if (!active && progress >= 100) {
         doneRef.current = true;
         setDisplay(100);
         gsap.to(".preloader-container", {
            opacity: 0,
            yPercent: -100,
            duration: 0.5,
            ease: "power3.inOut",
            onComplete: () => setVisible(false),
         });
      }
   }, [active, progress]);

   if (!visible) return null;

   return (
      <div className="preloader-container fixed inset-0 z-[9999] flex flex-col justify-center items-center bg-[#050414] text-white">
         {/* Outer spinning ring */}
         <div className="relative flex items-center justify-center mb-8">
            <div
               className="w-28 h-28 rounded-full border-4 border-t-[#49D1FF] border-r-transparent border-b-[#FF7777] border-l-transparent animate-spin"
               style={{ animationDuration: "1.2s" }}
            />
            {/* Inner robot logo or glowing dot */}
            <div className="absolute w-14 h-14 rounded-full bg-linear-to-tr from-[#49D1FF] to-[#FF7777] blur-md opacity-70 animate-pulse" />
            <div className="absolute font-sans font-bold text-xl text-[#49D1FF] tracking-wider">{Math.round(display)}%</div>
         </div>

         <div className="text-center font-sans tracking-widest text-sm text-gray-400">
            <div className="text-2xl font-bold text-white mb-2 tracking-normal uppercase">Initializing Portfolio</div>
            <div className="animate-pulse text-[#49D1FF] text-xs uppercase font-semibold tracking-widest">Loading 3D Assets</div>
         </div>

         {/* Progress bar container */}
         <div className="w-72 h-2 bg-gray-800 rounded-full mt-8 overflow-hidden border border-gray-700/50 p-[1px]">
            <div
               className="h-full bg-linear-to-r from-[#49D1FF] via-[#a855f7] to-[#FF7777] transition-all duration-150 ease-out rounded-full"
               style={{ width: `${display}%` }}
            />
         </div>
      </div>
   );
}

export default Preloader;
