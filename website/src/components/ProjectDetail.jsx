import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiGithub, FiExternalLink, FiPlay, FiClock, FiFileText } from 'react-icons/fi';
import { useLanguage } from '../i18n/LanguageContext';
import { projectDetails } from '../data/projectDetails';
import { projects as projectList } from '../data/projects';
import '../styles/project-detail.css';

export default function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  const project = projectDetails[language]?.[projectId];
  const projectMeta = projectList[language]?.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="project-detail container">
        <button className="back-button" onClick={() => navigate('/')}>
          <FiArrowLeft /> {language === 'es' ? 'Volver al Portfolio' : 'Back to Portfolio'}
        </button>
        <h1 className="section-title">
          {language === 'es' ? 'Proyecto no encontrado' : 'Project not found'}
        </h1>
      </div>
    );
  }

  const isComingSoon = projectMeta?.comingSoon;

  return (
    <div className="project-detail">
      <div className="container">
        {/* Back button */}
        <motion.button
          className="back-button"
          onClick={() => navigate('/')}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <FiArrowLeft />
          {language === 'es' ? 'Volver al Portfolio' : 'Back to Portfolio'}
        </motion.button>

        {/* Header */}
        <motion.div
          className="project-detail-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="project-detail-title">{project.title}</h1>
          <p className="project-detail-subtitle">{project.subtitle}</p>

          <div className="project-detail-badges">
            {project.badges.map((badge) => (
              <span key={badge} className="tag">{badge}</span>
            ))}
          </div>

          {/* Coming Soon Banner */}
          {isComingSoon && (
            <div className="coming-soon-banner">
              <FiClock className="coming-soon-banner-icon" />
              <span className="coming-soon-banner-text">
                {t.projects.coming_soon} — {t.projects.coming_soon_desc}
              </span>
            </div>
          )}

          {/* Actions */}
          {project.githubUrl && (
            <div className="project-detail-actions">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <FiGithub />
                {t.projects.view_github}
                <FiExternalLink size={14} />
              </a>
            </div>
          )}
        </motion.div>

        {/* Documents */}
        {project.documents && project.documents.length > 0 && (
          <motion.div
            className="detail-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="detail-section-title">
              {language === 'es' ? '📚 Documentación' : '📚 Documentation'}
            </h2>
            <div className="documents-grid">
              {project.documents.map((doc, i) => (
                <a
                  key={i}
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="document-card glass-card"
                  style={{ textDecoration: 'none', display: 'block', textAlign: 'left', width: '100%', background: 'transparent', border: '1px solid var(--border-subtle)' }}
                >
                  <span className="document-icon">{doc.icon}</span>
                  <div className="document-info">
                    <h4>{doc.title}</h4>
                    <p>{doc.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        )}

        {/* Content Sections */}
        {project.sections.map((section, index) => (
          <motion.div
            key={index}
            className="detail-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <h2 className="detail-section-title">{section.title}</h2>
            <div className="detail-section-content">
              {renderFormattedText(section.content)}
            </div>
          </motion.div>
        ))}

        {/* YouTube Phases */}
        {project.phases && project.phases.length > 0 && (
          <motion.div
            className="detail-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
          >
            <div className="phases-grid">
              {project.phases.map((phase, i) => (
                <motion.a
                  key={i}
                  href={`https://youtu.be/${phase.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="phase-card glass-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  style={{ textDecoration: 'none' }}
                >
                  <div className="phase-thumbnail">
                    <img
                      src={`https://img.youtube.com/vi/${phase.youtubeId}/hqdefault.jpg`}
                      alt={phase.title}
                      loading="lazy"
                    />
                    <div className="phase-play-overlay">
                      <div className="play-icon">
                        <FiPlay />
                      </div>
                    </div>
                  </div>
                  <div className="phase-info">
                    <h4 className="phase-title">{phase.title}</h4>
                    <p className="phase-description">{phase.description}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}

        {/* Setup Guide */}
        {project.setup && (
          <motion.div
            className="setup-section glass-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="detail-section-title">{project.setup.title}</h2>
            <p className="detail-section-content">{project.setup.description}</p>

            <div className="setup-structure">{project.setup.structure}</div>

            <h4 style={{ color: 'var(--text-primary)', marginTop: 'var(--space-lg)', marginBottom: 'var(--space-sm)' }}>
              {language === 'es' ? '🚀 Iniciar con Docker:' : '🚀 Start with Docker:'}
            </h4>
            <div className="setup-command">
              <span className="dollar">$</span>
              <code>{project.setup.dockerCommand}</code>
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)', marginTop: 'var(--space-sm)' }}>
              {language === 'es' ? 'Acceder en: ' : 'Access at: '}
              <a
                href={project.setup.accessUrl}
                style={{ color: 'var(--color-accent)' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.setup.accessUrl}
              </a>
            </p>
          </motion.div>
        )}

        {/* Note */}
        {project.note && (
          <motion.div
            className="detail-note"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            {renderFormattedText(project.note)}
          </motion.div>
        )}
      </div>
    </div>
  );
}

/**
 * Simple markdown-like text renderer
 * Handles **bold**, *italic*, `code`, and line breaks
 */
function renderFormattedText(text) {
  if (!text) return null;

  const parts = text.split('\n');
  return parts.map((line, i) => {
    if (!line.trim()) return <br key={i} />;

    // Process inline formatting
    const formattedLine = line
      .split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/)
      .map((segment, j) => {
        if (segment.startsWith('**') && segment.endsWith('**')) {
          return <strong key={j}>{segment.slice(2, -2)}</strong>;
        }
        if (segment.startsWith('*') && segment.endsWith('*')) {
          return <em key={j}>{segment.slice(1, -1)}</em>;
        }
        if (segment.startsWith('`') && segment.endsWith('`')) {
          return (
            <code
              key={j}
              style={{
                background: 'rgba(108, 99, 255, 0.1)',
                padding: '2px 6px',
                borderRadius: '4px',
                fontSize: '0.9em',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {segment.slice(1, -1)}
            </code>
          );
        }
        return segment;
      });

    // Check if it's a list item
    if (line.trim().startsWith('•') || line.trim().match(/^\d+\./)) {
      return (
        <p key={i} style={{ paddingLeft: '1rem', marginBottom: '0.3rem' }}>
          {formattedLine}
        </p>
      );
    }

    return <p key={i} style={{ marginBottom: '0.5rem' }}>{formattedLine}</p>;
  });
}
