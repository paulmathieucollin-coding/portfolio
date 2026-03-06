import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SmoothScroll } from '../components/SmoothScroll';
import { client, urlFor } from '../../lib/sanity';
import { servicesQuery } from '../../lib/queries';
import type { SanityService } from '../../types/project';

export function Solutions() {
  const [services, setServices] = useState<SanityService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch<SanityService[]>(servicesQuery)
      .then((data) => {
        setServices(data ?? []);
        setLoading(false);
      });
  }, []);

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

            {/* Loading */}
            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-100 mb-4" style={{ aspectRatio: '16/10', borderRadius: '2px' }} />
                    <div className="bg-gray-100 h-4 w-24 rounded mb-3" />
                    <div className="bg-gray-100 h-6 w-40 rounded" />
                  </div>
                ))}
              </div>
            )}

            {/* Grille services */}
            {!loading && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                {services.map((s) => (
                  <Link
                    key={s._id}
                    to={`/solutions/${s.slug.current}`}
                    className="group block"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div style={{ aspectRatio: '16/10', overflow: 'hidden', marginBottom: '1.2rem', borderRadius: '2px', background: '#e8e4de' }}>
                      {s.heroImage && (
                        <img
                          src={urlFor(s.heroImage).width(800).height(500).auto('format').url()}
                          alt={s.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                          className="group-hover:scale-[1.04]"
                        />
                      )}
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
                    {s.tagline && (
                      <p className="text-gray-500" style={{ fontSize: '0.9rem', lineHeight: '1.65' }}>
                        {s.tagline.length > 120 ? `${s.tagline.slice(0, 120)}...` : s.tagline}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            )}

          </div>
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
