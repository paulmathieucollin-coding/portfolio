import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SmoothScroll } from '../components/SmoothScroll';

const sections = [
  {
    id: 'editeur',
    label: 'ÉDITEUR DU SITE',
    content: (
      <div className="space-y-1 text-gray-600" style={{ fontSize: '0.95rem', lineHeight: '1.75' }}>
        <p><span className="text-[#111] font-medium">Nom :</span> Paul Mathieu Collin</p>
        <p><span className="text-[#111] font-medium">Statut :</span> Entrepreneur individuel</p>
        <p>
          <span className="text-[#111] font-medium">Email :</span>{' '}
          <a href="mailto:hello@paulmathieucollin.fr" className="hover:text-[#FF5500] transition-colors duration-300">
            hello@paulmathieucollin.fr
          </a>
        </p>
        <p><span className="text-[#111] font-medium">Site :</span> paulmathieucollin.fr</p>
      </div>
    ),
  },
  {
    id: 'hebergeur',
    label: 'HÉBERGEUR',
    content: (
      <div className="space-y-1 text-gray-600" style={{ fontSize: '0.95rem', lineHeight: '1.75' }}>
        <p><span className="text-[#111] font-medium">Société :</span> Vercel Inc.</p>
        <p><span className="text-[#111] font-medium">Adresse :</span> 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</p>
        <p>
          <span className="text-[#111] font-medium">Site :</span>{' '}
          <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF5500] transition-colors duration-300">
            vercel.com
          </a>
        </p>
      </div>
    ),
  },
  {
    id: 'propriete',
    label: 'PROPRIÉTÉ INTELLECTUELLE',
    content: (
      <p className="text-gray-600" style={{ fontSize: '0.95rem', lineHeight: '1.75' }}>
        L'ensemble des contenus présents sur ce site — photographies, vidéos, textes, design — sont la propriété exclusive de Paul Mathieu Collin, sauf mention contraire. Toute reproduction, même partielle, est interdite sans autorisation écrite préalable.
      </p>
    ),
  },
  {
    id: 'donnees',
    label: 'DONNÉES PERSONNELLES',
    content: (
      <div className="space-y-4 text-gray-600" style={{ fontSize: '0.95rem', lineHeight: '1.75' }}>
        <p>
          Ce site ne collecte aucune donnée personnelle à des fins commerciales. Les données transmises via le formulaire de contact (nom, email, message) sont utilisées uniquement pour répondre à votre demande.
        </p>
        <p>
          Conformément au RGPD et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ce droit :{' '}
          <a href="mailto:hello@paulmathieucollin.fr" className="hover:text-[#FF5500] transition-colors duration-300">
            hello@paulmathieucollin.fr
          </a>
        </p>
      </div>
    ),
  },
  {
    id: 'contact',
    label: 'CONTACT',
    content: (
      <p className="text-gray-600" style={{ fontSize: '0.95rem', lineHeight: '1.75' }}>
        Pour toute question relative à ce site ou à son contenu :{' '}
        <a href="mailto:hello@paulmathieucollin.fr" className="hover:text-[#FF5500] transition-colors duration-300">
          hello@paulmathieucollin.fr
        </a>
      </p>
    ),
  },
];

export function Legal() {
  return (
    <SmoothScroll>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 pt-28 md:pt-36 pb-24 md:pb-32 px-6 md:px-12">
          <div className="max-w-[1440px] mx-auto">

            {/* Titre */}
            <h1
              className="tracking-tight mb-16 md:mb-24"
              style={{
                fontSize: 'clamp(3rem, 7vw, 7rem)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 0.95,
              }}
            >
              Mentions<br />
              <span className="text-[#FF5500]">légales.</span>
            </h1>

            {/* Sections */}
            <div className="max-w-2xl space-y-14">
              {sections.map((s) => (
                <div key={s.id} id={s.id} style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '2rem' }}>
                  <p style={{
                    fontFamily: 'GeistMono, monospace',
                    fontSize: '0.62rem',
                    letterSpacing: '0.12em',
                    color: '#aaa',
                    marginBottom: '1rem',
                    textTransform: 'uppercase',
                  }}>
                    {s.label}
                  </p>
                  {s.content}
                </div>
              ))}
            </div>

          </div>
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
