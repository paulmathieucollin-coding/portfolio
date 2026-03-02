import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { ProjectGrid } from '../components/ProjectGrid';
import { Footer } from '../components/Footer';
import { SmoothScroll } from '../components/SmoothScroll';

export function Home() {
  return (
    <SmoothScroll>
      <div className="min-h-screen">
        <Header />
        <Hero />
        <ProjectGrid />
        <Footer />
      </div>
    </SmoothScroll>
  );
}