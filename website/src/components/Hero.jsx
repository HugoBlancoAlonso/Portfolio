import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiEye, FiArrowDown } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi';
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
    <section className="hero section" id="home">
      {/* Background orbs */}
      <div className="hero-bg">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
      </div>

      <div className="container hero-content">
        <motion.p
          className="hero-greeting"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {t.hero.greeting}
        </motion.p>

        <motion.h1
          className="hero-name"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          {t.hero.name}
        </motion.h1>

        <motion.h2
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {t.hero.title}
        </motion.h2>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <HiOutlineSparkles style={{ verticalAlign: 'middle', marginRight: '6px' }} />
          {t.hero.subtitle}
        </motion.p>

        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          {t.hero.description}
        </motion.p>

        <motion.div
          className="hero-ctas"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.85 }}
        >
          <button className="btn btn-primary" onClick={scrollToProjects}>
            <HiOutlineSparkles />
            {t.hero.cta_projects}
          </button>
          <button
            className="btn btn-outline"
            onClick={() => setCvOpen(true)}
          >
            <FiEye />
            {t.hero.cta_cv}
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        onClick={scrollToProjects}
      >
        <FiArrowDown />
        <div className="scroll-line" />
      </motion.div>

      {/* CV Preview Modal */}
      <PdfPreviewModal
        isOpen={cvOpen}
        onClose={() => setCvOpen(false)}
        url="/HugoBlancoAlonsoCV.pdf"
        title="Curriculum Vitae — Hugo Blanco Alonso"
      />
    </section>
  );
}
