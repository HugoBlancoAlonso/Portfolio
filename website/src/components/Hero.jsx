import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowDown, FiDownload, FiBriefcase } from 'react-icons/fi';
import { useLanguage } from '../i18n/LanguageContext';
import PdfPreviewModal from './PdfPreviewModal';
import '../styles/hero.css';

export default function Hero() {
  const { t } = useLanguage();
  const [cvOpen, setCvOpen] = useState(false);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero">
      <div className="hero-content bento-grid hero-bento">
        {/* Main Identity Box */}
        <motion.div
          className="glass-card bento-main"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="hero-subtitle">{t.hero.role}</span>
          <h1 className="hero-title">
            Hugo Blanco <span className="highlight">Alonso</span>
          </h1>
          <p className="hero-description">{t.hero.description}</p>
        </motion.div>

        {/* Call to Action Box */}
        <motion.div
          className="glass-card bento-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="bento-cta-title">{t.hero.cta_title}</h2>
          <button className="btn btn-primary" onClick={scrollToProjects}>
            <FiBriefcase /> {t.hero.cta_projects}
          </button>
          <button className="btn btn-outline" onClick={() => setCvOpen(true)}>
            <FiDownload /> {t.hero.cta_cv}
          </button>
        </motion.div>

        {/* Stats Boxes */}
        <motion.div
          className="glass-card bento-stat"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3>4+</h3>
          <p>{t.hero.stats.projects}</p>
        </motion.div>

        <motion.div
          className="glass-card bento-stat"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3>20+</h3>
          <p>{t.hero.stats.technologies}</p>
        </motion.div>

        <motion.div
          className="glass-card bento-stat"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3>100%</h3>
          <p>{t.hero.stats.commitment}</p>
        </motion.div>

      </div>

      <PdfPreviewModal
        isOpen={cvOpen}
        onClose={() => setCvOpen(false)}
        url="/HugoBlancoAlonsoCV.pdf"
        title="Curriculum Vitae — Hugo Blanco Alonso"
      />
    </section>
  );
}
