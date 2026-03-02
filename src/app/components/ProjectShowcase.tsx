import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router';
import gsap from 'gsap';
import { client, urlFor } from '../../lib/sanity';
import { projectsQuery } from '../../lib/queries';
import type { SanityProject } from '../../types/project';

function useClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => setTime(
      new Date().toLocaleTimeString('fr-FR', { timeZone: 'Europe/Paris', hour: '2-digit', minute: '2-digit', hour12: false })
    );
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function CustomLabel() {
  const ref = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const cur = useRef({ x: 0, y: 0 });
  const raf = useRef<number>();
  useEffect(() => {
    const onMove = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', onMove, { passive: true });
    const loop = () => {
      cur.current.x += (pos.current.x - cur.current.x) * 0.12;
      cur.current.y += (pos.current.y - cur.current.y) * 0.12;
      if (ref.current) ref.current.style.transform = `translate(${cur.current.x}px,${cur.current.y}px) translate(-50%,-50%)`;
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf.current!); };
  }, []);
  return (
    <div ref={ref} id="showcase-cursor" style={{
      position: 'fixed', top: 0, left: 0, zIndex: 9999, pointerEvents: 'none',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      width: '120px', height: '120px', borderRadius: '50%',
      background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.18)',
      opacity: 0, transition: 'opacity 0.25s ease',
    }}>
      <span style={{ fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#fff', whiteSpace: 'nowrap', fontFamily: 'GeistMono, monospace' }}>
        Ouvrir →
      </span>
    </div>
  );
}

const pad = (n: number) => String(n).padStart(2, '0');
const showCursor = () => { const el = document.getElementById('showcase-cursor'); if (el) el.style.opacity = '1'; };
const hideCursor = () => { const el = document.getElementById('showcase-cursor'); if (el) el.style.opacity = '0'; };

