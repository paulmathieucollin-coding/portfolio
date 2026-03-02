import { Link, useLocation } from 'react-router';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function Header() {
  const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(logoRef.current, {
        opacity: 0,
        x: -20,
        duration: 1,
        ease: 'power3.out',
        delay: 0.1,
      });
      if (navRef.current) {
        gsap.from(Array.from(navRef.current.children), {
          opacity: 0,
          x: 20,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          delay: 0.2,
        });
      }
    }, headerRef);
    return () => ctx.revert();
  }, []);

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50">
      <div
        style={{
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(255, 255, 255, 0.75)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.07)',
        }}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
          <Link
            ref={logoRef}
            to="/"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.08em' }}
            className="tracking-tight transition-colors duration-300 hover:text-[#FF5500] uppercase"
          >
            Paul Mathieu Collin
          </Link>

          <nav ref={navRef} className="flex gap-8 md:gap-12">
            {[
              { path: '/', label: 'Work' },
              { path: '/contact', label: 'Contact' },
            ].map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className="relative transition-colors duration-300 uppercase"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.08em', color: isActive(path) ? '#FF5500' : 'inherit' }}
              >
                {label}
                <span
                  className="absolute left-0 -bottom-0.5 h-px bg-[#FF5500] transition-all duration-400"
                  style={{ width: isActive(path) ? '100%' : '0%' }}
                />
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
