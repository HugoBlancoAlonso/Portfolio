import { motion } from 'framer-motion';
import { FiMail, FiGithub, FiLinkedin } from 'react-icons/fi';
import { useLanguage } from '../i18n/LanguageContext';
import '../styles/contact.css';

// ============================================
// 📌 CONFIGURA TUS REDES SOCIALES AQUÍ:
// Reemplaza '' con tu URL real cuando quieras
// ============================================
const SOCIAL_LINKS = {
  github: 'https://github.com/HugoBlancoAlonso',
  linkedin: '',
};

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section className="section" id="contact">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          {t.contact.title}
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {t.contact.subtitle}
        </motion.p>

        <div className="contact-content">
          {/* Email Contact */}
          <motion.div
            className="contact-info-section"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="contact-item glass-card">
              <div className="contact-icon">
                <FiMail />
              </div>
              <div>
                <div className="contact-item-label">{t.contact.email_label}</div>
                <div className="contact-item-value">
                  <a href="mailto:hu.blancoalonso@gmail.com">
                    hu.blancoalonso@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="social-section"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="social-title">{t.contact.social_label}</h3>
            <div className="social-links">
              {SOCIAL_LINKS.github ? (
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link glass-card"
                >
                  <FiGithub className="social-link-icon" />
                  <span className="social-link-text">GitHub</span>
                </a>
              ) : (
                <div className="social-link glass-card placeholder">
                  <FiGithub className="social-link-icon" />
                  <span className="social-link-text">{t.contact.github_placeholder}</span>
                </div>
              )}

              {SOCIAL_LINKS.linkedin ? (
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link glass-card"
                >
                  <FiLinkedin className="social-link-icon" />
                  <span className="social-link-text">LinkedIn</span>
                </a>
              ) : (
                <div className="social-link glass-card placeholder">
                  <FiLinkedin className="social-link-icon" />
                  <span className="social-link-text">{t.contact.linkedin_placeholder}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
