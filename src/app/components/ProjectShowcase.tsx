import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router';
import gsap from 'gsap';

// ── Hook responsive ──
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isMobile;
}
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

const ORB_R = 28;
const ORB_C = 2 * Math.PI * ORB_R; // ≈ 175.93

// ── Fond featured : orbe de chargement 0→100% puis vidéo Mux en fondu ──
function FeaturedBackground({ project, tall = false }: { project: SanityProject; tall?: boolean }) {
  const w = tall ? 800 : 1200;
  const h = tall ? 1400 : 675;
  const imgUrl = urlFor(project.mainImage).width(w).height(h).auto('format').url();

  const circleRef = useRef<SVGCircleElement>(null);
  const pctRef    = useRef<HTMLSpanElement>(null);
  const orbRef    = useRef<HTMLDivElement>(null);
  const animRef   = useRef<number | undefined>(undefined);
  const startRef  = useRef<number | undefined>(undefined);
  const doneRef   = useRef(false);

  useEffect(() => {
    if (!project.previewVideo) return;
    doneRef.current  = false;
    startRef.current = undefined;
    if (orbRef.current)    orbRef.current.style.opacity = '1';
    if (circleRef.current) circleRef.current.style.strokeDashoffset = String(ORB_C);
    if (pctRef.current)    pctRef.current.textContent = '0%';

    const step = (ts: number) => {
      if (doneRef.current) return;
      if (!startRef.current) startRef.current = ts;
      const t = Math.min((ts - startRef.current) / 2200, 1);
      const p = 85 * (1 - Math.pow(1 - t, 3)); // ease-out cubic → 85 %
      if (circleRef.current) circleRef.current.style.strokeDashoffset = String(ORB_C * (1 - p / 100));
      if (pctRef.current)    pctRef.current.textContent = `${Math.round(p)}%`;
      if (t < 1) animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project._id, project.previewVideo]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: '#0d0d0d' }}>

      {/* Image de secours si pas de vidéo */}
      {!project.previewVideo && (
        <img src={imgUrl} alt={project.title}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      )}

      {/* Orbe circulaire SVG pendant le chargement */}
      {project.previewVideo && (
        <div ref={orbRef} style={{
          position: 'absolute', inset: 0, zIndex: 2,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          transition: 'opacity 0.5s ease',
        }}>
          <svg width="72" height="72" viewBox="0 0 72 72" style={{ transform: 'rotate(-90deg)' }}>
            {/* piste */}
            <circle cx="36" cy="36" r={ORB_R} fill="none"
              stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
            {/* progression */}
            <circle ref={circleRef} cx="36" cy="36" r={ORB_R} fill="none"
              stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" strokeLinecap="round"
              strokeDasharray={ORB_C} strokeDashoffset={ORB_C} />
          </svg>
          <span ref={pctRef} style={{
            fontFamily: 'GeistMono, monospace', fontSize: '0.5rem',
            letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', marginTop: '0.75rem',
          }}>0%</span>
        </div>
      )}

      {/* Vidéo Mux — opacity 0, fade in à onCanPlay */}
      {project.previewVideo && (
        <video autoPlay muted loop playsInline preload="auto"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0, transition: 'opacity 0.8s ease', zIndex: 1 }}
          onCanPlay={(e) => {
            const vid = e.target as HTMLVideoElement;
            doneRef.current = true;
            if (animRef.current) cancelAnimationFrame(animRef.current);
            if (circleRef.current) circleRef.current.style.strokeDashoffset = '0';
            if (pctRef.current)    pctRef.current.textContent = '100%';
            setTimeout(() => {
              if (orbRef.current) orbRef.current.style.opacity = '0';
              vid.style.opacity = '1';
            }, 350);
          }}
        >
          <source src={`https://stream.mux.com/${project.previewVideo}.m3u8`} type="application/x-mpegURL" />
        </video>
      )}
    </div>
  );
}
const showCursor = () => {
  const el = document.getElementById('showcase-cursor'); if (el) el.style.opacity = '1';
  const main = document.getElementById('main-cursor'); if (main) main.style.opacity = '0';
};
const hideCursor = () => {
  const el = document.getElementById('showcase-cursor'); if (el) el.style.opacity = '0';
  const main = document.getElementById('main-cursor'); if (main) main.style.opacity = '1';
};

