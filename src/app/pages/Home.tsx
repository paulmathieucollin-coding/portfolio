import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { ProjectGrid } from '../components/ProjectGrid';
import { Footer } from '../components/Footer';
import { SmoothScroll } from '../components/SmoothScroll';
import { PageTransition } from '../components/PageTransition';

export function Home() {
  return (
    <SmoothScroll>
      <PageTransition>
        <div className="min-h-screen">
          <Header />
          <Hero />
          <ProjectGrid />
          <Footer />
        </div>
      </PageTransition>
    </SmoothScroll>
  );
}