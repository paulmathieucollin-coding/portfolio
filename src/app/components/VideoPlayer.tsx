import { useRef, useState } from 'react';
import MuxPlayer from '@mux/mux-player-react';
import type { SanityVideo } from '../../types/project';

// ── Lecteur MP4 natif (fallback si pas de Mux ID) ──
function NativePlayer({ url, aspectRatio }: { url: string; aspectRatio: string }) {
  const videoRef    = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying]           = useState(false);
  const [progress, setProgress]         = useState(0);
  const [showControls, setShowControls] = useState(true);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>();

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) { videoRef.current.pause(); setPlaying(false); }
    else          { videoRef.current.play();  setPlaying(true); }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current?.duration) return;
    setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    videoRef.current.currentTime = ((e.clientX - rect.left) / rect.width) * videoRef.current.duration;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(hideTimer.current);
    if (playing) hideTimer.current = setTimeout(() => setShowControls(false), 2500);
  };

  return (
    <div
      style={{ position: 'relative', aspectRatio, overflow: 'hidden', borderRadius: '2px', background: '#111111' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => playing && setShowControls(false)}
    >
      <video
        ref={videoRef} src={url}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => { setPlaying(false); setShowControls(true); }}
        onClick={togglePlay}
        playsInline
      />
      {!playing && (
        <div onClick={togglePlay} style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><polygon points="6,3 20,12 6,21" /></svg>
          </div>
        </div>
      )}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem 1.25rem 1.25rem', background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)', transition: 'opacity 0.35s ease', opacity: showControls ? 1 : 0 }}>
        <div ref={progressRef} onClick={handleSeek} style={{ height: '2px', background: 'rgba(255,255,255,0.2)', borderRadius: '1px', marginBottom: '0.875rem', cursor: 'pointer' }}>
          <div style={{ height: '100%', width: `${progress}%`, background: '#333', borderRadius: '1px', transition: 'width 0.1s linear' }} />
        </div>
        <button onClick={togglePlay} style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.22)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}>
          {playing
            ? <svg width="12" height="14" viewBox="0 0 12 14" fill="white"><rect x="0" y="0" width="4" height="14" rx="1" /><rect x="8" y="0" width="4" height="14" rx="1" /></svg>
            : <svg width="12" height="14" viewBox="0 0 24 24" fill="white"><polygon points="5,2 20,12 5,22" /></svg>
          }
        </button>
      </div>
    </div>
  );
}

// ── Lecteur Mux (principal) ──
function MuxVideoPlayer({ playbackId, aspectRatio, title }: { playbackId: string; aspectRatio: string; title?: string }) {
  return (
    <div style={{ aspectRatio, borderRadius: '2px', overflow: 'hidden', background: '#111111' }}>
      <MuxPlayer
        playbackId={playbackId}
        streamType="on-demand"
        metadata={{ video_title: title ?? 'Vidéo' }}
        accentColor="#333"
        defaultHiddenCaptions
        style={{ width: '100%', height: '100%', '--media-object-fit': 'cover' } as React.CSSProperties}
      />
    </div>
  );
}

export function VideoPlayer({ video }: { video: SanityVideo }) {
  const ratio = video.aspectRatio ?? '16/9';
  if (video.muxPlaybackId) return <MuxVideoPlayer playbackId={video.muxPlaybackId} aspectRatio={ratio} title={video.title} />;
  if (video.url) return <NativePlayer url={video.url} aspectRatio={ratio} />;
  return null;
}
