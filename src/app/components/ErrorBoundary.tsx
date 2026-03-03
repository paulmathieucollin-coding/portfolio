import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          position: 'fixed', inset: 0,
          background: '#0d0d0d',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontFamily: 'GeistMono, monospace',
          gap: '1.5rem', padding: '2rem', textAlign: 'center',
        }}>
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.35)' }}>
            PMC — PORTFOLIO
          </span>
          <p style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>
            Une erreur est survenue.
          </p>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', margin: 0, maxWidth: '360px', lineHeight: 1.7 }}>
            Le site a rencontré un problème inattendu.<br />
            Rechargez la page pour reprendre.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '0.5rem',
              background: 'none',
              border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: '4px',
              color: 'rgba(255,255,255,0.7)',
              fontFamily: 'GeistMono, monospace',
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              padding: '0.65rem 1.5rem',
              cursor: 'pointer',
            }}
          >
            RECHARGER
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
