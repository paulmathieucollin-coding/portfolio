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
import { projectBySlugQuery } from '../../lib/queries';
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

  useEffect(() => {
    if (!slug) return;
    client
      .fetch<SanityProject>(projectBySlugQuery, { slug })
      .then((data) => {
        setProject(data ?? null);
        setLoading(false);
      });
  }, [slug]);

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
            src={urlFor(project.mainImage).width(2000).auto('format').url()}
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
                    src={urlFor(img).width(1600).auto('format').url()}
                    alt={`${project.title} — ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Nav */}
          <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '2.5rem' }}>
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
