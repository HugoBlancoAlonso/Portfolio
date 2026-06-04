import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiClock, FiArrowRight } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi';
import { useLanguage } from '../i18n/LanguageContext';
import { projects as projectData } from '../data/projects';
import '../styles/projects.css';

const categoryIcons = {
  gamedev: '🎮',
  ai: '🧠',
  data: '📊',
  fullstack: '📱',
};

export default function Projects() {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const projectList = projectData[language];

  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <section className="section" id="projects">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          {t.projects.title}
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {t.projects.subtitle}
        </motion.p>

        <div className="projects-grid">
          {projectList.map((project, index) => (
            <motion.div
              key={project.id}
              className={`project-card glass-card ${project.comingSoon ? 'coming-soon' : ''}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handleProjectClick(project.id)}
              style={{ cursor: 'pointer' }}
            >
              <div className="project-glow-line" />
              <span className="project-number">{project.number}</span>

              <div className="project-card-inner">
                <div className="project-header">
                  <div className="project-category-icon">
                    {categoryIcons[project.category]}
                  </div>
                  {project.comingSoon && (
                    <span className="coming-soon-badge">
                      <FiClock />
                      {t.projects.coming_soon}
                    </span>
                  )}
                </div>

                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                <div className="project-highlights">
                  {project.highlights.map((highlight, i) => (
                    <div key={i} className="project-highlight">
                      <span className="highlight-dot" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                <div className="project-techs">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <span key={tech} className="tag">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 5 && (
                    <span className="tag">+{project.technologies.length - 5}</span>
                  )}
                </div>

                <div className="project-actions">
                  <span className="project-link">
                    <FiArrowRight />
                    {t.projects.view_details}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
