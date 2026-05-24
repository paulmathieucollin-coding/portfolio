import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const holeRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const onCompleteRef = useRef(onComplete);
  const bounceRef = useRef<gsap.core.Tween | null>(null);
  onCompleteRef.current = onComplete;

  const fallAndReveal = useCallback(() => {
    const ball = ballRef.current;
    const hole = holeRef.current;
    const shadow = shadowRef.current;
    const container = containerRef.current;
    if (!ball || !hole || !shadow || !container) return;

    if (bounceRef.current) bounceRef.current.kill();
    gsap.killTweensOf(ball);
    gsap.killTweensOf(shadow);

    const groundY = 140;
    gsap.set(ball, { y: groundY, scaleX: 1.2, scaleY: 0.8 });

    gsap.to(shadow, { opacity: 0, width: 0, duration: 0.3, ease: 'power2.in' });

    gsap.to(hole, {
      width: 40,
      height: 6,
      opacity: 1,
      duration: 0.25,
      ease: 'power2.out',
    });

    const fallTl = gsap.timeline({ delay: 0.3 });
    fallTl.to(ball, {
      scaleX: 1,
      scaleY: 1,
      duration: 0.1,
      ease: 'power1.out',
    });
    fallTl.to(ball, {
      y: groundY + 8,
      scaleX: 0.6,
      scaleY: 0.6,
      duration: 0.15,
      ease: 'power2.in',
    });
    fallTl.to(ball, {
      y: groundY + 200,
      scaleX: 0.3,
      scaleY: 0.3,
      opacity: 0,
      duration: 0.35,
      ease: 'power3.in',
    });

    fallTl.to(hole, {
      width: 0,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.inOut',
    }, '-=0.15');

    gsap.to(container, {
      yPercent: -100,
      duration: 0.7,
      delay: 1.1,
      ease: 'power4.inOut',
      onComplete: () => onCompleteRef.current(),
    });
  }, []);

  useEffect(() => {
    const ball = ballRef.current;
    const shadow = shadowRef.current;
    if (!ball || !shadow) return;

    const groundY = 140;

    bounceRef.current = gsap.fromTo(ball,
      { y: 0 },
      {
        y: groundY,
        duration: 0.35,
        ease: 'power2.in',
        yoyo: true,
        repeat: -1,
        onUpdate() {
          const progress = this.progress();
          const squash = progress > 0.9 ? 1 + (progress - 0.9) * 3 : 1;
          const stretch = progress < 0.1 && this.reversed() ? 1 + (0.1 - progress) * 2 : 1;
          gsap.set(ball, {
            scaleX: squash > 1 ? squash : 1 / stretch,
            scaleY: squash > 1 ? 1 / squash : stretch,
          });
          gsap.set(shadow, {
            opacity: 0.15 + progress * 0.25,
            scaleX: 0.5 + progress * 0.5,
          });
        },
      }
    );

    return () => { bounceRef.current?.kill(); };
  }, []);

  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress = Math.min(progress + Math.random() * 3 + 1.5, 100);
      if (percentRef.current) {
        percentRef.current.textContent = String(Math.round(progress));
      }
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(fallAndReveal, 200);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [fallAndReveal]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      {/* Ball area */}
      <div style={{ position: 'relative', height: 200, width: 40, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Pixel ball */}
        <div
          ref={ballRef}
          style={{
            width: 20,
            height: 20,
            backgroundColor: '#ffffff',
            imageRendering: 'pixelated',
            clipPath: 'polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)',
          }}
        />

        {/* Shadow on ground */}
        <div
          ref={shadowRef}
          style={{
            position: 'absolute',
            bottom: 38,
            width: 24,
            height: 4,
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.15)',
            opacity: 0.15,
          }}
        />

        {/* Hole (appears at ground level) */}
        <div
          ref={holeRef}
          style={{
            position: 'absolute',
            bottom: 36,
            width: 0,
            height: 0,
            borderRadius: '50%',
            backgroundColor: '#000000',
            border: '1px solid rgba(255,255,255,0.1)',
            opacity: 0,
          }}
        />
      </div>

      {/* Percentage */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.7rem',
        color: 'rgba(255,255,255,0.25)',
        letterSpacing: '0.12em',
        marginTop: 24,
      }}>
        <span ref={percentRef}>0</span>
        <span>%</span>
      </div>
    </div>
  );
}
