import { useEffect, useRef } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SmoothScroll } from '../components/SmoothScroll';

// ── URLs des posts/reels Instagram à afficher ──
// Remplace ces URLs par les tiennes depuis instagram.com/pmc.mp3
const INSTAGRAM_POSTS = [
  'https://www.instagram.com/reel/DHKvXbWNbhR/',
  'https://www.instagram.com/reel/DG5Qr8fN1dD/',
];

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

function InstagramEmbed({ url }: { url: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Injecter le script Instagram SDK s'il n'existe pas encore
    if (!document.getElementById('instagram-embed-sdk')) {
      const script = document.createElement('script');
      script.id = 'instagram-embed-sdk';
      script.src = '//www.instagram.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    }

    // Re-processer les embeds quand le SDK est prêt
    const tryProcess = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      } else {
        setTimeout(tryProcess, 300);
      }
    };
    tryProcess();
  }, [url]);

  return (
    <div ref={ref} style={{ maxWidth: '540px', width: '100%' }}>
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={`${url}?utm_source=ig_embed`}
        data-instgrm-version="14"
        style={{
          background: '#FFF',
          border: 0,
          borderRadius: '3px',
          boxShadow: '0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)',
          margin: '1px',
          maxWidth: '540px',
          minWidth: '326px',
          padding: 0,
          width: '100%',
        }}
      />
    </div>
  );
}

export function Instagram() {
  useEffect(() => {
    document.title = 'Instagram — Paul Mathieu Collin';
    return () => {
      document.title = 'Paul Mathieu Collin — Directeur artistique & Photographe';
    };
  }, []);

  return (
    <SmoothScroll>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 pt-28 md:pt-36 pb-24 md:pb-32 px-6 md:px-12">
          <div className="max-w-[1440px] mx-auto">

            {/* Hero */}
            <div className="mb-16 md:mb-24">
              <p style={{
                fontFamily: 'GeistMono, monospace', fontSize: '0.58rem',
                letterSpacing: '0.14em', color: '#aaa', marginBottom: '1.2rem',
                textTransform: 'uppercase',
              }}>
                @pmc.mp3
              </p>
              <h1
                className="tracking-tight mb-6"
                style={{
                  fontSize: 'clamp(3rem, 7vw, 7rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  lineHeight: 0.95,
                }}
              >
                Instagram.
              </h1>
              <p className="text-gray-500 max-w-lg" style={{ fontSize: '1rem', lineHeight: '1.7' }}>
                Coulisses, projets en cours et extraits — suivez l'univers de PMC au quotidien.
              </p>
            </div>

            {/* Lien profil */}
            <div style={{ marginBottom: '3rem' }}>
              <a
                href="https://www.instagram.com/pmc.mp3"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'GeistMono, monospace',
                  fontSize: '0.72rem',
                  letterSpacing: '0.06em',
                  color: '#333',
                  padding: '0.55rem 1.2rem',
                  border: '1px solid rgba(0,0,0,0.15)',
                  borderRadius: '2px',
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#333'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#333'; }}
              >
                Voir le profil complet ↗
              </a>
            </div>

            {/* Embeds Instagram */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
              style={{ justifyItems: 'center' }}
            >
              {INSTAGRAM_POSTS.map((url) => (
                <InstagramEmbed key={url} url={url} />
              ))}
            </div>

          </div>
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
