import { ImageWithFallback } from './figma/ImageWithFallback';
import { useNavigate } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { client, urlFor } from '../../lib/sanity';
import { projectsQuery } from '../../lib/queries';
import type { SanityProject } from '../../types/project';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ['Tous', 'Photo', 'Vidéo', 'Direction'];

export function ProjectGrid() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [projects, setProjects] = useState<SanityProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.fetch<SanityProject[]>(projectsQuery).then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  const filtered =
    activeFilter === 'Tous' ? projects : projects.filter((p) => p.category === activeFilter);

  useEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
        },
      });

      // Filters reveal
      gsap.from(filtersRef.current?.children ? Array.from(filtersRef.current.children) : [], {
        opacity: 0,
        y: 16,
        duration: 0.6,
        stagger: 0.06,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: filtersRef.current,
          start: 'top 88%',
        },
      });

      // Cards stagger reveal
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: 'power3.out',
          delay: i * 0.07,
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [loading]);

  // Re-animate when filter changes
  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: i * 0.05 },
      );
    });
  }, [activeFilter]);

  return (
    <section id="projects" ref={sectionRef} className="py-20 md:py-32 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        {/* Section header */}
        <div ref={headingRef} className="mb-10 md:mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2
            className="tracking-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 700, letterSpacing: '-0.02em' }}
          >
            Projets sélectionnés
          </h2>
          <p className="text-gray-400" style={{ fontSize: '0.9rem' }}>
            {loading ? '—' : `${filtered.length} projet${filtered.length > 1 ? 's' : ''}`}
          </p>
        </div>

        {/* Filters */}
        <div ref={filtersRef} className="flex gap-2 mb-12 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className="transition-all duration-300"
              style={{
                padding: '0.4rem 1.1rem',
                fontSize: '0.78rem',
                fontWeight: 500,
                letterSpacing: '0.04em',
                borderRadius: '2px',
                border: '1px solid',
                borderColor: activeFilter === cat ? '#0000FF' : 'rgba(0,0,0,0.15)',
                backgroundColor: activeFilter === cat ? '#0000FF' : 'transparent',
                color: activeFilter === cat ? '#ffffff' : '#666666',
                cursor: 'pointer',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-100 mb-4" style={{ borderRadius: '2px', aspectRatio: '4/5' }} />
                <div className="flex justify-between">
                  <div className="bg-gray-100 h-4 w-32 rounded" />
                  <div className="bg-gray-100 h-4 w-20 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filtered.map((project, i) => (
              <div
                key={project._id}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="group cursor-pointer"
                onClick={() => navigate(`/project/${project.slug.current}`)}
              >
                {/* Image container */}
                <div
                  className="relative overflow-hidden mb-4 bg-gray-100"
                  style={{ borderRadius: '2px', aspectRatio: '4/5' }}
                >
                  <ImageWithFallback
                    src={urlFor(project.mainImage).width(800).auto('format').url()}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />

                  {/* Hover overlay — slide up reveal */}
                  <div
                    className="absolute inset-0 flex flex-col justify-end p-5 transition-all duration-500"
                    style={{
                      background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 55%)',
                      opacity: 0,
                    }}
                    ref={(el) => {
                      if (el) {
                        const parent = el.closest('.group');
                        if (parent) {
                          parent.addEventListener('mouseenter', () => {
                            gsap.to(el, { opacity: 1, duration: 0.35, ease: 'power2.out' });
                          });
                          parent.addEventListener('mouseleave', () => {
                            gsap.to(el, { opacity: 0, duration: 0.35, ease: 'power2.out' });
                          });
                        }
                      }
                    }}
                  >
                    <span
                      className="text-white"
                      style={{ fontSize: '0.75rem', letterSpacing: '0.12em', fontWeight: 500 }}
                    >
                      VOIR LE PROJET →
                    </span>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex justify-between items-baseline">
                  <h3
                    className="tracking-tight transition-colors duration-300 group-hover:text-[#0000FF]"
                    style={{ fontSize: '1.0625rem', fontWeight: 600 }}
                  >
                    {project.title}
                  </h3>
                  <div className="flex gap-3 text-gray-400" style={{ fontSize: '0.8rem' }}>
                    <span>{project.category}</span>
                    <span>{project.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
