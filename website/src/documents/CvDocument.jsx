import React from 'react';

export default function CvDocument() {
  return (
    <div className="document-page">
      <div className="doc-cv-header">
        <h1>Hugo Blanco Alonso</h1>
        <div className="doc-cv-contact">
          <span>📅 13/04/2005</span>
          <span>🌍 Española</span>
          <span>📞 (+34) 644208624</span>
          <span>✉️ hu.blancoalonso@gmail.com</span>
          <span>📍 Calle La Torre, 1ºA, 24002, Leon, España</span>
          <span>🔗 <a href="https://hugoblancoalonso.github.io/Portfolio/" target="_blank" rel="noopener noreferrer" style={{color: 'var(--color-primary)'}}>Portfolio</a></span>
        </div>
      </div>

      <h2>ACERCA DE MÍ</h2>
      <p>Desarrollador de Aplicaciones Multiplataforma especializado en Inteligencia Artificial y Big Data.</p>
      <p>Desarrollo pipelines de datos escalables (PySpark, Databricks, SQL) y arquitecturas de Machine Learning y NLP (Python, Docker, Streamlit). Enfocado en el ciclo completo del dato, desde la extracción hasta el despliegue de soluciones visuales e interactivas.</p>

      <h2>EXPERIENCIA LABORAL</h2>
      <div className="cv-entry">
        <div className="cv-entry-header">
          <span className="cv-entry-title">DATA ANALYST - HP SOLUTIONS CREATION AND DEVELOPMENT SERVICES</span>
          <span className="cv-entry-meta">07/05/2026 - 17/05/2026 | LEÓN, ESPAÑA</span>
        </div>
        <ul>
          <li>Refactorización y optimización de pipelines ETL para mejorar la mantenibilidad, escalabilidad y testabilidad de los procesos de obtención y transformación de datos.</li>
          <li>Desarrollo de soluciones de Data Quality y Data Profiling mediante generación automatizada de métricas y metadatos de tablas para monitorización y documentación interna.</li>
        </ul>
      </div>

      <div className="cv-entry">
        <div className="cv-entry-header">
          <span className="cv-entry-title">DESARROLLADOR WEB - VEXIZA</span>
          <span className="cv-entry-meta">23/02/2025 - 22/05/2025 | LEÓN, ESPAÑA</span>
        </div>
        <ul>
          <li>Desarrollo web de la página de deportes de la Universidad de León.</li>
          <li>Depuración y optimización de dicha web.</li>
        </ul>
      </div>

      <h2>EDUCACIÓN Y FORMACIÓN</h2>
      <div className="cv-entry">
        <div className="cv-entry-header">
          <span className="cv-entry-title">ESPECIALIZACIÓN DE INTELIGENCIA ARTIFICIAL Y BIG DATA - IES SAN ANDRÉS</span>
          <span className="cv-entry-meta">12/09/2025 - Actual | LEÓN, ESPAÑA</span>
        </div>
        <p style={{fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)'}}>Campo(s) de estudio: Tecnologías de la información y la comunicación (TIC)</p>
      </div>

      <div className="cv-entry">
        <div className="cv-entry-header">
          <span className="cv-entry-title">FP TÉCNICO SUPERIOR EN DESARROLLO DE APLICACIONES MULTIPLATAFORMA - CENTRO FP MARÍA AUXILIADORA</span>
          <span className="cv-entry-meta">15/10/2023 - 23/06/2025 | LEÓN, ESPAÑA</span>
        </div>
        <p style={{fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)'}}>Campo(s) de estudio: Tecnologías de la información y la comunicación (TIC)</p>
      </div>

      <div className="cv-entry">
        <div className="cv-entry-header">
          <span className="cv-entry-title">BACHILLERATO CIENTIFICO - IES JUAN DEL ENZINA</span>
          <span className="cv-entry-meta">10/09/2021 - 23/06/2023 | LEÓN, ESPAÑA</span>
        </div>
      </div>

      <h2>CERTIFICACIONES</h2>
      <div className="cv-entry">
        <div className="cv-entry-header">
          <span className="cv-entry-title">Curso de Angular - Edutin Academy</span>
          <span className="cv-entry-meta">08/02/2026</span>
        </div>
        <ul>
          <li>Formación en Angular enfocada en el desarrollo de aplicaciones web SPA utilizando arquitectura basada en componentes.</li>
          <li>Implementación de proyectos frontend con Angular, incluyendo consumo de servicios, enrutamiento, gestión de estado básica y estructuración de interfaces dinámicas.</li>
        </ul>
      </div>

      <h2>CAPACIDADES</h2>
      <div className="cv-skills-grid">
        <span className="cv-skill-tag">Python</span>
        <span className="cv-skill-tag">Java</span>
        <span className="cv-skill-tag">JavaScript / HTML</span>
        <span className="cv-skill-tag">MySQL</span>
        <span className="cv-skill-tag">Docker</span>
        <span className="cv-skill-tag">Git & GitHub</span>
        <span className="cv-skill-tag">Hadoop</span>
        <span className="cv-skill-tag">Unreal Engine 5</span>
        <span className="cv-skill-tag">Responsabilidad en el trabajo</span>
      </div>

      <h2>COMPETENCIAS DE IDIOMAS</h2>
      <p><strong>Lengua materna:</strong> ESPAÑOL</p>
      <div className="doc-table-wrapper">
        <table className="doc-table">
          <thead>
            <tr>
              <th>Idioma</th>
              <th>Comprensión auditiva</th>
              <th>Comprensión lectora</th>
              <th>Producción oral</th>
              <th>Interacción oral</th>
              <th>Expresión escrita</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>INGLÉS</strong></td>
              <td>B2</td>
              <td>B1</td>
              <td>B2</td>
              <td>B2</td>
              <td>B1</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>OTROS DATOS</h2>
      <p><strong>Permiso de conducción:</strong> B</p>
    </div>
  );
}
