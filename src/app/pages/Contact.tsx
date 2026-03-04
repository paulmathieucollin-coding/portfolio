import { useEffect, useRef } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { GlassButton } from '../components/GlassButton';
import { SmoothScroll } from '../components/SmoothScroll';
import gsap from 'gsap';

// Remplace ce lien par ton vrai lien Calendly
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
      <div className="min-h-screen flex flex-col">
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
                  }}
                >
                  Travaillons
                  <br />
                  <span className="text-[#111]">ensemble.</span>
                </h1>
              </div>

              <div ref={contentRef} className="mt-12 md:mt-16 space-y-8">
                <p
                  className="text-gray-500"
                  style={{ fontSize: '1.0625rem', lineHeight: '1.7' }}
                >
                  Tu as un projet en tête ? Une collaboration, une commande ou juste une
                  conversation — je suis disponible.
                </p>

                {/* CTA Calendly */}
                <div className="pt-2">
                  <GlassButton variant="black" href={CALENDLY_URL}>
                    Prendre un rendez-vous
                  </GlassButton>
                </div>

                {/* Or divider */}
                <div className="flex items-center gap-4 pt-4">
                  <div className="flex-1 h-px bg-black/10" />
                  <span className="text-gray-300 text-xs">ou</span>
                  <div className="flex-1 h-px bg-black/10" />
                </div>

                {/* Direct contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <p
                      className="text-gray-400 mb-2"
                      style={{ fontSize: '0.7rem', letterSpacing: '0.1em', fontWeight: 500 }}
                    >
                      EMAIL
                    </p>
                    <a
                      href="mailto:hello@paulmathieucollin.com"
                      className="text-black hover:text-[#111] transition-colors duration-300"
                      style={{ fontSize: '1rem' }}
                    >
                      hello@paulmathieucollin.com
                    </a>
                  </div>

                  <div>
                    <p
                      className="text-gray-400 mb-2"
                      style={{ fontSize: '0.7rem', letterSpacing: '0.1em', fontWeight: 500 }}
                    >
                      RÉSEAUX
                    </p>
                    <div className="flex gap-4">
                      {[
                        { label: 'Instagram', href: 'https://www.instagram.com/pmc.mp3' },
                        { label: 'LinkedIn', href: '#' },
                        { label: 'Behance', href: '#' },
                      ].map(({ label, href }) => (
                        <a
                          key={label}
                          href={href}
                          target={href !== '#' ? '_blank' : undefined}
                          rel={href !== '#' ? 'noopener noreferrer' : undefined}
                          className="text-gray-600 hover:text-[#111] transition-colors duration-300"
                          style={{ fontSize: '0.875rem' }}
                        >
                          {label}
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
    </SmoothScroll>
  );
}
