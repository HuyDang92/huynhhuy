import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // Add cursor-none to body when this component mounts
    document.body.style.cursor = "none";

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(follower, { xPercent: -50, yPercent: -50 });

    const xToCursor = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
    const yToCursor = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });
    
    const xToFollower = gsap.quickTo(follower, "x", { duration: 0.5, ease: "power3" });
    const yToFollower = gsap.quickTo(follower, "y", { duration: 0.5, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      xToCursor(e.clientX);
      yToCursor(e.clientY);
      xToFollower(e.clientX);
      yToFollower(e.clientY);
    };

    const handleMouseEnter = () => {
      gsap.to(cursor, { scale: 0, duration: 0.3 });
      gsap.to(follower, { scale: 1.5, backgroundColor: "rgba(73, 209, 255, 0.2)", duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3 });
      gsap.to(follower, { scale: 1, backgroundColor: "transparent", duration: 0.3 });
    };
    
    const handleMouseDown = () => {
      gsap.to(cursor, { scale: 0.5, duration: 0.2 });
      gsap.to(follower, { scale: 0.8, duration: 0.2 });
    };
    
    const handleMouseUp = () => {
      gsap.to(cursor, { scale: 1, duration: 0.2 });
      gsap.to(follower, { scale: 1, duration: 0.2 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    
    // Add hover effect to clickable elements
    const attachHoverEffects = () => {
      const clickables = document.querySelectorAll('a, button, input, textarea, select, [role="button"], .cursor-pointer');
      clickables.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
        // Ensure default cursors are overridden
        (el as HTMLElement).style.cursor = "none";
      });
      return clickables;
    };

    let clickables = attachHoverEffects();

    // Re-attach if DOM changes (simple approach)
    const observer = new MutationObserver(() => {
      clickables.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
      clickables = attachHoverEffects();
    });
    
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      clickables.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
        (el as HTMLElement).style.cursor = "auto";
      });
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-10 h-10 rounded-full border-2 border-[#49D1FF] pointer-events-none z-[9998]"
        style={{ mixBlendMode: 'difference' }}
      />
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-[#FF5858] pointer-events-none z-[9999]"
      />
    </>
  );
}
