import { Link } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SmoothScroll } from '../components/SmoothScroll';
import { GlassButton } from '../components/GlassButton';

const milestones = [
  { year: '2014', text: 'Premiers instrumentaux — inspiré par Stromae et ses tutoriels.' },
  { year: '2020', text: 'Retour aux sources pendant le confinement. Beatmaking quotidien — la révélation.' },
  { year: '2022', text: 'Premiers contrats exclusifs et d\'édition — collaboration avec Mentos et le titre "Fresh Talk" avec Keyzane.' },
  { year: '2025', text: 'Développement de PMC comme projet artistique complet — composition, écriture, direction artistique.' },
];

const offerings = [
  {
    label: 'BEATMAKING & COMPOSITION',
    text: 'Création d\'instrumentaux originaux — trap, drill, afro, pop. Des prods sur mesure ou sur catalogue, prêtes à être posées.',
  },
  {
    label: 'ÉCRITURE & TOPLINING',
    text: 'Écriture de textes et de mélodies — en solo ou en session. Du concept à la punchline, chaque mot est pesé.',
  },
  {
    label: 'DIRECTION ARTISTIQUE MUSICALE',
    text: 'Accompagnement d\'artistes dans leur identité sonore — choix des prods, direction d\'enregistrement, cohérence artistique.',
  },
  {
    label: 'PRODUCTION EXÉCUTIVE',
    text: 'Gestion complète d\'un projet musical — de la pré-prod à la livraison masters. Coordination studio, mixage, mastering.',
  },
];

export function ProductionPMC() {
  return (
    <SmoothScroll>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 pt-28 md:pt-36 pb-24 md:pb-32 px-6 md:px-12">
          <div className="max-w-[1440px] mx-auto">

            {/* Breadcrumb */}
            <div style={{ marginBottom: '3rem' }}>
              <Link to="/solutions" style={{ fontFamily: 'GeistMono, monospace', fontSize: '0.6rem', letterSpacing: '0.1em', color: '#aaa', textDecoration: 'none' }}>
                ← SOLUTIONS
              </Link>
            </div>

            {/* Hero */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20 md:mb-28">
              <div>
                <h1
                  className="tracking-tight mb-6"
                  style={{
                    fontSize: 'clamp(2.5rem, 5vw, 5rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                  }}
                >
                  Production<br />PMC.
                </h1>
                <p className="text-gray-500 mb-4" style={{ fontSize: '1rem', lineHeight: '1.75' }}>
                  PMC, c'est le projet musical de Paul Mathieu Collin — beatmaker, compositeur et rappeur. Des instrumentaux depuis 2014, des textes depuis 2020, et une vision artistique qui mêle direction visuelle et création sonore.
                </p>
                <p className="text-gray-400 mb-8" style={{ fontSize: '0.9rem', lineHeight: '1.7' }}>
                  Disponible pour des placements de prods, des sessions d'écriture, et de la direction artistique musicale.
                </p>
                <div className="flex gap-4">
                  <GlassButton variant="black" href="https://www.instagram.com/pmc.mp3">
                    @pmc.mp3
                  </GlassButton>
                  <GlassButton variant="white" href="/contact">
                    Contact
                  </GlassButton>
                </div>
              </div>
              <div style={{ aspectRatio: '4/3', overflow: 'hidden', borderRadius: '2px', background: '#e8e4de' }}>
                <img
                  src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=900&h=675&fit=crop"
                  alt="Studio musique"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>

            {/* Parcours */}
            <div className="mb-20 md:mb-28">
              <p style={{
                fontFamily: 'GeistMono, monospace', fontSize: '0.62rem',
                letterSpacing: '0.12em', color: '#aaa', marginBottom: '2.5rem', textTransform: 'uppercase',
              }}>
                Parcours
              </p>
              <div className="space-y-0">
                {milestones.map((m) => (
                  <div key={m.year} style={{ display: 'grid', gridTemplateColumns: '5rem 1fr', gap: '2rem', borderTop: '1px solid rgba(0,0,0,0.08)', padding: '1.5rem 0' }}>
                    <span style={{ fontFamily: 'GeistMono, monospace', fontSize: '0.75rem', color: '#999' }}>{m.year}</span>
                    <p className="text-gray-600" style={{ fontSize: '0.95rem', lineHeight: '1.65' }}>{m.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Offres */}
            <div className="mb-20 md:mb-28">
              <p style={{
                fontFamily: 'GeistMono, monospace', fontSize: '0.62rem',
                letterSpacing: '0.12em', color: '#aaa', marginBottom: '2.5rem', textTransform: 'uppercase',
              }}>
                Services
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                {offerings.map((o) => (
                  <div key={o.label} style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '1.5rem' }}>
                    <p style={{
                      fontFamily: 'GeistMono, monospace', fontSize: '0.58rem',
                      letterSpacing: '0.12em', color: '#999', marginBottom: '0.8rem',
                    }}>
                      {o.label}
                    </p>
                    <p className="text-gray-600" style={{ fontSize: '0.95rem', lineHeight: '1.7' }}>
                      {o.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Galerie */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20 md:mb-28">
              <div style={{ aspectRatio: '1/1', overflow: 'hidden', borderRadius: '2px', background: '#e8e4de' }}>
                <img
                  src="https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=600&h=600&fit=crop"
                  alt="Beatmaking"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ aspectRatio: '1/1', overflow: 'hidden', borderRadius: '2px', background: '#e8e4de' }}>
                <img
                  src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=600&fit=crop"
                  alt="Performance live"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ aspectRatio: '1/1', overflow: 'hidden', borderRadius: '2px', background: '#e8e4de' }}>
                <img
                  src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=600&fit=crop"
                  alt="Studio enregistrement"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>

            {/* CTA */}
            <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '2.5rem' }}>
              <GlassButton variant="black" href="/contact">
                Discuter d'un projet
              </GlassButton>
            </div>

          </div>
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
