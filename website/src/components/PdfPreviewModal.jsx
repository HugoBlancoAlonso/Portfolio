import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiDownload, FiFileText, FiExternalLink } from 'react-icons/fi';
import { useLanguage } from '../i18n/LanguageContext';
import '../styles/pdf-preview.css';

export default function PdfPreviewModal({ isOpen, onClose, url, title }) {
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
          className="pdf-preview-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            className="pdf-preview-container"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* Header */}
            <div className="pdf-preview-header">
              <div className="pdf-preview-title">
                <FiFileText />
                <span>{title}</span>
              </div>
              <div className="pdf-preview-actions">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pdf-action-btn"
                  style={{ background: 'rgba(108, 99, 255, 0.1)', color: 'var(--color-primary-light)' }}
                >
                  <FiExternalLink />
                  <span>{language === 'es' ? 'Abrir en pestaña' : 'Open in tab'}</span>
                </a>
                <a
                  href={url}
                  download
                  className="pdf-action-btn download"
                >
                  <FiDownload />
                  <span>{language === 'es' ? 'Descargar' : 'Download'}</span>
                </a>
                <button className="pdf-action-btn close" onClick={onClose}>
                  <FiX />
                  <span>{language === 'es' ? 'Cerrar' : 'Close'}</span>
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="pdf-preview-body">
              <embed
                src={url}
                type="application/pdf"
                width="100%"
                height="100%"
                title={title}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
