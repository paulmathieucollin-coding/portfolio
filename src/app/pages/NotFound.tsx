import { useNavigate } from 'react-router';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Header } from '../components/Header';
import { GlassButton } from '../components/GlassButton';

export function NotFound() {
  const navigate = useNavigate();
  const pageRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const separatorRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.from(line1Ref.current, { yPercent: 110, duration: 1.1 })
        .from(line2Ref.current, { yPercent: 110, duration: 1.1 }, '-=0.85')
        .from(separatorRef.current, { scaleX: 0, duration: 0.8, transformOrigin: 'left' }, '-=0.5')
        .from(descRef.current, { opacity: 0, y: 20, duration: 0.9 }, '-=0.4')
        .from(buttonRef.current, { opacity: 0, y: 16, duration: 0.7 }, '-=0.3');
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Header />
      <section
        ref={pageRef}
        className="min-h-screen flex items-end pb-16 md:pb-24 px-6 md:px-12 pt-14"
      >
        <div className="max-w-[1440px] w-full">
          <div className="mb-8 md:mb-12" style={{ overflow: 'hidden' }}>
            <div ref={line1Ref}>
              <h1
                className="leading-[0.92] tracking-tight"
                style={{ fontSize: 'clamp(4rem, 10vw, 10rem)', fontWeight: 600, letterSpacing: '-0.03em' }}
              >
                404
              </h1>
            </div>
          </div>

          <div className="mb-8 md:mb-12" style={{ overflow: 'hidden' }}>
            <div ref={line2Ref}>
              <h1
                className="leading-[0.92] tracking-tight"
                style={{ fontSize: 'clamp(4rem, 10vw, 10rem)', fontWeight: 600, letterSpacing: '-0.03em' }}
              >
                <span className="text-[#FF5500]">Introuvable</span>
              </h1>
            </div>
          </div>

          <div
            ref={separatorRef}
            className="w-full mb-10 md:mb-14"
            style={{ height: '1px', backgroundColor: 'rgba(0,0,0,0.12)' }}
          />

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <p
              ref={descRef}
              className="text-gray-500 max-w-sm"
              style={{ fontSize: '1rem', lineHeight: '1.65' }}
            >
              Cette page n'existe pas ou a été déplacée.
              <br />
              Retournez à l'accueil.
            </p>

            <div ref={buttonRef}>
              <GlassButton variant="black" onClick={() => navigate('/')}>
                Retour à l'accueil
              </GlassButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
