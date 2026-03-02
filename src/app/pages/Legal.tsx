import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function Legal() {
  const pageRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const separatorRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.from(line1Ref.current, { yPercent: 110, duration: 1.1 })
        .from(line2Ref.current, { yPercent: 110, duration: 1.1 }, '-=0.85')
        .from(separatorRef.current, { scaleX: 0, duration: 0.8, transformOrigin: 'left' }, '-=0.5')
        .from(contentRef.current, { opacity: 0, y: 24, duration: 0.9 }, '-=0.3');
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Header />
      <article ref={pageRef} className="px-6 md:px-12 pt-14">
        <div className="max-w-[1440px] mx-auto">

          {/* Hero */}
          <section className="min-h-[60vh] flex items-end pb-16 md:pb-24">
            <div className="w-full">
              <div className="mb-8 md:mb-12" style={{ overflow: 'hidden' }}>
                <div ref={line1Ref}>
                  <h1
                    className="leading-[0.92] tracking-tight"
                    style={{ fontSize: 'clamp(4rem, 10vw, 10rem)', fontWeight: 600, letterSpacing: '-0.03em' }}
                  >
                    Mentions
                  </h1>
                </div>
              </div>

              <div className="mb-8 md:mb-12" style={{ overflow: 'hidden' }}>
                <div ref={line2Ref}>
                  <h1
                    className="leading-[0.92] tracking-tight"
                    style={{ fontSize: 'clamp(4rem, 10vw, 10rem)', fontWeight: 600, letterSpacing: '-0.03em' }}
                  >
                    <span className="text-[#FF5500]">Légales</span>
                  </h1>
                </div>
              </div>

              <div
                ref={separatorRef}
                className="w-full"
                style={{ height: '1px', backgroundColor: 'rgba(0,0,0,0.12)' }}
              />
            </div>
          </section>

          {/* Contenu */}
          <div
            ref={contentRef}
            className="pb-24 md:pb-32 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-24"
          >
            {/* Colonne gauche — index */}
            <nav className="hidden md:block">
              <ul className="sticky top-24 space-y-3">
                {['Éditeur', 'Hébergeur', 'Propriété intellectuelle', 'Données personnelles', 'Contact'].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase().replace(/\s+/g, '-').replace(/[éèê]/g, 'e')}`}
                      className="text-gray-400 hover:text-[#111111] transition-colors duration-300"
                      style={{ fontSize: '0.85rem' }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Colonne droite — texte */}
            <div className="space-y-16" style={{ fontSize: '0.95rem', lineHeight: '1.75' }}>

              <section id="editeur">
                <h2
                  className="mb-5"
                  style={{ fontSize: '0.7rem', letterSpacing: '0.12em', fontWeight: 600, color: '#FF5500' }}
                >
                  ÉDITEUR DU SITE
                </h2>
                <div className="space-y-1 text-gray-700">
                  <p><span className="text-[#111111] font-medium">Nom :</span> Paul Mathieu Collin</p>
                  <p><span className="text-[#111111] font-medium">Statut :</span> Entrepreneur individuel</p>
                  <p><span className="text-[#111111] font-medium">Email :</span>{' '}
                    <a href="mailto:hello@paulmathieucollin.fr" className="hover:text-[#FF5500] transition-colors duration-300">
                      hello@paulmathieucollin.fr
                    </a>
                  </p>
                  <p><span className="text-[#111111] font-medium">Site :</span> paulmathieucollin.fr</p>
                </div>
              </section>

              <section id="hebergeur">
                <h2
                  className="mb-5"
                  style={{ fontSize: '0.7rem', letterSpacing: '0.12em', fontWeight: 600, color: '#FF5500' }}
                >
                  HÉBERGEUR
                </h2>
                <div className="space-y-1 text-gray-700">
                  <p><span className="text-[#111111] font-medium">Société :</span> Vercel Inc.</p>
                  <p><span className="text-[#111111] font-medium">Adresse :</span> 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</p>
                  <p><span className="text-[#111111] font-medium">Site :</span>{' '}
                    <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF5500] transition-colors duration-300">
                      vercel.com
                    </a>
                  </p>
                </div>
              </section>

              <section id="propriete-intellectuelle">
                <h2
                  className="mb-5"
                  style={{ fontSize: '0.7rem', letterSpacing: '0.12em', fontWeight: 600, color: '#FF5500' }}
                >
                  PROPRIÉTÉ INTELLECTUELLE
                </h2>
                <p className="text-gray-700">
                  L'ensemble des contenus présents sur ce site — photographies, vidéos, textes, design — sont la propriété exclusive de Paul Mathieu Collin, sauf mention contraire. Toute reproduction, même partielle, est interdite sans autorisation écrite préalable.
                </p>
              </section>

              <section id="donnees-personnelles">
                <h2
                  className="mb-5"
                  style={{ fontSize: '0.7rem', letterSpacing: '0.12em', fontWeight: 600, color: '#FF5500' }}
                >
                  DONNÉES PERSONNELLES
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Ce site ne collecte aucune donnée personnelle à des fins commerciales. Les données transmises via le formulaire de contact (nom, email, message) sont utilisées uniquement pour répondre à votre demande.
                  </p>
                  <p>
                    Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ce droit, contactez :{' '}
                    <a href="mailto:hello@paulmathieucollin.fr" className="hover:text-[#FF5500] transition-colors duration-300">
                      hello@paulmathieucollin.fr
                    </a>
                  </p>
                </div>
              </section>

              <section id="contact">
                <h2
                  className="mb-5"
                  style={{ fontSize: '0.7rem', letterSpacing: '0.12em', fontWeight: 600, color: '#FF5500' }}
                >
                  CONTACT
                </h2>
                <p className="text-gray-700">
                  Pour toute question relative à ce site ou à son contenu :{' '}
                  <a href="mailto:hello@paulmathieucollin.fr" className="hover:text-[#FF5500] transition-colors duration-300">
                    hello@paulmathieucollin.fr
                  </a>
                </p>
              </section>

            </div>
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}
