import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import '../styles/about.css';

const stats = [
  { value: '4', key: 'projects' },
  { value: '20+', key: 'technologies' },
  { value: '5', key: 'areas' },
];

export default function About() {
  const { t } = useLanguage();

  return (
    <section className="section" id="about">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          {t.about.title}
        </motion.h2>

        <div className="about-content">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="about-text">{t.about.description}</p>
            <div className="about-divider" />
          </motion.div>

          <motion.div
            className="about-stats"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.key}
                className="stat-card glass-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              >
                <div className="stat-number">{stat.value}</div>
                <div className="stat-label">{t.about.stats[stat.key]}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
