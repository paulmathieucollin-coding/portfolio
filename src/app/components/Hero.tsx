import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const HERO_PLAYBACK_ID = '3n2RHKDlhMvi9rttLq005XXT0001TjwGmNFeb2ft015j3e8';

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    async function loadHLS() {
      const hlsUrl = `https://stream.mux.com/${HERO_PLAYBACK_ID}.m3u8`;

      if (video!.canPlayType('application/vnd.apple.mpegurl')) {
        video!.src = hlsUrl;
        video!.play().catch(() => {});
      } else {
        try {
          const { default: Hls } = await import('hls.js');
          if (Hls.isSupported()) {
            const hls = new Hls({ startLevel: -1, capLevelToPlayerSize: true });
            hls.loadSource(hlsUrl);
            hls.attachMedia(video!);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
              video!.play().catch(() => {});
            });
          }
        } catch {
          video!.src = `https://stream.mux.com/${HERO_PLAYBACK_ID}/high.mp4`;
          video!.play().catch(() => {});
        }
      }
    }

    loadHLS();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      if (line1Ref.current) {
        tl.from(line1Ref.current, { yPercent: 120, duration: 1.3 }, 0.4);
      }
      if (line2Ref.current) {
        tl.from(line2Ref.current, { yPercent: 120, duration: 1.3 }, 0.6);
      }
      if (subtitleRef.current) {
        tl.from(subtitleRef.current, { opacity: 0, y: 20, duration: 0.9 }, 1.0);
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden flex items-end"
    >
      {/* HLS video background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster={`https://image.mux.com/${HERO_PLAYBACK_ID}/thumbnail.jpg?time=2&width=1920`}
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.75) 100%)',
        }}
      />

      {/* Bottom content */}
      <div className="relative z-20 w-full px-6 md:px-12 pb-10 md:pb-14">
        <div className="max-w-[1440px] mx-auto">
          <div ref={subtitleRef} className="mb-5">
            <p
              style={{
                fontSize: 'clamp(0.85rem, 1.2vw, 1.1rem)',
                fontWeight: 400,
                color: 'rgba(255,255,255,0.6)',
                letterSpacing: '0.05em',
                lineHeight: 1.5,
              }}
            >
              Photographe & Directeur Artistique
            </p>
          </div>

          <div>
            <div style={{ overflow: 'hidden' }}>
              <div ref={line1Ref}>
                <h1
                  style={{
                    fontSize: 'clamp(3.5rem, 12vw, 14rem)',
                    fontWeight: 600,
                    lineHeight: 0.9,
                    letterSpacing: '-0.04em',
                    color: '#ffffff',
                  }}
                >
                  Paul
                </h1>
              </div>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div ref={line2Ref}>
                <h1
                  style={{
                    fontSize: 'clamp(3.5rem, 12vw, 14rem)',
                    fontWeight: 600,
                    lineHeight: 0.9,
                    letterSpacing: '-0.04em',
                    color: '#ffffff',
                  }}
                >
                  Mathieu Collin
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
