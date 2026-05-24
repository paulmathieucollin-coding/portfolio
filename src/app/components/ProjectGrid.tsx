import { useNavigate } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { client, urlFor } from '../../lib/sanity';
import { projectsQuery } from '../../lib/queries';
import type { SanityProject } from '../../types/project';
import { playHoverSound } from '../hooks/useHoverSound';

gsap.registerPlugin(ScrollTrigger);

export function ProjectGrid() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const previewImgRef = useRef<HTMLImageElement>(null);
  const [projects, setProjects] = useState<SanityProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    client.fetch<SanityProject[]>(projectsQuery)
      .then((data) => {
        setProjects(data ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (loading || !listRef.current) return;
    const items = listRef.current.querySelectorAll('.project-row');
    const ctx = gsap.context(() => {
      gsap.from(items, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: listRef.current,
          start: 'top 85%',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [loading]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!previewRef.current) return;
    previewRef.current.style.left = `${e.clientX - 100}px`;
    previewRef.current.style.top = `${e.clientY - 75}px`;
  };

  const handleEnter = (idx: number) => {
    setHoveredIdx(idx);
    playHoverSound();
    if (previewRef.current) {
      gsap.to(previewRef.current, { opacity: 1, scale: 1, duration: 0.25, ease: 'power2.out' });
    }
  };

  const handleLeave = () => {
    setHoveredIdx(null);
    if (previewRef.current) {
      gsap.to(previewRef.current, { opacity: 0, scale: 0.92, duration: 0.2, ease: 'power2.in' });
    }
  };

  const hoveredProject = hoveredIdx !== null ? projects[hoveredIdx] : null;

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative min-h-screen w-full flex flex-col justify-center"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 py-20 md:py-32">
        {/* Section title */}
        <h2
          className="mb-16 md:mb-24"
          style={{
            fontSize: 'clamp(0.7rem, 0.9vw, 0.8rem)',
            fontWeight: 500,
            letterSpacing: '0.15em',
            color: 'rgba(255,255,255,0.35)',
            textTransform: 'uppercase',
          }}
        >
          Selected Work
        </h2>

        {loading && (
          <div className="space-y-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse h-16" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }} />
            ))}
          </div>
        )}

        {!loading && (
          <div ref={listRef}>
            {projects.map((project, i) => (
              <div
                key={project._id}
                className="project-row cursor-pointer"
                style={{
                  borderTop: i === 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                }}
                onClick={() => navigate(`/project/${project.slug.current}`)}
                onMouseEnter={() => handleEnter(i)}
                onMouseLeave={handleLeave}
                onMouseMove={handleMouseMove}
              >
                <div
                  className="flex items-center justify-between py-6 md:py-8 transition-all duration-300"
                  style={{ paddingLeft: hoveredIdx === i ? '1.5rem' : '0' }}
                >
                  {/* Left: index + title */}
                  <div className="flex items-baseline gap-6 md:gap-10">
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: 'rgba(255,255,255,0.2)',
                        minWidth: '2rem',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3
                      className="transition-colors duration-300"
                      style={{
                        fontSize: 'clamp(1.5rem, 3.5vw, 3rem)',
                        fontWeight: 600,
                        letterSpacing: '-0.02em',
                        color: hoveredIdx === i ? '#ffffff' : 'rgba(255,255,255,0.5)',
                      }}
                    >
                      {project.title}
                    </h3>
                  </div>

                  {/* Right: category + year */}
                  <div className="hidden md:flex items-center gap-8">
                    <span
                      style={{
                        fontSize: '0.8rem',
                        color: 'rgba(255,255,255,0.3)',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {project.category}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8rem',
                        color: 'rgba(255,255,255,0.2)',
                      }}
                    >
                      {project.year}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pixelated preview that follows cursor */}
      <div
        ref={previewRef}
        className="pointer-events-none fixed z-50"
        style={{
          opacity: 0,
          transform: 'scale(0.92)',
          width: '200px',
          aspectRatio: '4/3',
          overflow: 'hidden',
          imageRendering: 'pixelated',
        }}
      >
        {hoveredProject?.mainImage && (
          <img
            ref={previewImgRef}
            src={urlFor(hoveredProject.mainImage).width(40).height(30).auto('format').url()}
            alt={hoveredProject.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              imageRendering: 'pixelated',
              filter: 'contrast(1.1)',
            }}
          />
        )}
      </div>
    </section>
  );
}
