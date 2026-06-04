import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiDownload, FiFileText, FiExternalLink, FiChevronLeft, FiChevronRight, FiZoomIn, FiZoomOut } from 'react-icons/fi';
import { useLanguage } from '../i18n/LanguageContext';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import '../styles/pdf-preview.css';

// Configurar el worker como Asset de Vite (muy seguro)
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

export default function PdfPreviewModal({ isOpen, onClose, url, title }) {
  const { language } = useLanguage();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.2);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1000);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive scale
  const actualScale = windowWidth < 768 ? 0.6 : scale;

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && numPages && pageNumber < numPages) setPageNumber(prev => prev + 1);
      if (e.key === 'ArrowLeft' && pageNumber > 1) setPageNumber(prev => prev - 1);
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      // Reset state when closed
      setPageNumber(1);
      setScale(1.2);
    };
  }, [isOpen, onClose, numPages, pageNumber]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const zoomIn = () => setScale(prev => Math.min(prev + 0.2, 3.0));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));
  const prevPage = () => setPageNumber(prev => Math.max(prev - 1, 1));
  const nextPage = () => setPageNumber(prev => Math.min(prev + 1, numPages || 1));

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
                  <span>{language === 'es' ? 'Abrir' : 'Open'}</span>
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

            {/* React PDF Viewer */}
            <div className="pdf-preview-body">
              <Document
                file={typeof window !== 'undefined' ? `${window.location.origin}${url}` : url}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={(error) => console.error('Error loading PDF:', error)}
                loading={
                  <div className="pdf-loader">
                    <div className="pdf-loader-spinner" />
                    <p>{language === 'es' ? 'Cargando documento...' : 'Loading document...'}</p>
                  </div>
                }
                className="pdf-document-wrapper"
              >
                <Page
                  pageNumber={pageNumber}
                  scale={actualScale}
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                />
              </Document>
              
              {/* Pagination and Zoom Controls */}
              {numPages && (
                <div className="pdf-controls">
                  <button className="pdf-action-btn icon-only" onClick={zoomOut} title="Zoom Out">
                    <FiZoomOut />
                  </button>
                  <button className="pdf-action-btn icon-only" onClick={zoomIn} title="Zoom In">
                    <FiZoomIn />
                  </button>
                  
                  <div style={{ width: '1px', height: '24px', background: 'var(--border-subtle)', margin: '0 8px' }} />

                  <button className="pdf-action-btn icon-only" onClick={prevPage} disabled={pageNumber <= 1}>
                    <FiChevronLeft />
                  </button>
                  <span>
                    {pageNumber} / {numPages}
                  </span>
                  <button className="pdf-action-btn icon-only" onClick={nextPage} disabled={pageNumber >= numPages}>
                    <FiChevronRight />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
