import { Link } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SmoothScroll } from '../components/SmoothScroll';
import { GlassButton } from '../components/GlassButton';

const offerings = [
  {
    label: 'CLIPS MUSICAUX',
    text: 'De la direction artistique au montage final — des clips qui traduisent l\'univers de l\'artiste en images. Narration visuelle, casting, décors et post-production.',
  },
  {
    label: 'FILMS PUBLICITAIRES',
    text: 'Contenus vidéo pour marques et campagnes — spots publicitaires, vidéos corporate, contenus réseaux sociaux. Un regard artistique au service du brief.',
  },
  {
    label: 'DIRECTION ARTISTIQUE',
    text: 'Conception visuelle de A à Z — mood boards, repérages, stylisme, cadrage. Chaque plan est pensé pour raconter une histoire cohérente.',
  },
  {
    label: 'POST-PRODUCTION',
    text: 'Montage, étalonnage, motion design et VFX — la touche finale qui transforme des rushes en film. Chaque détail compte.',
  },
];

export function VideoProduction() {
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
                  Vidéo<br />Production.
                </h1>
                <p className="text-gray-500 mb-8" style={{ fontSize: '1rem', lineHeight: '1.75' }}>
                  De l'idée au rendu final — clips musicaux, films publicitaires, contenus de marque. Une direction artistique exigeante pour des vidéos qui marquent.
                </p>
                <GlassButton variant="black" href="/contact">
                  Discuter d'un projet
                </GlassButton>
              </div>
              <div style={{ aspectRatio: '4/3', overflow: 'hidden', borderRadius: '2px', background: '#e8e4de' }}>
                <img
                  src="https://images.unsplash.com/photo-1579566346927-c68383817a25?w=900&h=675&fit=crop"
                  alt="Tournage vidéo"
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
                  src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=450&fit=crop"
                  alt="Caméra sur set"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ aspectRatio: '16/9', overflow: 'hidden', borderRadius: '2px', background: '#e8e4de' }}>
                <img
                  src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=450&fit=crop"
                  alt="Post-production"
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
