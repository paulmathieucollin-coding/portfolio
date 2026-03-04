import { Link } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SmoothScroll } from '../components/SmoothScroll';

const services = [
  {
    slug: 'sound-design',
    title: 'Sound Design',
    description: 'Identité sonore, design audio et création d\'ambiances immersives pour marques, films et expériences digitales.',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=500&fit=crop',
  },
  {
    slug: 'video-production',
    title: 'Vidéo Production',
    description: 'Direction artistique vidéo, clips musicaux, films publicitaires et contenus de marque — de la conception à la post-production.',
    image: 'https://images.unsplash.com/photo-1579566346927-c68383817a25?w=800&h=500&fit=crop',
  },
  {
    slug: 'production-pmc',
    title: 'Production PMC',
    description: 'Composition, beatmaking et direction artistique musicale — l\'univers sonore de PMC au service de vos projets.',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=500&fit=crop',
  },
];

export function Solutions() {
  return (
    <SmoothScroll>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 pt-28 md:pt-36 pb-24 md:pb-32 px-6 md:px-12">
          <div className="max-w-[1440px] mx-auto">

            {/* Titre */}
            <h1
              className="tracking-tight mb-6"
              style={{
                fontSize: 'clamp(3rem, 7vw, 7rem)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 0.95,
              }}
            >
              Solutions.
            </h1>
            <p className="text-gray-500 max-w-xl mb-20 md:mb-28" style={{ fontSize: '1rem', lineHeight: '1.7' }}>
              Direction artistique, production audiovisuelle et création sonore — un accompagnement complet pour donner vie à vos projets.
            </p>

            {/* Grille services */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {services.map((s) => (
                <Link
                  key={s.slug}
                  to={`/solutions/${s.slug}`}
                  className="group block"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div style={{ aspectRatio: '16/10', overflow: 'hidden', marginBottom: '1.2rem', borderRadius: '2px', background: '#e8e4de' }}>
                    <img
                      src={s.image}
                      alt={s.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                      className="group-hover:scale-[1.04]"
                    />
                  </div>
                  <p style={{
                    fontFamily: 'GeistMono, monospace', fontSize: '0.58rem',
                    letterSpacing: '0.12em', color: '#aaa', marginBottom: '0.5rem', textTransform: 'uppercase',
                  }}>
                    Service
                  </p>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '0.6rem' }}>
                    {s.title}
                  </h2>
                  <p className="text-gray-500" style={{ fontSize: '0.9rem', lineHeight: '1.65' }}>
                    {s.description}
                  </p>
                </Link>
              ))}
            </div>

          </div>
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
