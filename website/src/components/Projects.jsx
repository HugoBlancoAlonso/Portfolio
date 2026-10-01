import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiGlobe } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { projects } from '../data/projects';
import '../styles/projects.css';

export default function Projects() {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [showAllProjects, setShowAllProjects] = useState(false);

  const currentProjects = projects[language];
  const displayedProjects = showAllProjects ? currentProjects : currentProjects.slice(0, 4);

  return (
    <section id="projects" className="projects">
      <div className="projects-container">
        <h2 className="section-title">{t.projects.title}</h2>

        <div className="bento-grid">
          {displayedProjects.map((project, index) => {
            // First project is featured (spans full width), others span 4 columns (1/3 width)
            const isFeatured = index === 0;
            const isWide = project.id === 'football-tracker';
            
            let bentoClass = 'bento-standard';
            if (isFeatured) bentoClass = 'bento-featured';
            else if (isWide) bentoClass = 'bento-wide';

            return (
              <motion.div
                key={project.id}
                className={`glass-card project-bento-card ${bentoClass}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="project-image-container">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-image"
                    loading="lazy"
                  />
                </div>

                <div className="project-content">
                  <span className="project-category">{project.category || 'Development'}</span>
                  <h3 className="project-title">{project.shortTitle || project.title}</h3>
                  <p className="project-description">{project.description}</p>

                  <div className="project-tech-list">
                    {project.technologies.slice(0, 4).map((tech, i) => (
                      <span key={i} className="project-tech-item">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="project-tech-item">+{project.technologies.length - 4}</span>
                    )}
                  </div>

                  <div className="project-links">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                        style={{ backgroundColor: '#10b981', borderColor: '#10b981', color: 'white', padding: '0.5rem' }}
                        title="Ver Proyecto en Vivo"
                      >
                        <FiGlobe />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline"
                        style={{ padding: '0.5rem' }}
                      >
                        <FiGithub />
                      </a>
                    )}
                    {project.hasDetail !== false && (
                      <button
                        className="btn btn-primary"
                        onClick={() => navigate(`/project/${project.id}`)}
                      >
                        <FiExternalLink /> {t.projects.view_details}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {currentProjects.length > 4 && (
          <div className="view-more-container" style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
            <button 
              className="btn btn-outline"
              onClick={() => setShowAllProjects(!showAllProjects)}
            >
              {showAllProjects ? t.projects.view_less : t.projects.view_more}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
