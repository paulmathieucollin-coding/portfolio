import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const SECTIONS = [
  {
    title: '1. Vue d\'ensemble',
    body: 'PMC Publisher ("l\'Application") est une application macOS personnelle. Cette politique explique quelles données l\'Application traite et comment elles sont utilisées.',
  },
  {
    title: '2. Données collectées',
    body: 'L\'Application stocke localement sur votre appareil les tokens d\'accès OAuth pour TikTok, Instagram et YouTube. Aucune donnée n\'est transmise à un serveur opéré par PMC Publisher.',
  },
  {
    title: '3. Stockage local uniquement',
    body: 'Toutes les identifiants et tokens sont stockés exclusivement sur votre machine locale dans un fichier chiffré géré par l\'Application. Ils ne sont jamais transmis, partagés ou vendus à des tiers.',
  },
  {
    title: '4. API tierces',
    body: 'Lorsque vous publiez une vidéo, l\'Application communique directement avec les API de TikTok, Meta (Instagram) et Google (YouTube) en votre nom. Ces interactions sont soumises à la politique de confidentialité de chaque plateforme.',
  },
  {
    title: '5. Contenu vidéo',
    body: 'Les fichiers vidéo que vous publiez sont envoyés directement depuis votre appareil vers l\'API de la plateforme concernée. PMC Publisher ne stocke, ne met en cache ni ne traite vos fichiers vidéo sur aucun serveur externe.',
  },
  {
    title: '6. Analytiques',
    body: 'L\'Application ne collecte aucune donnée d\'utilisation, rapport de crash ou télémétrie.',
  },
  {
    title: '7. Vos droits',
    body: 'Vous pouvez déconnecter n\'importe quelle plateforme à tout moment depuis l\'Application, ce qui supprime les tokens stockés sur votre appareil. Vous pouvez également supprimer l\'Application et ses fichiers de données à tout moment.',
  },
  {
    title: '8. Contact',
    body: 'Pour toute question relative à cette politique de confidentialité : paul@bruno.co',
  },
];

export function PrivacyPolicy() {
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
              Politique de
              <br />
              confidentialité
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
