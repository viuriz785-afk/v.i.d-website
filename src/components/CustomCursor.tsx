import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    // Check if it is a touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      setIsHidden(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsHidden(false);
    };

    const handleMouseLeave = () => {
      setIsHidden(true);
    };

    const handleMouseEnter = () => {
      setIsHidden(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    const updateHoverState = () => {
      const interactiveElements = document.querySelectorAll('a, button, select, input, textarea, [role="button"], .interactive-hover');
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovered(true));
        el.addEventListener('mouseleave', () => setIsHovered(false));
      });
    };

    // Update hover bindings on render and any DOM modifications
    updateHoverState();
    const observer = new MutationObserver(updateHoverState);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      observer.disconnect();
    };
  }, []);

  // Soft trailing effect for the ring cursor
  useEffect(() => {
    let animationFrameId: number;

    const animateTrail = () => {
      setTrail((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        };
      });
      animationFrameId = requestAnimationFrame(animateTrail);
    };

    animationFrameId = requestAnimationFrame(animateTrail);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position]);

  if (isHidden) return null;

  return (
    <>
      {/* Tiny solid dot */}
      <div
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
        className={`fixed pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600 transition-all duration-150 ease-out ${
          isHovered ? 'h-4 w-4 bg-red-500' : 'h-2.5 w-2.5'
        }`}
      />
      {/* Outer elegant ring */}
      <div
        style={{
          left: `${trail.x}px`,
          top: `${trail.y}px`,
        }}
        className={`fixed pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-500/50 transition-all duration-200 ease-out ${
          isHovered ? 'h-14 w-14 border-red-500 bg-red-500/10' : 'h-9 w-9'
        }`}
      />
    </>
  );
}
