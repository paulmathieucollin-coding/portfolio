import { Link } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SmoothScroll } from '../components/SmoothScroll';
import { GlassButton } from '../components/GlassButton';

const offerings = [
  {
    label: 'IDENTITÉ SONORE',
    text: 'Création d\'une signature audio unique pour votre marque — logo sonore, jingles, ambiances de marque. Une identité qui se reconnaît les yeux fermés.',
  },
  {
    label: 'SOUND DESIGN FILM & VIDÉO',
    text: 'Design sonore pour films, documentaires et contenus vidéo — bruitage, foley, ambiances, effets. Chaque son est pensé pour servir l\'image.',
  },
  {
    label: 'MUSIQUE DE MARQUE',
    text: 'Compositions originales pour campagnes publicitaires, événements et expériences digitales. Des morceaux sur mesure qui portent votre message.',
  },
  {
    label: 'MIXAGE & MASTERING',
    text: 'Traitement professionnel de vos productions — mixage, mastering et finalisation pour un son prêt à diffuser.',
  },
];

export function SoundDesign() {
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
                  Sound<br />Design.
                </h1>
                <p className="text-gray-500 mb-8" style={{ fontSize: '1rem', lineHeight: '1.75' }}>
                  Le son donne une dimension invisible à vos projets. Identité sonore, design audio pour vidéo ou création musicale — chaque fréquence est pensée pour amplifier votre message et marquer les esprits.
                </p>
                <GlassButton variant="black" href="/contact">
                  Discuter d'un projet
                </GlassButton>
              </div>
              <div style={{ aspectRatio: '4/3', overflow: 'hidden', borderRadius: '2px', background: '#e8e4de' }}>
                <img
                  src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=900&h=675&fit=crop"
                  alt="Studio d'enregistrement"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>

            {/* Offres */}
            <div className="mb-20 md:mb-28">
              <p style={{
                fontFamily: 'GeistMono, monospace', fontSize: '0.62rem',
                letterSpacing: '0.12em', color: '#aaa', marginBottom: '2.5rem', textTransform: 'uppercase',
              }}>
                Ce que je propose
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-20 md:mb-28">
              <div style={{ aspectRatio: '16/9', overflow: 'hidden', borderRadius: '2px', background: '#e8e4de' }}>
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=450&fit=crop"
                  alt="Console de mixage"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ aspectRatio: '16/9', overflow: 'hidden', borderRadius: '2px', background: '#e8e4de' }}>
                <img
                  src="https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&h=450&fit=crop"
                  alt="Production musicale"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>

            {/* CTA */}
            <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '2.5rem' }}>
              <GlassButton variant="black" href="/contact">
                Prendre contact
              </GlassButton>
            </div>

          </div>
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
