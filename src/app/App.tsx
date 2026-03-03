import { RouterProvider } from 'react-router';
import { router } from './routes';
import { CustomCursor } from './components/CustomCursor';
import { CookieBanner } from './components/CookieBanner';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <CustomCursor />
      <CookieBanner />
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}
