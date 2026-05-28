import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SmoothScroll } from '../components/SmoothScroll';
import { PageTransition } from '../components/PageTransition';

const SECTIONS = [
  {
    title: '1. Acceptance',
    body: 'By using PMC Publisher ("the App"), you agree to these Terms of Service. If you do not agree, do not use the App.',
  },
  {
    title: '2. Description',
    body: 'PMC Publisher is a macOS desktop application that allows independent creators to upload and publish video content to third-party platforms (TikTok, Instagram, YouTube) using their official APIs.',
  },
  {
    title: '3. Third-party platforms',
    body: 'By using the App, you also agree to the terms of service of each connected platform (TikTok, Meta/Instagram, Google/YouTube). The App is not affiliated with or endorsed by these platforms.',
  },
  {
    title: '4. Your content',
    body: 'You retain full ownership of all content you publish through the App. You are solely responsible for ensuring your content complies with applicable laws and platform policies.',
  },
  {
    title: '5. No warranty',
    body: 'The App is provided "as is", without warranty of any kind. We do not guarantee uninterrupted access to third-party APIs, as these are subject to change by their respective providers.',
  },
  {
    title: '6. Limitation of liability',
    body: 'To the fullest extent permitted by law, PMC Publisher and its developer shall not be liable for any indirect, incidental, or consequential damages arising from your use of the App.',
  },
  {
    title: '7. Changes',
    body: 'These terms may be updated at any time. Continued use of the App after changes constitutes acceptance of the new terms.',
  },
  {
    title: '8. Contact',
    body: 'For any questions regarding these terms, contact: paul@bruno.co',
  },
];

export function TermsOfService() {
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
                  Terms of
                  <br />
                  Service
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
