import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiDownload, FiFileText, FiExternalLink } from 'react-icons/fi';
import { useLanguage } from '../i18n/LanguageContext';
import CvDocument from '../documents/CvDocument';
import MemoriaDocument from '../documents/MemoriaDocument';
import DiccionarioDocument from '../documents/DiccionarioDocument';
import '../styles/document-viewer.css';

export default function DocumentViewerModal({ isOpen, onClose, docId, title, downloadUrl }) {
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

  const renderDocument = () => {
    switch (docId) {
      case 'cv':
        return <CvDocument />;
      case 'memoria':
        return <MemoriaDocument />;
      case 'diccionario':
        return <DiccionarioDocument />;
      default:
        return <div>Document not found.</div>;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="doc-viewer-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            className="doc-viewer-container"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* Header */}
            <div className="doc-viewer-header">
              <div className="doc-viewer-title">
                <FiFileText />
                <span>{title}</span>
              </div>
              <div className="doc-viewer-actions">
                <a
                  href={downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="doc-action-btn"
                  style={{ background: 'rgba(108, 99, 255, 0.1)', color: 'var(--color-primary-light)' }}
                >
                  <FiExternalLink />
                  <span>{language === 'es' ? 'Original' : 'Original'}</span>
                </a>
                <a
                  href={downloadUrl}
                  download
                  className="doc-action-btn download"
                >
                  <FiDownload />
                  <span>{language === 'es' ? 'Descargar PDF' : 'Download PDF'}</span>
                </a>
                <button className="doc-action-btn close" onClick={onClose}>
                  <FiX />
                  <span>{language === 'es' ? 'Cerrar' : 'Close'}</span>
                </button>
              </div>
            </div>

            {/* Document Body */}
            <div className="doc-viewer-body">
              {renderDocument()}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
