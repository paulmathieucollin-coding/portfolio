import { Link, useLocation } from 'react-router';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { playHoverSound } from '../hooks/useHoverSound';

export function Header() {
  const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(logoRef.current, {
        opacity: 0,
        y: -8,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.2,
      });
      if (navRef.current) {
        gsap.from(navRef.current, {
          opacity: 0,
          y: -8,
          duration: 0.9,
          ease: 'power3.out',
          delay: 0.35,
        });
      }
      if (socialsRef.current) {
        gsap.from(Array.from(socialsRef.current.children), {
          opacity: 0,
          y: -8,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.05,
          delay: 0.45,
        });
      }
    }, headerRef);
    return () => ctx.revert();
  }, []);

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        {/* Logo — left */}
        <Link
          ref={logoRef}
          to="/"
          className="transition-opacity duration-300 hover:opacity-50"
          onMouseEnter={playHoverSound}
          style={{
            fontFamily: 'var(--font-family)',
            fontSize: '0.8rem',
            letterSpacing: '0.02em',
            color: 'rgba(255,255,255,0.7)',
            fontWeight: 400,
          }}
        >
          Paul·Collin
        </Link>

        {/* Nav — center pill group */}
        <nav
          ref={navRef}
          className="absolute left-1/2 -translate-x-1/2 flex items-center"
          style={{
            backgroundColor: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderRadius: '100px',
            padding: '3px',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {[
            { path: '/', label: 'About' },
            { path: '/contact', label: 'Work' },
          ].map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className="transition-all duration-300"
              onMouseEnter={playHoverSound}
              style={{
                fontFamily: 'var(--font-family)',
                fontSize: '0.75rem',
                fontWeight: 450,
                letterSpacing: '0.01em',
                color: isActive(path) ? '#ffffff' : 'rgba(255,255,255,0.5)',
                backgroundColor: isActive(path) ? 'rgba(255,255,255,0.12)' : 'transparent',
                borderRadius: '100px',
                padding: '6px 18px',
                display: 'block',
              }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Socials — right */}
        <div ref={socialsRef} className="flex items-center gap-6">
          {[
            { label: 'Email', href: 'mailto:hello@paulmathieucollin.com' },
            { label: 'in', href: '#' },
            { label: 'x', href: '#' },
            { label: 'Be', href: '#' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="transition-opacity duration-300 hover:opacity-100"
              onMouseEnter={playHoverSound}
              style={{
                fontFamily: 'var(--font-family)',
                fontSize: '0.75rem',
                fontWeight: 400,
                color: 'rgba(255,255,255,0.4)',
              }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
