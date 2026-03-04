import { useParams, useNavigate } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { GlassButton } from '../components/GlassButton';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { SmoothScroll } from '../components/SmoothScroll';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { client, urlFor } from '../../lib/sanity';
import { projectBySlugQuery, projectsQuery } from '../../lib/queries';
import type { SanityProject } from '../../types/project';
import { VideoPlayer } from '../components/VideoPlayer';

gsap.registerPlugin(ScrollTrigger);

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const heroImgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [project, setProject] = useState<SanityProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProjects, setRelatedProjects] = useState<SanityProject[]>([]);

  // ── Scroll en haut à chaque changement de projet ──
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  useEffect(() => {
    if (!slug) return;
    client
      .fetch<SanityProject>(projectBySlugQuery, { slug })
      .then((data) => {
        setProject(data ?? null);
        setLoading(false);
      });
  }, [slug]);

  // ── Meta dynamique par projet ──
  useEffect(() => {
    if (!project) return;
    document.title = `${project.title} — Paul Mathieu Collin`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        project.description
          ? `${project.description} — Paul Mathieu Collin`
          : `${project.title} — Projet de direction artistique par Paul Mathieu Collin.`
      );
    }
    return () => {
      document.title = 'Paul Mathieu Collin — Directeur artistique & Photographe';
      const d = document.querySelector('meta[name="description"]');
      if (d) d.setAttribute('content', 'Paul Mathieu Collin — Directeur artistique et photographe basé à Paris. Portfolio de projets visuels, campagnes et direction artistique.');
    };
  }, [project]);

  useEffect(() => {
    if (!project) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Hero parallax
      if (heroImgRef.current) {
        gsap.to(heroImgRef.current.querySelector('img, .img-inner'), {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: heroImgRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      tl.from(titleRef.current, { y: 40, opacity: 0, duration: 1, delay: 0.1 })
        .from(metaRef.current?.children ? Array.from(metaRef.current.children) : [], {
          y: 20, opacity: 0, stagger: 0.08, duration: 0.7,
        }, '-=0.5')
        .from(bodyRef.current?.children ? Array.from(bodyRef.current.children) : [], {
          y: 20, opacity: 0, stagger: 0.1, duration: 0.7,
        }, '-=0.4');

      // Images reveal on scroll
      imagesRef.current.forEach((img) => {
        if (!img) return;
        gsap.from(img, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: img,
            start: 'top 85%',
          },
        });
      });
    });

    return () => ctx.revert();
  }, [project]);

  // ── 3 projets aléatoires (hors projet courant) ──
  useEffect(() => {
    if (!project) return;
    client.fetch<SanityProject[]>(projectsQuery).then((all) => {
      const others = (all ?? []).filter((p) => p._id !== project._id);
      // Fisher-Yates shuffle
      for (let i = others.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [others[i], others[j]] = [others[j], others[i]];
      }
      setRelatedProjects(others.slice(0, 3));
    });
  }, [project]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse bg-gray-100 rounded w-8 h-8" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="mb-6" style={{ fontSize: '2rem', fontWeight: 700 }}>
            Projet introuvable
          </h1>
          <GlassButton variant="black" onClick={() => navigate('/')}>
            Retour
          </GlassButton>
        </div>
      </div>
    );
  }

  return (
    <SmoothScroll>
      <div className="min-h-screen">
        <Header />

        {/* Hero */}
        <div ref={heroImgRef} className="pt-14 overflow-hidden" style={{ height: '75vh' }}>
          <ImageWithFallback
            src={urlFor(project.mainImage).width(1600).auto('format').url()}
            alt={project.title}
            className="w-full h-full object-cover scale-[1.08]"
          />
        </div>

        {/* Content */}
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-28">
          {/* Title + meta */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 md:mb-28">
            <div className="lg:col-span-7">
              <h1
                ref={titleRef}
                className="tracking-tight"
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 5.5rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                }}
              >
                {project.title}
              </h1>
            </div>

            <div className="lg:col-span-5">
              <div ref={metaRef} className="flex gap-12 mb-8">
                <div>
                  <p className="text-gray-400 mb-1"
                    style={{ fontSize: '0.7rem', letterSpacing: '0.1em', fontWeight: 500 }}>
                    CATÉGORIE
                  </p>
                  <p style={{ fontSize: '1rem' }}>{project.category}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1"
                    style={{ fontSize: '0.7rem', letterSpacing: '0.1em', fontWeight: 500 }}>
                    ANNÉE
                  </p>
                  <p style={{ fontSize: '1rem' }}>{project.year}</p>
                </div>
              </div>

              {project.description && (
                <p className="text-gray-500" style={{ fontSize: '1rem', lineHeight: '1.75' }}>
                  {project.description}
                </p>
              )}
            </div>
          </div>

          {/* Enjeu / Approche */}
          {(project.challenge || project.approach) && (
            <div ref={bodyRef} className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 mb-20 md:mb-36"
              style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '3rem' }}>
              {project.challenge && (
                <div>
                  <h2 className="mb-4 tracking-tight"
                    style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                    Enjeu
                  </h2>
                  <p className="text-gray-500" style={{ fontSize: '0.9375rem', lineHeight: '1.75' }}>
                    {project.challenge}
                  </p>
                </div>
              )}
              {project.approach && (
                <div>
                  <h2 className="mb-4 tracking-tight"
                    style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                    Approche
                  </h2>
                  <p className="text-gray-500" style={{ fontSize: '0.9375rem', lineHeight: '1.75' }}>
                    {project.approach}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Vidéos */}
          {project.videos && project.videos.length > 0 && (
            <div className="space-y-6 md:space-y-8 mb-20 md:mb-28">
              {project.videos.map((video) => (
                <div key={video._key}>
                  {video.title && (
                    <p
                      className="mb-3"
                      style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em', color: '#6b6560' }}
                    >
                      {video.title.toUpperCase()}
                    </p>
                  )}
                  <VideoPlayer video={video} />
                </div>
              ))}
            </div>
          )}

          {/* Galerie */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="space-y-6 md:space-y-8 mb-20 md:mb-28">
              {project.gallery.map((img, i) => (
                <div
                  key={i}
                  ref={(el) => { imagesRef.current[i] = el; }}
                  className="overflow-hidden bg-gray-100"
                  style={{ borderRadius: '2px', aspectRatio: '16/9' }}
                >
                  <ImageWithFallback
                    src={urlFor(img).width(1200).auto('format').url()}
                    alt={`${project.title} — ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Voir aussi */}
          {relatedProjects.length > 0 && (
            <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '3rem', marginBottom: '4rem' }}>
              <p style={{
                fontFamily: 'GeistMono, monospace', fontSize: '0.62rem',
                letterSpacing: '0.12em', color: '#aaa', marginBottom: '2.5rem', textTransform: 'uppercase',
              }}>Voir aussi</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {relatedProjects.map((p) => (
                  <div key={p._id}
                    onClick={() => navigate(`/project/${p.slug.current}`)}
                    style={{ cursor: 'pointer' }}>
                    <div style={{ aspectRatio: '16/9', overflow: 'hidden', marginBottom: '0.85rem', background: '#f0f0f0', borderRadius: '2px' }}>
                      <img
                        src={urlFor(p.mainImage).width(600).height(338).auto('format').url()}
                        alt={p.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.45s ease' }}
                        onMouseEnter={(e) => { (e.target as HTMLImageElement).style.transform = 'scale(1.04)'; }}
                        onMouseLeave={(e) => { (e.target as HTMLImageElement).style.transform = 'scale(1)'; }}
                      />
                    </div>
                    <p style={{ fontFamily: 'GeistMono, monospace', fontSize: '0.58rem', letterSpacing: '0.1em', color: '#aaa', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                      {p.category}{p.year ? ` — ${p.year}` : ''}
                    </p>
                    <p style={{ fontSize: '1rem', fontWeight: 600, letterSpacing: '-0.02em', color: '#111' }}>
                      {p.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Nav */}
          <div style={{ paddingBottom: '1.5rem' }}>
            <GlassButton variant="black" onClick={() => navigate('/')}>
              ← Tous les projets
            </GlassButton>
          </div>
        </div>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
