import { RouterProvider } from 'react-router';
import { router } from './routes';
import { CustomCursor } from './components/CustomCursor';
import { CookieBanner } from './components/CookieBanner';

export default function App() {
  return (
    <>
      <CustomCursor />
      <CookieBanner />
      <RouterProvider router={router} />
    </>
  );
}
