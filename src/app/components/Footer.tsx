export function Footer() {
  return (
    <footer
      className="px-6 md:px-12 py-10 md:py-14"
      style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}
    >
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between gap-8 md:gap-12">
        <div>
          <p className="font-medium mb-2" style={{ fontSize: '0.9rem' }}>
            Paul Mathieu Collin
          </p>
          <p className="text-gray-400" style={{ fontSize: '0.825rem', lineHeight: '1.6' }}>
            Directeur artistique & photographe
          </p>
        </div>

        <div className="flex gap-10">
          <div>
            <p
              className="text-gray-400 mb-3"
              style={{ fontSize: '0.7rem', letterSpacing: '0.1em', fontWeight: 500 }}
            >
              RÉSEAUX
            </p>
            <div className="space-y-2">
              {[
                { label: 'Instagram', href: '#' },
                { label: 'Behance', href: '#' },
                { label: 'LinkedIn', href: '#' },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="block text-gray-600 hover:text-[#FF5500] transition-colors duration-300"
                  style={{ fontSize: '0.85rem' }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p
              className="text-gray-400 mb-3"
              style={{ fontSize: '0.7rem', letterSpacing: '0.1em', fontWeight: 500 }}
            >
              CONTACT
            </p>
            <a
              href="mailto:hello@paulmathieucollin.com"
              className="block text-gray-600 hover:text-[#FF5500] transition-colors duration-300"
              style={{ fontSize: '0.85rem' }}
            >
              hello@paulmathieucollin.com
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto mt-10 pt-8 flex justify-between items-center"
        style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <p className="text-gray-400" style={{ fontSize: '0.75rem' }}>
          © 2026 Paul Mathieu Collin
        </p>
        <p className="text-gray-300" style={{ fontSize: '0.75rem' }}>
          Built with precision
        </p>
      </div>
    </footer>
  );
}
