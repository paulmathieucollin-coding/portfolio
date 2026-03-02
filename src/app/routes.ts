import { createBrowserRouter } from 'react-router';
import { Home } from './pages/Home';
import { Contact } from './pages/Contact';
import { ProjectDetail } from './pages/ProjectDetail';
import { Legal } from './pages/Legal';
import { NotFound } from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
  },
  {
    path: '/contact',
    Component: Contact,
  },
  {
    path: '/project/:slug',
    Component: ProjectDetail,
  },
  {
    path: '/mentions-legales',
    Component: Legal,
  },
  {
    path: '*',
    Component: NotFound,
  },
]);