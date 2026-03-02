import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 12.5}px, ${e.clientY - 12.5}px)`;
      }
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div
      ref={dotRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '25px',
        height: '25px',
        borderRadius: '50%',
        backgroundColor: '#ffffff',
        mixBlendMode: 'difference',
        pointerEvents: 'none',
        zIndex: 99999,
        willChange: 'transform',
      }}
    />
  );
}
