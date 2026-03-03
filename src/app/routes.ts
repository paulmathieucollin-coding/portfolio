import { createBrowserRouter } from 'react-router';
import { Home } from './pages/Home';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
  },
  {
    path: '/contact',
    lazy: () => import('./pages/Contact').then((m) => ({ Component: m.Contact })),
  },
  {
    path: '/project/:slug',
    lazy: () => import('./pages/ProjectDetail').then((m) => ({ Component: m.ProjectDetail })),
  },
  {
    path: '/mentions-legales',
    lazy: () => import('./pages/Legal').then((m) => ({ Component: m.Legal })),
  },
  {
    path: '*',
    lazy: () => import('./pages/NotFound').then((m) => ({ Component: m.NotFound })),
  },
]);
