import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SmoothScroll } from '../components/SmoothScroll';
import { PageTransition } from '../components/PageTransition';

const SECTIONS = [
  {
    title: '1. Overview',
    body: 'PMC Publisher ("the App") is a personal macOS desktop application. This policy explains what data the App handles and how it is used.',
  },
  {
    title: '2. Data we collect',
    body: 'The App stores OAuth access tokens and refresh tokens for TikTok, Instagram, and YouTube locally on your device. No data is transmitted to any server operated by PMC Publisher.',
  },
  {
    title: '3. Local storage only',
    body: 'All credentials and tokens are stored exclusively on your local machine in an encrypted file managed by the App. They are never uploaded, shared, or sold to third parties.',
  },
  {
    title: '4. Third-party APIs',
    body: 'When you publish a video, the App communicates directly with the APIs of TikTok, Meta (Instagram), and Google (YouTube) on your behalf. These interactions are subject to each platform\'s own privacy policy.',
  },
  {
    title: '5. Video content',
    body: 'Video files you publish are sent directly from your device to the respective platform\'s API. PMC Publisher does not store, cache, or process your video files on any external server.',
  },
  {
    title: '6. Analytics',
    body: 'The App does not collect analytics, usage data, crash reports, or any telemetry.',
  },
  {
    title: '7. Your rights',
    body: 'You can disconnect any platform at any time from within the App, which removes the stored tokens from your device. You may also delete the App and its data files at any time.',
  },
  {
    title: '8. Contact',
    body: 'For any questions regarding this privacy policy, contact: paul@bruno.co',
  },
];

export function PrivacyPolicy() {
  return (
    <SmoothScroll>
      <PageTransition>
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0a0a0a' }}>
          <Header />

          <main className="flex-1 pt-28 md:pt-36 pb-16 md:pb-28 px-6 md:px-12">
            <div className="max-w-[1440px] mx-auto">
              <div className="max-w-2xl">
                <h1
                  className="tracking-tight mb-4"
                  style={{
                    fontSize: 'clamp(2.5rem, 5vw, 5rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    lineHeight: 0.95,
                    color: '#ffffff',
                  }}
                >
                  Privacy
                  <br />
                  Policy
                </h1>
                <p style={{ fontSize: '0.75rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.25)', marginBottom: '4rem' }}>
                  PMC PUBLISHER — LAST UPDATED MAY 2026
                </p>

                <div className="space-y-10">
                  {SECTIONS.map((s) => (
                    <div key={s.title}>
                      <h2
                        className="mb-3"
                        style={{ fontSize: '0.75rem', letterSpacing: '0.1em', fontWeight: 500, color: 'rgba(255,255,255,0.35)' }}
                      >
                        {s.title.toUpperCase()}
                      </h2>
                      <p style={{ fontSize: '1rem', lineHeight: '1.7', color: 'rgba(255,255,255,0.6)' }}>
                        {s.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>

          <Footer />
        </div>
      </PageTransition>
    </SmoothScroll>
  );
}
