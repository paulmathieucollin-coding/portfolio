import { ReactNode, useRef } from 'react';
import gsap from 'gsap';
import { playHoverSound } from '../hooks/useHoverSound';

interface GlassButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'ghost';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  href?: string;
}

export function GlassButton({
  children,
  variant = 'primary',
  onClick,
  type = 'button',
  className = '',
  href,
}: GlassButtonProps) {
  const btnRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const isPrimary = variant === 'primary';

  const handleMouseEnter = () => {
    playHoverSound();
    gsap.to(btnRef.current, {
      scale: 1.03,
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

  const style: React.CSSProperties = {
    backgroundColor: isPrimary ? '#ffffff' : 'transparent',
    color: isPrimary ? '#0a0a0a' : '#ffffff',
    border: isPrimary ? 'none' : '1px solid rgba(255,255,255,0.2)',
    borderRadius: '0px',
    padding: '0.75rem 2rem',
    fontSize: '0.8125rem',
    fontWeight: 500,
    letterSpacing: '0.04em',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease',
  };

  if (href) {
    return (
      <a
        ref={btnRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={style}
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
      style={style}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
}
