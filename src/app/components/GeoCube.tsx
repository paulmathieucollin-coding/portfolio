import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

// ── Son 8-bit style GD via Web Audio API ──
function playJumpSound(): void {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

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

    // Attaque courte
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

const CUBE_W  = 26;   // px
const SPEED   = 180;  // px/s — vitesse horizontale constante
const GRAVITY = 2200; // px/s² — gravité
const JUMP_VY = -650; // px/s — vitesse initiale du saut (vers le haut)

export function GeoCube() {
  const cubeRef       = useRef<HTMLDivElement>(null);
  const activeRef     = useRef(true);
  const rafId         = useRef<number>(0);
  const cycleTimer    = useRef<ReturnType<typeof setTimeout>>();
  const phys          = useRef({ x: -CUBE_W - 10, y: 0, vy: 0, grounded: true, rot: 0 });

  const [active,    setActive]    = useState(true);
  const [visible,   setVisible]   = useState(false);
  const [showPopup, setShowPopup] = useState(true);

  // ── Clavier ──
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === 'b') { setActive(prev => !prev); return; }
      // Saut uniquement depuis le sol
      if (key === 's' && activeRef.current && phys.current.grounded) {
        phys.current.vy = JUMP_VY;
        phys.current.grounded = false;
        playJumpSound();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // ── Cycle physique ──
  useEffect(() => {
    activeRef.current = active;

    if (!active) {
      cancelAnimationFrame(rafId.current);
      clearTimeout(cycleTimer.current);
      setVisible(false);
      return;
    }

    const startCycle = () => {
      if (!cubeRef.current || !activeRef.current) return;

      // Réinitialiser la physique
      phys.current = { x: -CUBE_W - 10, y: 0, vy: 0, grounded: true, rot: 0 };
      gsap.set(cubeRef.current, { x: phys.current.x, y: 0, rotation: 0 });
      setVisible(true);

      let lastTs = performance.now();

      const loop = (ts: number) => {
        const dt = Math.min((ts - lastTs) / 1000, 0.04); // cap 40ms
        lastTs = ts;
        const p = phys.current;

        // ── Physique horizontale ──
        p.x += SPEED * dt;

        // ── Rotation proportionnelle au déplacement (rolling) ──
        // 90° par largeur de cube parcourue — logique de carré roulant
        p.rot += (SPEED * dt / CUBE_W) * 90;

        // ── Gravité & saut ──
        if (!p.grounded) {
          p.vy += GRAVITY * dt;
          p.y  += p.vy * dt;
          if (p.y >= 0) {
            p.y      = 0;
            p.vy     = 0;
            p.grounded = true;
          }
        }

        // ── Appliquer au DOM (sans passer par React) ──
        if (cubeRef.current) {
          gsap.set(cubeRef.current, { x: p.x, y: p.y, rotation: p.rot });
        }

        // ── Sorti de l'écran → pause 3s puis relance ──
        if (p.x > window.innerWidth + CUBE_W + 10) {
          setVisible(false);
          cycleTimer.current = setTimeout(() => {
            if (activeRef.current) startCycle();
          }, 3000);
          return;
        }

        rafId.current = requestAnimationFrame(loop);
      };

      rafId.current = requestAnimationFrame(loop);
    };

    // Délai initial — laisse l'animation d'entrée se finir
    cycleTimer.current = setTimeout(startCycle, 2600);

    return () => {
      cancelAnimationFrame(rafId.current);
      clearTimeout(cycleTimer.current);
    };
  }, [active]);

  return (
    <>
      {/* ── Popup instructions ── */}
      {showPopup && (
        <div style={{
          position: 'fixed',
          bottom: '3.25rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 8999,
          background: 'rgba(10, 10, 10, 0.88)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.08)',
          padding: '0.65rem 2.8rem 0.65rem 1.25rem',
          borderRadius: '8px',
          color: 'rgba(255,255,255,0.55)',
          fontFamily: 'GeistMono, monospace',
          fontSize: '0.58rem',
          letterSpacing: '0.1em',
          display: 'flex',
          alignItems: 'center',
          gap: '1.1rem',
          whiteSpace: 'nowrap',
          userSelect: 'none',
        }}>
          <span style={{ color: 'rgba(255,255,255,0.9)' }}>■</span>
          <span>[S] SAUTER</span>
          <span style={{ color: 'rgba(255,255,255,0.18)' }}>·</span>
          <span>[B] ON / OFF</span>
          <button
            onClick={() => setShowPopup(false)}
            style={{
              position: 'absolute', top: '50%', right: '0.75rem',
              transform: 'translateY(-50%)',
              background: 'none', border: 'none',
              color: 'rgba(255,255,255,0.3)', cursor: 'pointer',
              fontSize: '1rem', lineHeight: 1, padding: 0,
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
          bottom: '0.35rem',
          left: 0,
          width: `${CUBE_W}px`,
          height: `${CUBE_W}px`,
          zIndex: 8998,
          visibility: visible && active ? 'visible' : 'hidden',
          willChange: 'transform',
          pointerEvents: 'none',
        }}
      >
        {/* Face noire sans effet */}
        <div style={{
          width: '100%',
          height: '100%',
          background: '#111111',
          border: '1.5px solid rgba(255,255,255,0.14)',
          position: 'relative',
        }}>
          {/* Carré intérieur minimal */}
          <div style={{
            position: 'absolute',
            inset: '5px',
            border: '1px solid rgba(255,255,255,0.1)',
          }} />
        </div>
      </div>
    </>
  );
}
