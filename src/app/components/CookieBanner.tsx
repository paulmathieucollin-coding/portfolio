import { useState, useEffect } from 'react';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('pmc-cookie-consent');
    if (!consent) {
      // Petit délai pour ne pas apparaître avant le reveal d'entrée
      const t = setTimeout(() => setVisible(true), 2200);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => { localStorage.setItem('pmc-cookie-consent', 'accepted'); setVisible(false); };
  const decline = () => { localStorage.setItem('pmc-cookie-consent', 'declined'); setVisible(false); };

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 99998,
        padding: '0.9rem 1.5rem',
        background: 'rgba(13,13,13,0.96)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: '1rem', flexWrap: 'wrap',
        animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) both',
      }}
    >
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>

      <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.45)', fontFamily: 'GeistMono, monospace', letterSpacing: '0.02em', margin: 0 }}>
        Ce site utilise des cookies techniques uniquement.{' '}
        <a href="/mentions-legales" style={{ color: 'rgba(255,255,255,0.3)', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
          En savoir plus
        </a>
      </p>

      <div style={{ display: 'flex', gap: '0.6rem', flexShrink: 0 }}>
        <button
          onClick={decline}
          style={{ background: 'none', border: '1px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.45)', fontSize: '0.6rem', letterSpacing: '0.1em', padding: '0.45rem 1rem', cursor: 'pointer', fontFamily: 'GeistMono, monospace', borderRadius: '1px', transition: 'border-color 0.2s, color 0.2s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.4)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.18)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)'; }}
        >
          REFUSER
        </button>
        <button
          onClick={accept}
          style={{ background: '#333', border: 'none', color: '#fff', fontSize: '0.6rem', letterSpacing: '0.1em', padding: '0.45rem 1rem', cursor: 'pointer', fontFamily: 'GeistMono, monospace', borderRadius: '1px' }}
        >
          ACCEPTER
        </button>
      </div>
    </div>
  );
}