export function ProjectShowcase() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<SanityProject[]>([]);
  const [current, setCurrent] = useState(0);
  const [view, setView] = useState<'featured' | 'index'>('featured');
  const [ready, setReady] = useState(false);
  const transitioning = useRef(false);
  const time = useClock();

  const curtainRef   = useRef<HTMLDivElement>(null);
  const titleRef     = useRef<HTMLHeadingElement>(null);
  const numRef       = useRef<HTMLParagraphElement>(null);
  const urlLabelRef  = useRef<HTMLSpanElement>(null);
  const headerRef    = useRef<HTMLElement>(null);
  const navPrevRef   = useRef<HTMLButtonElement>(null);
  const navNextRef   = useRef<HTMLButtonElement>(null);
  const indexRef     = useRef<HTMLDivElement>(null);
  const indexAnimRef = useRef(false);

  // ── État mobile ──
  const [mobileView, setMobileView] = useState<'featured' | 'index'>('featured');
  const mobileTouchY = useRef(0);
  const mobileWasAtTop = useRef(true);
  const mobileFirstRender = useRef(true);
  const mobileIndexRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    client.fetch<SanityProject[]>(projectsQuery).then((data) => setProjects(data ?? []));
  }, []);

  // ── Rétablir le curseur principal quand on quitte la homepage ──
  useEffect(() => {
    return () => {
      const main = document.getElementById('main-cursor');
      if (main) main.style.opacity = '1';
    };
  }, []);

  // ── Init panel en bas au montage ──
  useEffect(() => {
    if (indexRef.current) gsap.set(indexRef.current, { yPercent: 100 });
  }, []);

  // ── Entrance animation ──
  useEffect(() => {
    if (!projects.length || ready) return;
    if (!curtainRef.current) return; // refs desktop nulles sur mobile → on n'exécute pas
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

  // ── Slide transition entre projets ──
  const goTo = useCallback((index: number) => {
    if (transitioning.current || !projects.length) return;
    if (!curtainRef.current) return; // refs desktop nulles sur mobile
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

  // ── Keyboard nav ──
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (view !== 'featured') return;
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next, view]);

  // ── Open index (smooth slide up) ──
  const openIndex = useCallback(() => {
    if (indexAnimRef.current) return;
    indexAnimRef.current = true;
    if (indexRef.current) gsap.set(indexRef.current, { yPercent: 100 });
    gsap.to(indexRef.current, {
      yPercent: 0,
      duration: 0.65,
      ease: 'power4.out',
      onComplete: () => { setView('index'); indexAnimRef.current = false; },
    });
  }, []);

  // ── Scroll progressif featured → index ──
  useEffect(() => {
    if (view !== 'featured') return;
    if (indexRef.current) gsap.set(indexRef.current, { yPercent: 100 });

    let scrollAcc = 0;
    let snapping = false;
    const THRESHOLD = 260;

    const onWheel = (e: WheelEvent) => {
      if (snapping || indexAnimRef.current) return;
      const prevAcc = scrollAcc;
      scrollAcc = Math.max(0, scrollAcc + e.deltaY);
      const progress = Math.min(scrollAcc / THRESHOLD, 1);
      if (!indexRef.current) return;

      if (progress < 1) {
        // Peek progressif depuis le bas
        gsap.set(indexRef.current, { yPercent: 100 - progress * 30 });
        if (scrollAcc === 0 && prevAcc > 0) {
          gsap.to(indexRef.current, { yPercent: 100, duration: 0.3, ease: 'power2.out' });
        }
      } else {
        snapping = true;
        indexAnimRef.current = true;
        gsap.to(indexRef.current, {
          yPercent: 0,
          duration: 0.65,
          ease: 'power4.out',
          onComplete: () => { setView('index'); indexAnimRef.current = false; },
        });
      }
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    return () => window.removeEventListener('wheel', onWheel);
  }, [view]);

  // ── Close index ──
  const closeIndex = useCallback(() => {
    if (!indexRef.current || indexAnimRef.current) return;
    indexAnimRef.current = true;
    gsap.to(indexRef.current, {
      yPercent: 100,
      duration: 0.5,
      ease: 'power3.in',
      onComplete: () => { setView('featured'); indexAnimRef.current = false; },
    });
  }, []);

  // ── Mobile : transition de section (aucun setState pendant l'animation) ──
  useEffect(() => {
    const el = mobileIndexRef.current;
    if (!el) return;
    if (mobileFirstRender.current) {
      mobileFirstRender.current = false;
      el.style.transform = 'translateY(100%)';
      el.style.transition = 'none';
      return;
    }
    el.style.transition = 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    el.style.transform = mobileView === 'index' ? 'translateY(0)' : 'translateY(100%)';
  }, [mobileView]);

  const isMobile = useIsMobile();
  const project = projects[current];

  // ── Rendu mobile : featured → swipe haut → index (transition de section) ──
  if (isMobile) {
    const featuredProject = projects[0];
    return (
      <div style={{ position: 'fixed', inset: 0, background: '#0d0d0d', overflow: 'hidden' }}>

        {/* ── Écran Featured ── */}
        <div
          onTouchStart={(e) => { mobileTouchY.current = e.touches[0].clientY; }}
          onTouchEnd={(e) => {
            const dy = mobileTouchY.current - e.changedTouches[0].clientY;
            if (dy > 40) setMobileView('index');
          }}
          style={{ position: 'absolute', inset: 0 }}
        >
          {featuredProject && (
            <>
              <FeaturedBackground project={featuredProject} tall />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.48) 0%, transparent 42%, rgba(0,0,0,0.78) 100%)' }} />
            </>
          )}

          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 2 }}>
            <span style={{ fontFamily: 'GeistMono, monospace', fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>PMC</span>
            <span style={{ fontFamily: 'GeistMono, monospace', fontSize: '0.58rem', color: 'rgba(255,255,255,0.38)', letterSpacing: '0.06em' }}>{time} CET</span>
          </div>

          {featuredProject && (
            <div onClick={() => navigate(`/project/${featuredProject.slug.current}`)}
              style={{ position: 'absolute', bottom: '3.5rem', left: 0, right: 0, padding: '0 1.25rem', zIndex: 2 }}>
              <p style={{ fontFamily: 'GeistMono, monospace', fontSize: '0.52rem', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.32)', marginBottom: '0.55rem' }}>FEATURED</p>
              <h2 style={{ fontSize: 'clamp(2.4rem, 11vw, 3.8rem)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 0.88, color: '#fff', margin: 0 }}>
                {featuredProject.title}
              </h2>
            </div>
          )}

          <div style={{ position: 'absolute', bottom: '1.1rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.22rem', opacity: 0.38, zIndex: 2, pointerEvents: 'none' }}>
            <span style={{ fontSize: '0.75rem', color: '#fff' }}>↑</span>
            <span style={{ fontFamily: 'GeistMono, monospace', fontSize: '0.48rem', letterSpacing: '0.16em', color: '#fff' }}>INDEX</span>
          </div>
        </div>

        {/* ── Panel Index (flex column — header + scroll + footer) ── */}
        <div
          ref={mobileIndexRef}
          onTouchStart={(e) => {
            mobileTouchY.current = e.touches[0].clientY;
            mobileWasAtTop.current = (mobileScrollRef.current?.scrollTop ?? 0) === 0;
          }}
          onTouchEnd={(e) => {
            if (mobileView !== 'index') return;
            const dy = e.changedTouches[0].clientY - mobileTouchY.current;
            if (dy > 40 && mobileWasAtTop.current) setMobileView('featured');
          }}
          style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            overflow: 'hidden',             // contraint les enfants dans le panel
            background: '#f8f4ee',
            willChange: 'transform',
            zIndex: 5,
            pointerEvents: mobileView === 'index' ? 'auto' : 'none',
          }}
        >
          {/* Header fixe en haut du panel */}
          <div style={{ flexShrink: 0, background: '#f8f4ee', borderBottom: '1px solid rgba(0,0,0,0.07)', padding: '1.1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button onClick={() => setMobileView('featured')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'GeistMono, monospace', fontSize: '0.85rem', fontWeight: 700, color: '#111' }}>PMC</button>
            <button onClick={() => setMobileView('featured')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'GeistMono, monospace', fontSize: '0.56rem', letterSpacing: '0.1em', color: 'rgba(0,0,0,0.32)' }}>↓ Featured</button>
          </div>

          {/* Zone scrollable — minHeight:0 indispensable en flex column sinon la div s'étire et ne scroll pas */}
          <div ref={mobileScrollRef} style={{ flex: 1, minHeight: 0, overflowY: 'auto', WebkitOverflowScrolling: 'touch' as never }}>
            <div style={{ padding: '0 1.25rem' }}>
              {projects.map((p, i) => (
                <div key={p._id} onClick={() => navigate(`/project/${p.slug.current}`)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.95rem 0', minHeight: '56px', borderBottom: '1px solid rgba(0,0,0,0.07)', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', flex: 1, minWidth: 0 }}>
                    <span style={{ fontFamily: 'GeistMono, monospace', fontSize: '0.55rem', color: '#ccc', flexShrink: 0 }}>{pad(i + 1)}</span>
                    <span style={{ fontSize: '1.1rem', fontWeight: 600, letterSpacing: '-0.02em', color: '#111', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.title}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0, marginLeft: '0.75rem' }}>
                    <span style={{ fontSize: '0.64rem', color: '#999' }}>{p.category}</span>
                    <span style={{ fontFamily: 'GeistMono, monospace', fontSize: '0.57rem', color: '#bbb' }}>{p.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer ancré en bas du panel (PAS position:fixed → ne déborde plus) */}
          <div style={{ flexShrink: 0, background: 'rgba(248,244,238,0.96)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderTop: '1px solid rgba(0,0,0,0.07)', padding: '0.85rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to="/contact" style={{ fontFamily: 'GeistMono, monospace', fontSize: '0.62rem', letterSpacing: '0.06em', color: '#111' }}>Contact</Link>
            <Link to="/mentions-legales" style={{ fontFamily: 'GeistMono, monospace', fontSize: '0.62rem', letterSpacing: '0.06em', color: 'rgba(0,0,0,0.4)' }}>Mentions légales</Link>
            <a href="https://www.instagram.com/pmc.mp3" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'GeistMono, monospace', fontSize: '0.62rem', letterSpacing: '0.06em', color: 'rgba(0,0,0,0.4)' }}>Instagram</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <CustomLabel />
      <div style={{ position: 'fixed', inset: 0, background: '#0d0d0d', overflow: 'hidden' }}>

        {/* Fond : vidéo ou image selon le projet */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          {project && (
            <>
              <FeaturedBackground key={project._id} project={project} />
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

        {/* Prev */}
        <button ref={navPrevRef} onClick={prev}
          onMouseEnter={(e) => { hideCursor(); gsap.to(e.currentTarget.querySelector('.nav-lbl'), { opacity: 1, x: 0, duration: 0.22 }); }}
          onMouseLeave={(e) => { gsap.to(e.currentTarget.querySelector('.nav-lbl'), { opacity: 0, x: -8, duration: 0.18 }); }}
          style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: '22vw', height: '60vh', zIndex: 20, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '1.5rem' }}>
          <div className="nav-lbl" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.25rem', opacity: 0, transform: 'translateX(-8px)' }}>
            <span style={{ fontSize: '1.1rem', color: '#fff' }}>←</span>
            <span style={{ fontFamily: 'GeistMono, monospace', fontSize: '0.58rem', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.5)' }}>PREV</span>
          </div>
        </button>

        {/* Next */}
        <button ref={navNextRef} onClick={next}
          onMouseEnter={(e) => { hideCursor(); gsap.to(e.currentTarget.querySelector('.nav-lbl'), { opacity: 1, x: 0, duration: 0.22 }); }}
          onMouseLeave={(e) => { gsap.to(e.currentTarget.querySelector('.nav-lbl'), { opacity: 0, x: 8, duration: 0.18 }); }}
          style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', width: '22vw', height: '60vh', zIndex: 20, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '1.5rem' }}>
          <div className="nav-lbl" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem', opacity: 0, transform: 'translateX(8px)' }}>
            <span style={{ fontSize: '1.1rem', color: '#fff' }}>→</span>
            <span style={{ fontFamily: 'GeistMono, monospace', fontSize: '0.58rem', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.5)' }}>NEXT</span>
          </div>
        </button>

        {/* Header */}
        <header ref={headerRef} style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 25, padding: '1.25rem 1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', alignItems: 'start', color: '#fff' }}>
          <div>
            <Link to="/" style={{ display: 'block', fontFamily: 'GeistMono, monospace', fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '0.35rem' }}>PMC</Link>
            <button onClick={() => view === 'index' && closeIndex()} style={{ display: 'block', background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'GeistMono, monospace', fontSize: '0.65rem', letterSpacing: '0.05em', color: view === 'featured' ? '#fff' : 'rgba(255,255,255,0.35)', lineHeight: 1.8 }}>Featured ({pad(projects.length)})</button>
            <button onClick={openIndex} style={{ display: 'block', background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'GeistMono, monospace', fontSize: '0.65rem', letterSpacing: '0.05em', color: view === 'index' ? '#fff' : 'rgba(255,255,255,0.35)', lineHeight: 1.8 }}>Index ({pad(projects.length)})</button>
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
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#333', display: 'inline-block' }} />
            {time} (CET)
          </div>
        </header>

        {/* Scroll hint */}
        {view === 'featured' && ready && (
          <div style={{ position: 'absolute', bottom: '3.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 36, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem', opacity: 0.35, pointerEvents: 'none' }}>
            <span style={{ fontFamily: 'GeistMono, monospace', fontSize: '0.55rem', letterSpacing: '0.12em', color: '#fff' }}>SCROLL</span>
            <span style={{ fontSize: '0.7rem', color: '#fff' }}>↓</span>
          </div>
        )}

        {/* Titre + numéro */}
        {project && (
          <div style={{ position: 'absolute', bottom: '3rem', left: 0, right: 0, zIndex: 25, padding: '0 1.5rem', color: '#fff' }}>
            <p ref={numRef} style={{ fontFamily: 'GeistMono, monospace', fontSize: '0.65rem', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem' }}>
              ({pad(current + 1)}/{pad(projects.length)})
            </p>
            <div style={{ overflow: 'hidden' }}>
              <h2 ref={titleRef} onMouseEnter={showCursor} onMouseLeave={hideCursor}
                onClick={() => navigate(`/project/${project.slug.current}`)}
                style={{ fontSize: 'clamp(3rem, 8.5vw, 8.5rem)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 0.88, cursor: 'none', marginBottom: 0, display: 'block' }}>
                {project.title}
              </h2>
            </div>
          </div>
        )}

        {/* Barre de navigation persistante */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 35, padding: '0 1.5rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <button onClick={prev} style={{ background: 'none', border: 'none', color: view === 'index' ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.4)', fontSize: '0.7rem', letterSpacing: '0.06em', cursor: 'pointer', padding: 0, fontFamily: 'GeistMono, monospace', transition: 'color 0.35s' }}>[←] Prev</button>
            {project && <span ref={urlLabelRef} style={{ fontSize: '0.62rem', color: view === 'index' ? 'rgba(0,0,0,0.22)' : 'rgba(255,255,255,0.22)', fontFamily: 'GeistMono, monospace', transition: 'color 0.35s' }}>paulmathieucollin.fr/project/{project.slug.current}</span>}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <a href="/mentions-legales" style={{ fontSize: '0.7rem', letterSpacing: '0.06em', color: view === 'index' ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.4)', fontFamily: 'GeistMono, monospace', transition: 'color 0.35s' }}>Mentions légales</a>
            <a href="https://www.instagram.com/pmc.mp3" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.7rem', letterSpacing: '0.06em', color: view === 'index' ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.4)', fontFamily: 'GeistMono, monospace', transition: 'color 0.35s' }}>Instagram</a>
            <button onClick={next} style={{ background: 'none', border: 'none', color: view === 'index' ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.4)', fontSize: '0.7rem', letterSpacing: '0.06em', cursor: 'pointer', padding: 0, fontFamily: 'GeistMono, monospace', transition: 'color 0.35s' }}>Next [→]</button>
          </div>
        </div>

        {/* ── Index overlay — toujours rendu, GSAP contrôle la position ── */}
        <div
          ref={indexRef}
          onWheel={(e) => {
            const el = indexRef.current;
            if (!el || view !== 'index') return;
            // Fermer si on scroll vers le haut en haut du panel
            if (el.scrollTop === 0 && e.deltaY < -20) closeIndex();
          }}
          style={{
            position: 'absolute', inset: 0, zIndex: 30,
            background: '#f8f4ee', overflowY: 'auto',
            padding: '5rem 1.5rem 5rem', willChange: 'transform',
            pointerEvents: view === 'index' ? 'auto' : 'none',
          }}
        >
          <button onClick={closeIndex} style={{ position: 'fixed', top: '1.25rem', left: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'GeistMono, monospace', fontSize: '0.65rem', color: '#111' }}>PMC</button>
          <button onClick={closeIndex} style={{ position: 'fixed', top: '1.25rem', right: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'GeistMono, monospace', fontSize: '0.65rem', color: 'rgba(0,0,0,0.4)' }}>↑ Featured</button>

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
      </div>
    </>
  );
}
