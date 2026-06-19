import { useEffect, useState } from "react";

/** Returns true on small / touch screens so heavy 3D work can be trimmed. */
export function useIsMobile(breakpoint = 768) {
   const [isMobile, setIsMobile] = useState(() =>
      typeof window !== "undefined" ? window.innerWidth <= breakpoint : false,
   );

   useEffect(() => {
      const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
      const handler = () => setIsMobile(mq.matches);
      handler();
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
   }, [breakpoint]);

   return isMobile;
}
