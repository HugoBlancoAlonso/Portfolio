import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectDetail from './components/ProjectDetail';
import ScrollToTop from './components/ScrollToTop';
import { Analytics } from '@vercel/analytics/react';

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/project/:projectId" element={<ProjectDetail />} />
        </Routes>
      </main>
      <Footer />
      <Analytics />
    </>
  );
}
