import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

// ── Son de saut synthétique (Web Audio API — aucun fichier externe) ──
function playJumpSound(): void {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    // Oscillateur principal — chirp montant style GD
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'square';
    osc.frequency.setValueAtTime(280, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(960, ctx.currentTime + 0.07);
    osc.frequency.exponentialRampToValueAtTime(580, ctx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.14, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.28);

    // Clic d'attaque court pour le "punch"
    const click = ctx.createOscillator();
    const clickGain = ctx.createGain();
    click.connect(clickGain);
    clickGain.connect(ctx.destination);
    click.type = 'square';
    click.frequency.setValueAtTime(1200, ctx.currentTime);
    clickGain.gain.setValueAtTime(0.08, ctx.currentTime);
    clickGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
    click.start(ctx.currentTime);
    click.stop(ctx.currentTime + 0.04);

    setTimeout(() => { try { ctx.close(); } catch (_) { /* ignore */ } }, 700);
  } catch (_) { /* ignore */ }
}

export function GeoCube() {
  const cubeRef         = useRef<HTMLDivElement>(null);
  const isJumping       = useRef(false);
  const runTweenRef     = useRef<gsap.core.Tween | null>(null);
  const cycleTimerRef   = useRef<ReturnType<typeof setTimeout>>();

  const [active, setActive]       = useState(true);
  const [visible, setVisible]     = useState(false);
  const [showPopup, setShowPopup] = useState(true);

  // ── Clavier ──
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (key === 'b') {
        setActive(prev => !prev);
        return;
      }

      if (key === 's' && active && visible && !isJumping.current) {
        isJumping.current = true;
        playJumpSound();
        if (cubeRef.current) {
          gsap.killTweensOf(cubeRef.current, 'y');
          const tl = gsap.timeline({ onComplete: () => { isJumping.current = false; } });
          tl.to(cubeRef.current, { y: -78, duration: 0.27, ease: 'power2.out' });
          tl.to(cubeRef.current, { y: 0,   duration: 0.31, ease: 'power2.in' });
          // Extra rotation au saut
          gsap.to(cubeRef.current, { rotation: '+=90', duration: 0.55, ease: 'power1.inOut' });
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, visible]);

  // ── Cycle gauche → droite (7-8s visible, 3s absent) ──
  useEffect(() => {
    if (!active) {
      setVisible(false);
      runTweenRef.current?.kill();
      clearTimeout(cycleTimerRef.current);
      return;
    }

    const runCycle = (initialDelay = 0) => {
      if (initialDelay > 0) {
        cycleTimerRef.current = setTimeout(() => runCycle(0), initialDelay);
        return;
      }
      if (!cubeRef.current) return;

      const duration = 7 + Math.random(); // 7 à 8 secondes
      gsap.set(cubeRef.current, { x: -52, y: 0, rotation: 0 });
      setVisible(true);

      runTweenRef.current = gsap.to(cubeRef.current, {
        x: window.innerWidth + 60,
        rotation: 720,          // 2 rotations complètes
        duration,
        ease: 'none',
        onComplete: () => {
          setVisible(false);
          cycleTimerRef.current = setTimeout(() => runCycle(0), 3000);
        },
      });
    };

    // Délai initial pour laisser l'animation d'entrée se terminer
    runCycle(2600);

    return () => {
      runTweenRef.current?.kill();
      clearTimeout(cycleTimerRef.current);
    };
  }, [active]);

  return (
    <>
      {/* ── Popup instructions (style cookie banner) ── */}
      {showPopup && (
        <div
          style={{
            position: 'fixed',
            bottom: '3.25rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 8999,
            background: 'rgba(10, 10, 10, 0.84)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            padding: '0.65rem 2.6rem 0.65rem 1.2rem',
            borderRadius: '8px',
            color: 'rgba(255,255,255,0.6)',
            fontFamily: 'GeistMono, monospace',
            fontSize: '0.58rem',
            letterSpacing: '0.1em',
            display: 'flex',
            alignItems: 'center',
            gap: '1.1rem',
            whiteSpace: 'nowrap',
            userSelect: 'none',
            pointerEvents: 'auto',
          }}
        >
          <span style={{ color: 'rgba(255,120,0,0.9)' }}>■</span>
          <span>[S] SAUTER</span>
          <span style={{ color: 'rgba(255,255,255,0.18)' }}>·</span>
          <span>[B] ON / OFF</span>
          <button
            onClick={() => setShowPopup(false)}
            style={{
              position: 'absolute',
              top: '50%',
              right: '0.75rem',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.35)',
              cursor: 'pointer',
              fontSize: '1rem',
              lineHeight: 1,
              padding: 0,
              fontFamily: 'inherit',
            }}
            aria-label="Fermer"
          >×</button>
        </div>
      )}

      {/* ── Cube ── */}
      <div
        ref={cubeRef}
        style={{
          position: 'fixed',
          bottom: '0.4rem',
          left: 0,
          width: '26px',
          height: '26px',
          zIndex: 8998,
          visibility: visible && active ? 'visible' : 'hidden',
          willChange: 'transform',
          pointerEvents: 'none',
        }}
      >
        {/* Face principale */}
        <div style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #FF7800 0%, #FF3300 100%)',
          border: '1.5px solid rgba(255,255,255,0.28)',
          boxShadow: '0 0 16px rgba(255,70,0,0.6), inset 0 1px 0 rgba(255,255,255,0.2)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Carré intérieur */}
          <div style={{
            position: 'absolute',
            inset: '5px',
            border: '1px solid rgba(255,255,255,0.38)',
          }} />
          {/* Croix style GD */}
          <div style={{
            position: 'absolute', top: '50%', left: '3px', right: '3px',
            height: '1px', background: 'rgba(255,255,255,0.3)',
            transform: 'translateY(-50%)',
          }} />
          <div style={{
            position: 'absolute', left: '50%', top: '3px', bottom: '3px',
            width: '1px', background: 'rgba(255,255,255,0.3)',
            transform: 'translateX(-50%)',
          }} />
          {/* Reflet */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            height: '40%', background: 'rgba(255,255,255,0.1)',
          }} />
        </div>
        {/* Ombre au sol */}
        <div style={{
          position: 'absolute', bottom: '-5px', left: '2px', right: '2px',
          height: '4px', background: 'rgba(255,60,0,0.22)',
          borderRadius: '50%', filter: 'blur(2px)',
        }} />
      </div>
    </>
  );
}
