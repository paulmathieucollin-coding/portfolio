import { ReactNode, useRef } from 'react';
import gsap from 'gsap';

interface GlassButtonProps {
  children: ReactNode;
  variant?: 'black' | 'white';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  href?: string;
}

export function GlassButton({
  children,
  variant = 'black',
  onClick,
  type = 'button',
  className = '',
  href,
}: GlassButtonProps) {
  const btnRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const isBlack = variant === 'black';

  const handleMouseEnter = () => {
    gsap.to(btnRef.current, {
      scale: 1.02,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(btnRef.current, {
      scale: 1,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const style = {
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    backgroundColor: isBlack ? 'rgba(0, 0, 0, 0.88)' : 'rgba(255, 255, 255, 0.8)',
    color: isBlack ? '#ffffff' : '#000000',
    border: isBlack
      ? '1px solid rgba(255, 255, 255, 0.08)'
      : '1px solid rgba(0, 0, 0, 0.12)',
    borderRadius: '2px',
    padding: '0.75rem 2rem',
    fontSize: '0.8125rem',
    fontWeight: 500,
    letterSpacing: '0.04em',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  };

  if (href) {
    return (
      <a
        ref={btnRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={style as React.CSSProperties}
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={btnRef as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      style={style as React.CSSProperties}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
}
