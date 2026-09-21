import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { projects } from '../data/projects';
import '../styles/projects.css';

export default function Projects() {
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  return (
    <section id="projects" className="projects">
      <div className="projects-container">
        <h2 className="section-title">{t.projects.title}</h2>

        <div className="bento-grid">
          {projects[language].map((project, index) => {
            // First project is featured (spans full width), others span 4 columns (1/3 width)
            const isFeatured = index === 0;
            return (
              <motion.div
                key={project.id}
                className={`glass-card project-bento-card ${isFeatured ? 'bento-featured' : 'bento-standard'}`}
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
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline"
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
      </div>
    </section>
  );
}
