export function Footer() {
  return (
    <footer
      className="px-6 md:px-12 py-12 md:py-16"
      style={{ borderTop: '1px solid rgba(255,255,255,0.08)', backgroundColor: '#0a0a0a' }}
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-12 mb-12">
          <div>
            <p className="font-medium mb-2" style={{ fontSize: '0.95rem', color: '#ffffff' }}>
              Paul Mathieu Collin
            </p>
            <p style={{ fontSize: '0.825rem', lineHeight: '1.6', color: 'rgba(255,255,255,0.35)' }}>
              Photographe & Directeur artistique
            </p>
          </div>

          <div className="flex gap-12">
            <div>
              <p
                className="mb-3"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.12em',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.25)',
                  textTransform: 'uppercase',
                }}
              >
                Social
              </p>
              <div className="space-y-2">
                {[
                  { label: 'Instagram', href: '#' },
                  { label: 'LinkedIn', href: '#' },
                  { label: 'X (Twitter)', href: '#' },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block transition-opacity duration-300 hover:opacity-100"
                    style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)' }}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p
                className="mb-3"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.12em',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.25)',
                  textTransform: 'uppercase',
                }}
              >
                Contact
              </p>
              <a
                href="mailto:hello@paulmathieucollin.com"
                className="block transition-opacity duration-300 hover:opacity-100"
                style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)' }}
              >
                hello@paulmathieucollin.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex justify-between items-center"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.2)' }}>
            &copy; 2026 Paul Mathieu Collin
          </p>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'rgba(255,255,255,0.12)',
              letterSpacing: '0.06em',
            }}
          >
            Built with precision
          </p>
        </div>
      </div>
    </footer>
  );
}