export function ProjectShowcase() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<SanityProject[]>([]);
  const [current, setCurrent] = useState(0);
  const [view, setView] = useState<'featured' | 'index'>('featured');
  const [ready, setReady] = useState(false);
  const transitioning = useRef(false);
  const time = useClock();

  const curtainRef  = useRef<HTMLDivElement>(null);
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const numRef      = useRef<HTMLParagraphElement>(null);
  const urlLabelRef = useRef<HTMLSpanElement>(null);
  const headerRef   = useRef<HTMLElement>(null);
  const navPrevRef  = useRef<HTMLButtonElement>(null);
  const navNextRef  = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    client.fetch<SanityProject[]>(projectsQuery).then((data) => setProjects(data ?? []));
  }, []);

  // Entrance animation
  useEffect(() => {
    if (!projects.length || ready) return;
    setReady(true);
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.set(curtainRef.current, { yPercent: 0 })
      .to(curtainRef.current, { yPercent: -100, duration: 1.3, ease: 'power4.inOut' })
      .from(titleRef.current, { yPercent: 110, duration: 1.0 }, '-=0.55')
      .from(numRef.current,   { yPercent: 120, opacity: 0, duration: 0.7 }, '-=0.85')
      .from(urlLabelRef.current, { opacity: 0, x: -10, duration: 0.5 }, '-=0.45')
      .from(headerRef.current, { opacity: 0, y: -16, duration: 0.6 }, '-=0.95')
      .from([navPrevRef.current, navNextRef.current], { opacity: 0, duration: 0.5, stagger: 0.06 }, '-=0.5');
  }, [projects.length, ready]);

  // Transition between slides — curtain wipe
  const goTo = useCallback((index: number) => {
    if (transitioning.current || !projects.length) return;
    transitioning.current = true;
    const tl = gsap.timeline({ onComplete: () => { transitioning.current = false; } });
    tl.to([titleRef.current, numRef.current, urlLabelRef.current], { opacity: 0, y: -14, duration: 0.25, ease: 'power2.in', stagger: 0.03 })
      .set(curtainRef.current, { yPercent: 100 })
      .to(curtainRef.current, { yPercent: 0, duration: 0.45, ease: 'power3.in' }, '-=0.05')
      .call(() => setCurrent(index))
      .to(curtainRef.current, { yPercent: -100, duration: 0.55, ease: 'power3.out' }, '+=0.04')
      .fromTo([titleRef.current, numRef.current, urlLabelRef.current],
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out', stagger: 0.05 },
        '-=0.3');
  }, [projects.length]);

  const prev = useCallback(() => goTo((current - 1 + projects.length) % projects.length), [current, projects.length, goTo]);
  const next = useCallback(() => goTo((current + 1) % projects.length), [current, projects.length, goTo]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (view !== 'featured') return; if (e.key === 'ArrowLeft') prev(); if (e.key === 'ArrowRight') next(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next, view]);

  const project = projects[current];

  return (
    <>
      <CustomLabel />
      <div style={{ position: 'fixed', inset: 0, background: '#0d0d0d', overflow: 'hidden' }}>

        {/* Image de fond */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          {project && (
            <>
              <img key={project._id} src={urlFor(project.mainImage).width(1920).height(1080).auto('format').url()} alt={project.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.05) 45%, rgba(0,0,0,0.72) 100%)' }} />
            </>
          )}
        </div>

        {/* Rideau de transition */}
        <div ref={curtainRef} style={{ position: 'absolute', inset: 0, zIndex: 10, background: '#0d0d0d', pointerEvents: 'none' }} />

        {/* Zone centrale cliquable */}
        {project && (
          <div onClick={() => navigate(`/project/${project.slug.current}`)}
            onMouseEnter={showCursor} onMouseLeave={hideCursor}
            style={{ position: 'absolute', top: '10%', left: '14%', right: '14%', bottom: '22%', zIndex: 15, cursor: 'none' }} />
        )}

        {/* Prev — zone gauche */}
        <button ref={navPrevRef} onClick={prev}
          onMouseEnter={(e) => { hideCursor(); gsap.to(e.currentTarget.querySelector('.nav-lbl'), { opacity: 1, x: 0, duration: 0.22 }); }}
          onMouseLeave={(e) => { gsap.to(e.currentTarget.querySelector('.nav-lbl'), { opacity: 0, x: -8, duration: 0.18 }); }}
          style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: '12vw', height: '35vh', zIndex: 20, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '1.5rem' }}>
          <div className="nav-lbl" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.25rem', opacity: 0, transform: 'translateX(-8px)' }}>
            <span style={{ fontSize: '1.1rem', color: '#fff' }}>←</span>
            <span style={{ fontFamily: 'GeistMono, monospace', fontSize: '0.58rem', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.5)' }}>PREV</span>
          </div>
        </button>

        {/* Next — zone droite */}
        <button ref={navNextRef} onClick={next}
          onMouseEnter={(e) => { hideCursor(); gsap.to(e.currentTarget.querySelector('.nav-lbl'), { opacity: 1, x: 0, duration: 0.22 }); }}
          onMouseLeave={(e) => { gsap.to(e.currentTarget.querySelector('.nav-lbl'), { opacity: 0, x: 8, duration: 0.18 }); }}
          style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', width: '12vw', height: '35vh', zIndex: 20, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '1.5rem' }}>
          <div className="nav-lbl" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem', opacity: 0, transform: 'translateX(8px)' }}>
            <span style={{ fontSize: '1.1rem', color: '#fff' }}>→</span>
            <span style={{ fontFamily: 'GeistMono, monospace', fontSize: '0.58rem', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.5)' }}>NEXT</span>
          </div>
        </button>

        {/* Header */}
        <header ref={headerRef} style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 25, padding: '1.25rem 1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', alignItems: 'start', color: '#fff' }}>
          <div>
            <Link to="/" style={{ display: 'block', fontFamily: 'GeistMono, monospace', fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '0.35rem' }}>PMC</Link>
            <button onClick={() => setView('featured')} style={{ display: 'block', background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'GeistMono, monospace', fontSize: '0.65rem', letterSpacing: '0.05em', color: view === 'featured' ? '#fff' : 'rgba(255,255,255,0.35)', lineHeight: 1.8 }}>Featured ({pad(projects.length)})</button>
            <button onClick={() => setView('index')} style={{ display: 'block', background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'GeistMono, monospace', fontSize: '0.65rem', letterSpacing: '0.05em', color: view === 'index' ? '#fff' : 'rgba(255,255,255,0.35)', lineHeight: 1.8 }}>Index ({pad(projects.length)})</button>
          </div>
          <div style={{ fontSize: '0.7rem', letterSpacing: '0.04em', color: 'rgba(255,255,255,0.6)', lineHeight: 1.9 }}>
            <Link to="/contact" style={{ display: 'block', color: 'inherit' }}>Contact</Link>
            <a href="mailto:hello@paulmathieucollin.fr" style={{ display: 'block', color: 'inherit' }}>hello@paulmathieucollin.fr</a>
          </div>
          <div style={{ fontSize: '0.7rem', letterSpacing: '0.04em', color: 'rgba(255,255,255,0.6)', lineHeight: 1.9 }}>
            <span style={{ display: 'block' }}>Visual Director</span>
            <span style={{ display: 'block' }}>Paris, FR</span>
          </div>
          <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem', fontFamily: 'GeistMono, monospace', fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)' }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#FF5500', display: 'inline-block' }} />
            {time} (CET)
          </div>
        </header>

        {/* Footer — numéro + titre */}
        {project && (
          <footer style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 25, padding: '0 1.5rem 1.5rem', color: '#fff' }}>
            <p ref={numRef} style={{ fontFamily: 'GeistMono, monospace', fontSize: '0.65rem', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem' }}>
              ({pad(current + 1)}/{pad(projects.length)})
            </p>
            <div style={{ overflow: 'hidden' }}>
              <h2 ref={titleRef}
                onMouseEnter={showCursor} onMouseLeave={hideCursor}
                onClick={() => navigate(`/project/${project.slug.current}`)}
                style={{ fontSize: 'clamp(3rem, 8.5vw, 8.5rem)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 0.88, cursor: 'none', marginBottom: '1.25rem', display: 'block' }}>
                {project.title}
              </h2>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <button onClick={prev} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', letterSpacing: '0.06em', cursor: 'pointer', padding: 0, fontFamily: 'GeistMono, monospace' }}>[←] Prev</button>
                <span ref={urlLabelRef} style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.22)', fontFamily: 'GeistMono, monospace' }}>paulmathieucollin.fr/project/{project.slug.current}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.7rem', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.4)', fontFamily: 'GeistMono, monospace' }}>Instagram</a>
                <button onClick={next} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', letterSpacing: '0.06em', cursor: 'pointer', padding: 0, fontFamily: 'GeistMono, monospace' }}>Next [→]</button>
              </div>
            </div>
          </footer>
        )}

        {/* Index overlay */}
        {view === 'index' && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 30, background: '#f8f4ee', overflowY: 'auto', padding: '5rem 1.5rem 3rem' }}>
            <button onClick={() => setView('featured')} style={{ position: 'fixed', top: '1.25rem', left: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'GeistMono, monospace', fontSize: '0.65rem', color: '#111' }}>PMC</button>
            <button onClick={() => setView('featured')} style={{ position: 'fixed', top: '1.25rem', right: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'GeistMono, monospace', fontSize: '0.65rem', color: 'rgba(0,0,0,0.4)' }}>← Featured</button>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{ borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '0.75rem', marginBottom: '0.5rem', display: 'grid', gridTemplateColumns: '3rem 1fr 8rem 6rem', gap: '1rem' }}>
                {['#', 'Projet', 'Catégorie', 'Année'].map(h => <span key={h} style={{ fontSize: '0.6rem', letterSpacing: '0.1em', color: '#999', fontFamily: 'GeistMono, monospace' }}>{h}</span>)}
              </div>
              {projects.map((p, i) => (
                <div key={p._id} onClick={() => navigate(`/project/${p.slug.current}`)}
                  style={{ display: 'grid', gridTemplateColumns: '3rem 1fr 8rem 6rem', gap: '1rem', alignItems: 'baseline', padding: '1.1rem 0', borderBottom: '1px solid rgba(0,0,0,0.07)', cursor: 'pointer', transition: 'opacity 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.4'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}>
                  <span style={{ fontFamily: 'GeistMono, monospace', fontSize: '0.65rem', color: '#aaa' }}>{pad(i + 1)}</span>
                  <span style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)', fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1 }}>{p.title}</span>
                  <span style={{ fontSize: '0.78rem', color: '#888' }}>{p.category}</span>
                  <span style={{ fontFamily: 'GeistMono, monospace', fontSize: '0.72rem', color: '#aaa' }}>{p.year}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
