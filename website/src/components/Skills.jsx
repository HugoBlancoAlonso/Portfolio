import { motion } from 'framer-motion';
import {
  SiPython,
  SiTypescript,
  SiJavascript,
  SiPostgresql,
  SiCplusplus,
  SiPandas,
  SiJupyter,
  SiFastapi,
  SiDocker,
  SiReact,
  SiExpo,
  SiStreamlit,
  SiHtml5,
  SiGit,
  SiGithub,
  SiUnrealengine,
  SiSwagger,
} from 'react-icons/si';
import { FaBrain, FaRobot, FaCogs, FaDatabase, FaCubes } from 'react-icons/fa';
import { useLanguage } from '../i18n/LanguageContext';
import { skills as skillsData } from '../data/projects';
import '../styles/skills.css';

const iconMap = {
  SiPython: SiPython,
  SiTypescript: SiTypescript,
  SiJavascript: SiJavascript,
  SiPostgresql: SiPostgresql,
  SiCplusplus: SiCplusplus,
  SiBrain: FaBrain,
  SiHuggingface: FaRobot,
  SiDatabricks: FaDatabase,
  SiPandas: SiPandas,
  SiJupyter: SiJupyter,
  SiScikitlearn: FaCogs,
  SiFastapi: SiFastapi,
  SiSqlalchemy: FaCubes,
  SiDocker: SiDocker,
  SiSwagger: SiSwagger,
  SiReact: SiReact,
  SiExpo: SiExpo,
  SiStreamlit: SiStreamlit,
  SiHtml5: SiHtml5,
  SiGit: SiGit,
  SiGithub: SiGithub,
  SiAlchemy: FaCubes,
  SiVisualstudiocode: FaCogs,
  SiUnrealengine: SiUnrealengine,
  SiUnity: FaCubes,
};

const categoryIcons = {
  languages: '💻',
  ai_ml: '🧠',
  backend: '⚙️',
  frontend: '🎨',
  tools: '🔧',
  gamedev: '🎮',
};

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section className="section" id="skills">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          {t.skills.title}
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {t.skills.subtitle}
        </motion.p>

        <div className="skills-grid">
          {skillsData.map((group, groupIndex) => (
            <motion.div
              key={group.category}
              className="skill-category glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: groupIndex * 0.08 }}
            >
              <h3 className="skill-category-title">
                <span className="skill-category-icon">
                  {categoryIcons[group.category]}
                </span>
                {t.skills.categories[group.category]}
              </h3>
              <div className="skill-items">
                {group.items.map((skill, skillIndex) => {
                  const IconComponent = iconMap[skill.icon];
                  return (
                    <motion.div
                      key={skill.name}
                      className="skill-item"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.3,
                        delay: groupIndex * 0.08 + skillIndex * 0.05,
                      }}
                    >
                      <span className="skill-icon">
                        {IconComponent ? <IconComponent /> : '•'}
                      </span>
                      {skill.name}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
