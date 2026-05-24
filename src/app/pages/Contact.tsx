import { useEffect, useRef } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { GlassButton } from '../components/GlassButton';
import { SmoothScroll } from '../components/SmoothScroll';
import { PageTransition } from '../components/PageTransition';
import gsap from 'gsap';

const CALENDLY_URL = 'https://calendly.com/ton-compte';

export function Contact() {
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
      }).from(
        contentRef.current?.children ? Array.from(contentRef.current.children) : [],
        {
          y: 24,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
        },
        '-=0.5',
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <SmoothScroll>
      <PageTransition>
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0a0a0a' }}>
        <Header />

        <main className="flex-1 pt-28 md:pt-36 pb-16 md:pb-28 px-6 md:px-12">
          <div className="max-w-[1440px] mx-auto">
            <div className="max-w-2xl">
              <div ref={titleRef}>
                <h1
                  className="tracking-tight mb-6"
                  style={{
                    fontSize: 'clamp(3.5rem, 8vw, 8rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    lineHeight: 0.95,
                    color: '#ffffff',
                  }}
                >
                  Travaillons
                  <br />
                  ensemble.
                </h1>
              </div>

              <div ref={contentRef} className="mt-12 md:mt-16 space-y-8">
                <p style={{ fontSize: '1.0625rem', lineHeight: '1.7', color: 'rgba(255,255,255,0.5)' }}>
                  Tu as un projet en tête ? Une collaboration, une commande ou juste une
                  conversation — je suis disponible.
                </p>

                <div className="pt-2">
                  <GlassButton variant="primary" href={CALENDLY_URL}>
                    Prendre un rendez-vous
                  </GlassButton>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
                  <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)' }}>ou</span>
                  <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <p
                      className="mb-2"
                      style={{ fontSize: '0.7rem', letterSpacing: '0.1em', fontWeight: 500, color: 'rgba(255,255,255,0.35)' }}
                    >
                      EMAIL
                    </p>
                    <a
                      href="mailto:hello@paulmathieucollin.com"
                      className="transition-opacity duration-300 hover:opacity-50"
                      style={{ fontSize: '1rem', color: '#ffffff' }}
                    >
                      hello@paulmathieucollin.com
                    </a>
                  </div>

                  <div>
                    <p
                      className="mb-2"
                      style={{ fontSize: '0.7rem', letterSpacing: '0.1em', fontWeight: 500, color: 'rgba(255,255,255,0.35)' }}
                    >
                      LINKS
                    </p>
                    <div className="flex gap-4">
                      {['Instagram', 'LinkedIn', 'Behance'].map((s) => (
                        <a
                          key={s}
                          href="#"
                          className="transition-opacity duration-300 hover:opacity-50"
                          style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)' }}
                        >
                          {s}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
      </PageTransition>
    </SmoothScroll>
  );
}
