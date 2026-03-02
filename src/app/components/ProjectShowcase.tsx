import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router';
import gsap from 'gsap';
import { client, urlFor } from '../../lib/sanity';
import { projectsQuery } from '../../lib/queries';
import type { SanityProject } from '../../types/project';

function useClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString('fr-FR', {
        timeZone: 'Europe/Paris',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export function ProjectShowcase() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<SanityProject[]>([]);
  const [current, setCurrent] = useState(0);
  const [view, setView] = useState<'featured' | 'index'>('featured');
  const [transitioning, setTransitioning] = useState(false);
  const time = useClock();

  const imgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const numRef = useRef<HTMLParagraphElement>(null);
  const urlRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    client.fetch<SanityProject[]>(projectsQuery).then((data) => setProjects(data ?? []));
  }, []);

  const goTo = useCallback((index: number) => {
    if (transitioning || !projects.length) return;
    setTransitioning(true);

    gsap.to([imgRef.current, titleRef.current, numRef.current, urlRef.current], {
      opacity: 0,
      y: 12,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setCurrent(index);
        gsap.to([imgRef.current, titleRef.current, numRef.current, urlRef.current], {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: 'power3.out',
          stagger: 0.05,
          onComplete: () => setTransitioning(false),
        });
      },
    });
  }, [transitioning, projects.length]);

  const prev = useCallback(() => goTo((current - 1 + projects.length) % projects.length), [current, projects.length, goTo]);
  const next = useCallback(() => goTo((current + 1) % projects.length), [current, projects.length, goTo]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (view !== 'featured') return;
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next, view]);

  // Initial entrance animation
  useEffect(() => {
    if (!projects.length) return;
    gsap.from([titleRef.current, numRef.current], {
      yPercent: 110,
      duration: 1.1,
      ease: 'power4.out',
      stagger: 0.08,
    });
    gsap.from(imgRef.current, { opacity: 0, duration: 1.4, ease: 'power2.out' });
  }, [projects.length]);

  const project = projects[current];
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#0d0d0d', overflow: 'hidden' }}>

      {/* ── Background image ── */}
      <div ref={imgRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {project && (
          <>
            <img
              key={project._id}
              src={urlFor(project.mainImage).width(1920).height(1080).auto('format').url()}
              alt={project.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {/* Dark gradient overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.65) 100%)',
            }} />
          </>
        )}
      </div>

      {/* ── TOP NAV ── */}
      <header style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        zIndex: 20, padding: '1.25rem 1.5rem',
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr',
        alignItems: 'start',
        color: '#ffffff',
      }}>
        {/* Col 1 — Logo + toggles */}
        <div>
          <Link
            to="/"
            style={{ display: 'block', fontSize: '1rem', fontWeight: 700, letterSpacing: '-0.01em', color: '#fff', marginBottom: '0.35rem', fontFamily: 'GeistMono, monospace' }}
          >
            PMC
          </Link>
          <button
            onClick={() => setView('featured')}
            style={{ display: 'block', background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'GeistMono, monospace', fontSize: '0.65rem', letterSpacing: '0.05em', color: view === 'featured' ? '#ffffff' : 'rgba(255,255,255,0.35)', lineHeight: 1.8 }}
          >
            Featured ({pad(projects.length)})
          </button>
          <button
            onClick={() => setView('index')}
            style={{ display: 'block', background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'GeistMono, monospace', fontSize: '0.65rem', letterSpacing: '0.05em', color: view === 'index' ? '#ffffff' : 'rgba(255,255,255,0.35)', lineHeight: 1.8 }}
          >
            Index ({pad(projects.length)})
          </button>
        </div>

        {/* Col 2 — À propos / Contact */}
        <div style={{ fontSize: '0.7rem', letterSpacing: '0.04em', color: 'rgba(255,255,255,0.65)', lineHeight: 1.9 }}>
          <Link to="/contact" style={{ display: 'block', color: 'inherit' }}>Contact</Link>
          <a href="mailto:hello@paulmathieucollin.fr" style={{ display: 'block', color: 'inherit' }}>
            hello@paulmathieucollin.fr
          </a>
        </div>

        {/* Col 3 — Titre / rôle */}
        <div style={{ fontSize: '0.7rem', letterSpacing: '0.04em', color: 'rgba(255,255,255,0.65)', lineHeight: 1.9 }}>
          <span style={{ display: 'block' }}>Visual Director</span>
          <span style={{ display: 'block' }}>Paris, FR</span>
        </div>

        {/* Col 4 — Heure */}
        <div style={{ textAlign: 'right', fontSize: '0.68rem', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.45)', fontFamily: 'GeistMono, monospace', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
          <span style={{ display: 'inline-block', width: '5px', height: '5px', borderRadius: '50%', background: '#FF5500', flexShrink: 0 }} />
          {time} (CET)
        </div>
      </header>

      {/* ── BOTTOM — titre + nav ── */}
      {project && (
        <footer style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          zIndex: 20, padding: '0 1.5rem 1.5rem',
          color: '#ffffff',
        }}>
          {/* Project number */}
          <p
            ref={numRef}
            style={{ fontFamily: 'GeistMono, monospace', fontSize: '0.65rem', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.45)', marginBottom: '0.5rem' }}
          >
            ({pad(current + 1)})
          </p>

          {/* Project title — clickable */}
          <h2
            ref={titleRef}
            onClick={() => navigate(`/project/${project.slug.current}`)}
            style={{
              fontSize: 'clamp(3rem, 8.5vw, 8.5rem)',
              fontWeight: 600,
              letterSpacing: '-0.03em',
              lineHeight: 0.88,
              cursor: 'pointer',
              marginBottom: '1.25rem',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#FF5500'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#ffffff'; }}
          >
            {project.title}
          </h2>

          {/* Bottom row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Left: prev + URL */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <button
                onClick={prev}
                style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.55)', fontSize: '0.7rem', letterSpacing: '0.06em', cursor: 'pointer', padding: 0, fontFamily: 'GeistMono, monospace' }}
              >
                [←] Prev
              </button>
              <span
                ref={urlRef}
                style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'GeistMono, monospace', letterSpacing: '0.02em' }}
              >
                paulmathieucollin.fr/project/{project.slug.current}
              </span>
            </div>

            {/* Right: social + next */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '0.7rem', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.55)', fontFamily: 'GeistMono, monospace' }}
              >
                Instagram
              </a>
              <button
                onClick={next}
                style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.55)', fontSize: '0.7rem', letterSpacing: '0.06em', cursor: 'pointer', padding: 0, fontFamily: 'GeistMono, monospace' }}
              >
                Next [→]
              </button>
            </div>
          </div>
        </footer>
      )}

      {/* ── INDEX overlay ── */}
      {view === 'index' && (
        <div
          style={{
            position: 'absolute', inset: 0, zIndex: 30,
            background: '#f8f4ee',
            overflowY: 'auto',
            padding: '5rem 1.5rem 3rem',
          }}
        >
          {/* Close button */}
          <button
            onClick={() => setView('featured')}
            style={{
              position: 'fixed', top: '1.25rem', left: '1.5rem',
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'GeistMono, monospace', fontSize: '0.65rem',
              letterSpacing: '0.06em', color: '#111111',
              display: 'flex', alignItems: 'center', gap: '0.4rem',
            }}
          >
            PMC
          </button>
          <button
            onClick={() => setView('featured')}
            style={{
              position: 'fixed', top: '1.25rem', right: '1.5rem',
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'GeistMono, monospace', fontSize: '0.65rem',
              letterSpacing: '0.06em', color: 'rgba(0,0,0,0.4)',
            }}
          >
            ← Featured
          </button>

          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '0.75rem', marginBottom: '0.5rem', display: 'grid', gridTemplateColumns: '3rem 1fr 8rem 6rem', gap: '1rem', alignItems: 'center' }}>
              {['#', 'Projet', 'Catégorie', 'Année'].map((h) => (
                <span key={h} style={{ fontSize: '0.6rem', letterSpacing: '0.1em', color: '#999', fontFamily: 'GeistMono, monospace' }}>{h}</span>
              ))}
            </div>

            {projects.map((p, i) => (
              <div
                key={p._id}
                onClick={() => navigate(`/project/${p.slug.current}`)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '3rem 1fr 8rem 6rem',
                  gap: '1rem',
                  alignItems: 'baseline',
                  padding: '1.1rem 0',
                  borderBottom: '1px solid rgba(0,0,0,0.07)',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.5'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
              >
                <span style={{ fontFamily: 'GeistMono, monospace', fontSize: '0.65rem', color: '#aaa' }}>
                  {pad(i + 1)}
                </span>
                <span style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)', fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1 }}>
                  {p.title}
                </span>
                <span style={{ fontSize: '0.78rem', color: '#888' }}>{p.category}</span>
                <span style={{ fontFamily: 'GeistMono, monospace', fontSize: '0.72rem', color: '#aaa' }}>{p.year}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
