import { GlassButton } from './GlassButton';
import { useNavigate } from 'react-router';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function Hero() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const separatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.from(line1Ref.current, {
        yPercent: 110,
        duration: 1.1,
      })
        .from(
          line2Ref.current,
          {
            yPercent: 110,
            duration: 1.1,
          },
          '-=0.85',
        )
        .from(
          separatorRef.current,
          {
            scaleX: 0,
            duration: 0.8,
            transformOrigin: 'left',
          },
          '-=0.5',
        )
        .from(
          descRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.9,
          },
          '-=0.4',
        )
        .from(
          buttonsRef.current?.children ? Array.from(buttonsRef.current.children) : [],
          {
            opacity: 0,
            y: 16,
            duration: 0.7,
            stagger: 0.1,
          },
          '-=0.3',
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex items-end pb-16 md:pb-24 px-6 md:px-12 pt-14"
    >
      <div className="max-w-[1440px] w-full">
        {/* Big headline */}
        <div
          className="mb-8 md:mb-12"
          style={{ overflow: 'hidden' }}
        >
          <div ref={line1Ref}>
            <h1
              className="leading-[0.92] tracking-tight"
              style={{
                fontSize: 'clamp(4rem, 10vw, 10rem)',
                fontWeight: 600,
                letterSpacing: '-0.03em',
              }}
            >
              Visual
            </h1>
          </div>
        </div>
        <div
          className="mb-8 md:mb-12"
          style={{ overflow: 'hidden' }}
        >
          <div ref={line2Ref}>
            <h1
              className="leading-[0.92] tracking-tight"
              style={{
                fontSize: 'clamp(4rem, 10vw, 10rem)',
                fontWeight: 600,
                letterSpacing: '-0.03em',
              }}
            >
              <span className="text-[#111]">Director</span>
            </h1>
          </div>
        </div>

        {/* Separator */}
        <div
          ref={separatorRef}
          className="w-full mb-10 md:mb-14"
          style={{ height: '1px', backgroundColor: 'rgba(0,0,0,0.12)' }}
        />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <p
            ref={descRef}
            className="text-gray-500 max-w-sm"
            style={{ fontSize: '1rem', lineHeight: '1.65' }}
          >
            Photographie, direction artistique
            <br />
            et création vidéo.
          </p>

          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-3">
            <GlassButton variant="black" onClick={scrollToProjects}>
              Voir les projets
            </GlassButton>
            <GlassButton variant="white" onClick={() => navigate('/contact')}>
              Contact
            </GlassButton>
          </div>
        </div>
      </div>
    </section>
  );
}
