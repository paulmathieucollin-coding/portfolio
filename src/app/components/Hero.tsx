import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const nameLeftRef = useRef<HTMLDivElement>(null);
  const nameRightRef = useRef<HTMLDivElement>(null);
  const subtitleLeftRef = useRef<HTMLDivElement>(null);
  const subtitleRightRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.from(overlayRef.current, {
        opacity: 0,
        duration: 1.5,
      })
        .from(
          nameLeftRef.current,
          {
            yPercent: 100,
            opacity: 0,
            duration: 1.2,
          },
          0.3,
        )
        .from(
          nameRightRef.current,
          {
            yPercent: 100,
            opacity: 0,
            duration: 1.2,
          },
          0.5,
        )
        .from(
          subtitleLeftRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.9,
          },
          0.8,
        )
        .from(
          subtitleRightRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.9,
          },
          0.9,
        )
        .from(
          previewRef.current,
          {
            opacity: 0,
            y: 40,
            scale: 0.95,
            duration: 1,
          },
          0.6,
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden flex items-end"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      {/* Background image overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.6) 100%)',
        }}
      />

      {/* Center preview window */}
      <div
        ref={previewRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[45%] z-10"
        style={{
          width: 'clamp(280px, 30vw, 480px)',
          aspectRatio: '16/10',
          backgroundColor: '#111',
          borderRadius: '8px',
          border: '1px solid rgba(255,255,255,0.08)',
          overflow: 'hidden',
          boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
        }}
      >
        <div
          className="w-full h-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'rgba(255,255,255,0.25)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Latest project preview
          </span>
        </div>
      </div>

      {/* Bottom content — name spanning full width */}
      <div className="relative z-20 w-full px-6 md:px-12 pb-8 md:pb-12">
        <div className="max-w-[1440px] mx-auto">
          {/* Subtitle left */}
          <div ref={subtitleLeftRef} className="mb-4">
            <p
              style={{
                fontFamily: 'var(--font-family)',
                fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                fontWeight: 400,
                color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.4,
              }}
            >
              Photographe & Directeur
              <br />
              Artistique
            </p>
          </div>

          {/* Giant name */}
          <div className="flex items-end justify-between">
            <div style={{ overflow: 'hidden' }}>
              <div ref={nameLeftRef}>
                <h1
                  style={{
                    fontSize: 'clamp(4rem, 14vw, 16rem)',
                    fontWeight: 600,
                    lineHeight: 0.85,
                    letterSpacing: '-0.04em',
                    color: 'rgba(255,255,255,0.85)',
                  }}
                >
                  Paul
                </h1>
              </div>
            </div>

            <div className="text-right">
              <div style={{ overflow: 'hidden' }}>
                <div ref={nameRightRef}>
                  <h1
                    style={{
                      fontSize: 'clamp(4rem, 14vw, 16rem)',
                      fontWeight: 600,
                      lineHeight: 0.85,
                      letterSpacing: '-0.04em',
                      color: 'rgba(255,255,255,0.85)',
                    }}
                  >
                    Collin
                  </h1>
                </div>
              </div>
              <div ref={subtitleRightRef} className="mt-3">
                <p
                  style={{
                    fontFamily: 'var(--font-family)',
                    fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                    fontWeight: 400,
                    color: 'rgba(255,255,255,0.7)',
                    lineHeight: 1.4,
                  }}
                >
                  Freelance Visual Director
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
