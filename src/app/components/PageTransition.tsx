import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const elements = ref.current.querySelectorAll('section, header, footer');

    elements.forEach((el) => {
      const wrapper = el as HTMLElement;
      wrapper.style.clipPath = 'inset(100% 0 0 0)';
      wrapper.style.opacity = '0';
    });

    gsap.to(elements, {
      clipPath: 'inset(0% 0 0 0)',
      opacity: 1,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power4.out',
      delay: 0.1,
    });
  }, []);

  return <div ref={ref}>{children}</div>;
}
