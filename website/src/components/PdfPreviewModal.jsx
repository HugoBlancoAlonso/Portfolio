import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiDownload, FiExternalLink } from 'react-icons/fi';
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
          transition={{ duration: 0.2 }}
          onClick={(e) => {
            // Close if clicking on the dark background
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
              <span className="pdf-preview-title">{title}</span>
              <div className="pdf-preview-actions">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pdf-action-btn"
                  title={language === 'es' ? 'Abrir en pestaña nueva' : 'Open in new tab'}
                >
                  <FiExternalLink />
                  <span className="action-text">{language === 'es' ? 'Abrir' : 'Open'}</span>
                </a>
                <a
                  href={url}
                  download
                  className="pdf-action-btn"
                  title={language === 'es' ? 'Descargar archivo' : 'Download file'}
                >
                  <FiDownload />
                  <span className="action-text">{language === 'es' ? 'Descargar' : 'Download'}</span>
                </a>
                <button
                  className="pdf-action-btn close-btn"
                  onClick={onClose}
                  title={language === 'es' ? 'Cerrar' : 'Close'}
                >
                  <FiX />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="pdf-preview-body">
              {/* iframe is standard and works best in production environments like Vercel */}
              <iframe
                src={`${url}#toolbar=0&navpanes=0`}
                title={title}
                frameBorder="0"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
