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
    path: '/solutions/:slug',
    lazy: () => import('./pages/ServiceDetail').then((m) => ({ Component: m.ServiceDetail })),
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
