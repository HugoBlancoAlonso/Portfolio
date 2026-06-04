import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiDownload, FiFileText } from 'react-icons/fi';
import { useLanguage } from '../i18n/LanguageContext';
import '../styles/cv-preview.css';

export default function CvPreview({ isOpen, onClose }) {
  const { language } = useLanguage();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="cv-preview-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            className="cv-preview-container"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* Header */}
            <div className="cv-preview-header">
              <div className="cv-preview-title">
                <FiFileText />
                <span>Curriculum Vitae — Hugo Blanco Alonso</span>
              </div>
              <div className="cv-preview-actions">
                <a
                  href="/HugoBlancoAlonsoCV.pdf"
                  download
                  className="cv-action-btn download"
                >
                  <FiDownload />
                  <span>{language === 'es' ? 'Descargar' : 'Download'}</span>
                </a>
                <button className="cv-action-btn close" onClick={onClose}>
                  <FiX />
                  <span>{language === 'es' ? 'Cerrar' : 'Close'}</span>
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="cv-preview-body">
              <iframe
                src="/HugoBlancoAlonsoCV.pdf"
                title="CV Preview"
                loading="lazy"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
