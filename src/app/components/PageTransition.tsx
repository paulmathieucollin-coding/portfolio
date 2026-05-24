import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
    );
  }, []);

  return <div ref={ref}>{children}</div>;
}
