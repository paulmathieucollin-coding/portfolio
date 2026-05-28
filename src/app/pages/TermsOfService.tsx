import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const SECTIONS = [
  {
    title: '1. Acceptation',
    body: 'En utilisant PMC Publisher ("l\'Application"), vous acceptez les présentes Conditions d\'Utilisation. Si vous n\'acceptez pas ces conditions, n\'utilisez pas l\'Application.',
  },
  {
    title: '2. Description',
    body: 'PMC Publisher est une application macOS permettant aux créateurs indépendants de publier des vidéos sur des plateformes tierces (TikTok, Instagram, YouTube) via leurs API officielles.',
  },
  {
    title: '3. Plateformes tierces',
    body: 'En utilisant l\'Application, vous acceptez également les conditions d\'utilisation de chaque plateforme connectée (TikTok, Meta/Instagram, Google/YouTube). L\'Application n\'est pas affiliée à ces plateformes.',
  },
  {
    title: '4. Votre contenu',
    body: 'Vous conservez l\'entière propriété de tout contenu publié via l\'Application. Vous êtes seul responsable de vous assurer que votre contenu respecte les lois applicables et les politiques des plateformes.',
  },
  {
    title: '5. Absence de garantie',
    body: 'L\'Application est fournie "en l\'état", sans garantie d\'aucune sorte. Nous ne garantissons pas l\'accès ininterrompu aux API tierces, celles-ci pouvant être modifiées par leurs fournisseurs respectifs.',
  },
  {
    title: '6. Limitation de responsabilité',
    body: 'Dans toute la mesure permise par la loi, PMC Publisher et son développeur ne sauraient être tenus responsables de tout dommage indirect ou consécutif découlant de l\'utilisation de l\'Application.',
  },
  {
    title: '7. Modifications',
    body: 'Ces conditions peuvent être mises à jour à tout moment. La poursuite de l\'utilisation de l\'Application après modification vaut acceptation des nouvelles conditions.',
  },
  {
    title: '8. Contact',
    body: 'Pour toute question relative à ces conditions : paul@bruno.co',
  },
];

export function TermsOfService() {
  return (
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
              Conditions
              <br />
              d'utilisation
            </h1>
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.25)', marginBottom: '4rem' }}>
              PMC PUBLISHER — MAI 2026
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
  );
}
