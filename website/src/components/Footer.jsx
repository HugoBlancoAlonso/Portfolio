import { useLanguage } from '../i18n/LanguageContext';
import '../styles/footer.css';

const sections = ['home', 'about', 'projects', 'skills', 'contact'];

export default function Footer() {
  const { t } = useLanguage();

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p className="footer-text">
          {t.footer.made_with}{' '}
          <span className="footer-heart">❤️</span>{' '}
          {t.footer.by}{' '}
          <span className="footer-name">Hugo Blanco Alonso</span>
          {' · '}© {new Date().getFullYear()} {t.footer.rights}
        </p>

        <nav className="footer-links">
          {sections.map((section) => (
            <span
              key={section}
              className="footer-link"
              onClick={() => scrollToSection(section)}
            >
              {t.nav[section]}
            </span>
          ))}
        </nav>
      </div>
    </footer>
  );
}
