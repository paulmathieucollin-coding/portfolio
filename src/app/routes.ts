import { createBrowserRouter } from 'react-router';
import { Home } from './pages/Home';
import { Contact } from './pages/Contact';
import { ProjectDetail } from './pages/ProjectDetail';
import { TermsOfService } from './pages/TermsOfService';
import { PrivacyPolicy } from './pages/PrivacyPolicy';

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
    path: '/legal/mentions-legales',
    Component: TermsOfService,
  },
  {
    path: '/legal/confidentialite',
    Component: PrivacyPolicy,
  },
]);