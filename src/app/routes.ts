import { createBrowserRouter } from 'react-router';
import { Home } from './pages/Home';
import { ErrorPage } from './pages/ErrorPage';
import { createElement } from 'react';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
    errorElement: createElement(ErrorPage),
  },
  {
    path: '/contact',
    lazy: () => import('./pages/Contact').then((m) => ({ Component: m.Contact })),
    errorElement: createElement(ErrorPage),
  },
  {
    path: '/project/:slug',
    lazy: () => import('./pages/ProjectDetail').then((m) => ({ Component: m.ProjectDetail })),
    errorElement: createElement(ErrorPage),
  },
  {
    path: '/solutions',
    lazy: () => import('./pages/Solutions').then((m) => ({ Component: m.Solutions })),
    errorElement: createElement(ErrorPage),
  },
  {
    path: '/solutions/sound-design',
    lazy: () => import('./pages/SoundDesign').then((m) => ({ Component: m.SoundDesign })),
    errorElement: createElement(ErrorPage),
  },
  {
    path: '/solutions/video-production',
    lazy: () => import('./pages/VideoProduction').then((m) => ({ Component: m.VideoProduction })),
    errorElement: createElement(ErrorPage),
  },
  {
    path: '/solutions/production-pmc',
    lazy: () => import('./pages/ProductionPMC').then((m) => ({ Component: m.ProductionPMC })),
    errorElement: createElement(ErrorPage),
  },
  {
    path: '/mentions-legales',
    lazy: () => import('./pages/Legal').then((m) => ({ Component: m.Legal })),
    errorElement: createElement(ErrorPage),
  },
  {
    path: '*',
    lazy: () => import('./pages/NotFound').then((m) => ({ Component: m.NotFound })),
    errorElement: createElement(ErrorPage),
  },
]);
