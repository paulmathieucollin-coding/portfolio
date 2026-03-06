import { useParams, Link, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SmoothScroll } from '../components/SmoothScroll';
import { GlassButton } from '../components/GlassButton';
import { client, urlFor } from '../../lib/sanity';
import { serviceBySlugQuery } from '../../lib/queries';
import type { SanityService } from '../../types/project';

export function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<SanityService | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lenis = (window as any).__lenis;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!slug) return;
    client
      .fetch<SanityService>(serviceBySlugQuery, { slug })
      .then((data) => {
        setService(data ?? null);
        setLoading(false);
      });
  }, [slug]);

  useEffect(() => {
    if (!service) return;
    document.title = `${service.title} — Paul Mathieu Collin`;
    return () => {
      document.title = 'Paul Mathieu Collin — Directeur artistique & Photographe';
    };
  }, [service]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse bg-gray-100 rounded w-8 h-8" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="mb-6" style={{ fontSize: '2rem', fontWeight: 700 }}>
            Service introuvable
          </h1>
          <GlassButton variant="black" onClick={() => navigate('/solutions')}>
            Retour aux solutions
          </GlassButton>
        </div>
      </div>
    );
  }

  const isExternal = service.ctaLink && service.ctaLink.startsWith('http');

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
                  {service.title.split(' ').map((word, i) => (
                    <span key={i}>
                      {i > 0 && <br />}
                      {word}
                    </span>
                  ))}.
                </h1>
                {service.tagline && (
                  <p className="text-gray-500 mb-8" style={{ fontSize: '1rem', lineHeight: '1.75' }}>
                    {service.tagline}
                  </p>
                )}
                {service.ctaLabel && service.ctaLink && (
                  <GlassButton
                    variant="black"
                    href={service.ctaLink}
                    {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {service.ctaLabel}
                  </GlassButton>
                )}
              </div>
              {service.heroImage && (
                <div style={{ aspectRatio: '4/3', overflow: 'hidden', borderRadius: '2px', background: '#e8e4de' }}>
                  <img
                    src={urlFor(service.heroImage).width(900).height(675).auto('format').url()}
                    alt={service.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              )}
            </div>

            {/* Milestones (parcours) — optionnel */}
            {service.milestones && service.milestones.length > 0 && (
              <div className="mb-20 md:mb-28">
                <p style={{
                  fontFamily: 'GeistMono, monospace', fontSize: '0.62rem',
                  letterSpacing: '0.12em', color: '#aaa', marginBottom: '2.5rem', textTransform: 'uppercase',
                }}>
                  Parcours
                </p>
                <div className="space-y-0">
                  {service.milestones.map((m) => (
                    <div key={m._key} style={{ display: 'grid', gridTemplateColumns: '5rem 1fr', gap: '2rem', borderTop: '1px solid rgba(0,0,0,0.08)', padding: '1.5rem 0' }}>
                      <span style={{ fontFamily: 'GeistMono, monospace', fontSize: '0.75rem', color: '#999' }}>{m.year}</span>
                      <p className="text-gray-600" style={{ fontSize: '0.95rem', lineHeight: '1.65' }}>{m.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Offres */}
            {service.offerings && service.offerings.length > 0 && (
              <div className="mb-20 md:mb-28">
                <p style={{
                  fontFamily: 'GeistMono, monospace', fontSize: '0.62rem',
                  letterSpacing: '0.12em', color: '#aaa', marginBottom: '2.5rem', textTransform: 'uppercase',
                }}>
                  {service.milestones && service.milestones.length > 0 ? 'Services' : 'Ce que je propose'}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                  {service.offerings.map((o) => (
                    <div key={o._key} style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '1.5rem' }}>
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
            )}

            {/* Galerie */}
            {service.galleryImages && service.galleryImages.length > 0 && (
              <div className={`grid grid-cols-1 ${service.galleryImages.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-4 mb-20 md:mb-28`}>
                {service.galleryImages.map((img, i) => (
                  <div key={i} style={{ aspectRatio: service.galleryImages!.length >= 3 ? '1/1' : '16/9', overflow: 'hidden', borderRadius: '2px', background: '#e8e4de' }}>
                    <img
                      src={urlFor(img).width(800).auto('format').url()}
                      alt={img.alt || `${service.title} — ${i + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* CTA final */}
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
