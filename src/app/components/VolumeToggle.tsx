import { useState, useEffect } from 'react';
import { toggleMute, getIsMuted, onMuteChange } from '../hooks/useAmbientAudio';

export function VolumeToggle() {
  const [muted, setMuted] = useState(getIsMuted());

  useEffect(() => {
    return onMuteChange(setMuted);
  }, []);

  return (
    <button
      onClick={() => toggleMute()}
      aria-label={muted ? 'Activer la musique' : 'Couper la musique'}
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 9000,
        width: 36,
        height: 36,
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.12)',
        backgroundColor: 'rgba(10,10,10,0.6)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'border-color 0.3s ease, opacity 0.3s ease',
        opacity: 0.6,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.6'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
    >
      {muted ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      )}
    </button>
  );
}
