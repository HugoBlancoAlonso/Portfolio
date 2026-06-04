import React from 'react';

export default function MemoriaDocument() {
  return (
    <div className="document-page">
      <div className="doc-header-banner">
        <h1>MEMORIA TÉCNICA DEL PROYECTO</h1>
        <h2 style={{borderBottom: 'none', marginTop: 'var(--space-sm)'}}>Pipeline de Ingesta Climatológica y Energética</h2>
        <p style={{fontSize: 'var(--text-lg)', color: 'var(--text-secondary)'}}>Arquitectura Medallion Bronze · Silver · Gold sobre Hadoop HDFS</p>
      </div>

      <div className="doc-meta-info">
        <div><strong>Metodología:</strong> CRISP-DM (Cross-Industry Standard Process for Data Mining)</div>
        <div><strong>Módulo:</strong> Especialización en Inteligencia Artificial y Big Data</div>
        <div><strong>Asignatura:</strong> Sistemas de Big Data</div>
        <div><strong>Alumno:</strong> Hugo Blanco Alonso</div>
        <div><strong>Curso académico:</strong> 2024 – 2025</div>
      </div>

      <div style={{background: 'var(--bg-secondary)', padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-xl)'}}>
        <p style={{margin: 0}}><strong>Fases desarrolladas:</strong> I Comprensión del negocio · II Comprensión de los datos · III Preparación de los datos · VI Despliegue</p>
        <p style={{margin: 'var(--space-xs) 0 0 0', fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)'}}><em>Nota: Modelado y Evaluación se omiten por estar fuera del ámbito del módulo de Big Data.</em></p>
      </div>

      <p>El presente documento describe el ciclo de vida completo de un proyecto de Big Data orientado al análisis de la relación entre las condiciones meteorológicas y la generación de energía renovable en España. Se sigue rigurosamente la metodología CRISP-DM, articulando cada fase —desde la comprensión del negocio hasta el despliegue— sobre una infraestructura Hadoop HDFS con arquitectura Medallion (Bronze, Silver, Gold) y servicios cloud de AWS S3 y funciones Lambda. Las fuentes de datos empleadas son la API de AEMET, la API de balance eléctrico de REE/ESIOS y un calendario de festivos nacionales 2024–2026. El resultado final es un dataset consolidado y un dashboard interactivo HTML que permite explorar la generación eólica e hidráulica en función de variables climáticas y del tipo de día.</p>

      <h2>FASE I: Comprensión del Negocio</h2>
      <p><strong>Business Understanding – Traducción del problema empresarial en objetivos de minería de datos</strong></p>
      <p>La primera fase de CRISP-DM exige comprender el contexto organizativo y definir con precisión qué valor aportará el proyecto. La transición energética española hacia fuentes renovables genera una necesidad analítica clara: entender cómo las condiciones climáticas determinan la capacidad de generación eólica e hidráulica y cómo el comportamiento del consumo varía según el calendario laboral.</p>

      <h3>1.1 Contexto y Problema de Negocio</h3>
      <p>La Red Eléctrica de España (REE/ESIOS) publica diariamente los datos de balance eléctrico por tecnología. Sin embargo, la correlación entre los datos meteorológicos (temperatura, velocidad del viento, precipitación) y los niveles de generación renovable no está sistematizada en una sola fuente de verdad accesible para análisis. Este proyecto construye esa fuente única mediante un pipeline ETL robusto sobre un entorno Big Data.</p>
      <ul>
        <li><strong>Objetivo de negocio:</strong> Construir una plataforma de datos integrada que permita analizar la correlación entre variables meteorológicas (AEMET) y la generación de energía renovable (REE/ESIOS), incorporando el efecto del calendario festivo, para apoyar decisiones de planificación energética.</li>
      </ul>

      <h3>1.2 Valor del Proyecto y ROI Esperado</h3>
      <ul>
        <li><strong>Operativo:</strong> Reducción del tiempo de análisis manual de datos dispersos en múltiples APIs y formatos heterogéneos.</li>
        <li><strong>Analítico:</strong> Base de datos unificada y versionada (Parquet) que permite construir modelos predictivos de generación renovable.</li>
        <li><strong>Estratégico:</strong> Apoyo a la toma de decisiones en gestión de la demanda y planificación de reservas energéticas en función del clima y la estacionalidad.</li>
      </ul>

      <h3>1.3 Fuentes de Datos Identificadas</h3>
      <div className="doc-table-wrapper">
        <table className="doc-table">
          <thead>
            <tr>
              <th>Fuente de Datos</th>
              <th>Descripción y Alcance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>AEMET (API REST)</strong></td>
              <td>Datos climáticos diarios: temperatura máxima, mínima y media (ºC), racha máxima de viento (km/h), velocidad del viento y precipitación por franjas horarias. Cobertura: últimos 5 meses a nivel de estación meteorológica y provincia.</td>
            </tr>
            <tr>
              <td><strong>REE / ESIOS (API v2)</strong></td>
              <td>Balance eléctrico histórico: generación eólica e hidráulica en MWh con porcentaje sobre el total del sistema. Frecuencia: diaria. Actualización automática mediante AWS Lambda.</td>
            </tr>
            <tr>
              <td><strong>Calendario Festivos</strong></td>
              <td>CSV con la clasificación de todos los días del periodo 2024–2026 en tres categorías: Laboral, Fin de semana y Festivo (nacional).</td>
            </tr>
            <tr>
              <td><strong>AWS S3</strong></td>
              <td>Bucket de almacenamiento intermedio (capa Bronze) donde las funciones Lambda depositan los JSON diarios de ESIOS antes de su procesamiento hacia la capa Silver en HDFS.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>FASE II: Comprensión de los Datos</h2>
      <p><strong>Data Understanding – EDA, calidad, estructura y descripción de las fuentes</strong></p>
      
      <h3>2.1 Recolección Inicial y Volumen de Datos</h3>
      <ul>
        <li><strong>≈125.000</strong> Registros AEMET (brutos)</li>
        <li><strong>≈258</strong> Registros ESIOS (días × 2 energías)</li>
        <li><strong>1.096</strong> Días en calendario festivos</li>
        <li><strong>≈103.000</strong> Registros en dataset consolidado Gold</li>
      </ul>

      <h3>2.2 Descripción Estructural de los Datasets</h3>
      <p>Los datos de AEMET presentan una granularidad de estación meteorológica × día, con más de 700 estaciones. Los datos de ESIOS tienen granularidad diaria nacional, con dos registros por día (uno por tipo de energía: Eólica e Hidráulica). El calendario de festivos cubre 1.096 días.</p>

      <h3>2.3 Análisis Exploratorio de Datos (EDA)</h3>
      <p><strong>Análisis Univariante – Temperatura Máxima:</strong> El análisis del boxplot inicial de temperatura máxima reveló la presencia de outliers significativos en las colas de la distribución, consecuencia de errores de registro en algunas estaciones remotas.</p>
      <p><strong>Análisis Univariante – Variables de Viento:</strong> Las variables de racha y velocidad máxima de viento presentaron una distribución fuertemente sesgada a la derecha (asimetría positiva). La distribución logarítmica del viento (log10) mostró un patrón mucho más próximo a la normalidad.</p>

      <h2>FASE III: Preparación de los Datos</h2>
      <p><strong>Data Preparation – Limpieza, transformación, feature engineering e integración</strong></p>
      
      <h3>3.1 Arquitectura Medallion del Pipeline ETL</h3>
      <div className="doc-table-wrapper">
        <table className="doc-table">
          <thead>
            <tr>
              <th>CAPA</th>
              <th>TECNOLOGÍA</th>
              <th>DESCRIPCIÓN</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>BRONZE</strong></td>
              <td>AWS S3 + Lambda</td>
              <td>Datos crudos sin transformar. Lambda extrae el JSON de ESIOS y lo deposita en S3. AEMET y festivos se descargan manualmente.</td>
            </tr>
            <tr>
              <td><strong>SILVER</strong></td>
              <td>Jupyter + Pandas + HDFS</td>
              <td>Datos limpios y transformados. Se aplica IQR clipping, log1p en viento, parsing de formatos. Exportación a Parquet en /datalake/plata/.</td>
            </tr>
            <tr>
              <td><strong>GOLD</strong></td>
              <td>Jupyter + Pandas + HDFS</td>
              <td>Dataset analítico consolidado. Inner join de fuentes, feature engineering (HDD, CDD, amplitud), OHE y exportación a /datalake/oro/datos/.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>3.2 Selección y Limpieza de Datos – Capa Silver</h3>
      <ul>
        <li><strong>Tratamiento de Valores Ausentes:</strong> Se decidió aplicar la política de eliminación de filas (dropna) dada la cantidad masiva de datos y el bajo porcentaje de nulos (~4.8%).</li>
        <li><strong>Parsing de Formatos Mixtos:</strong> Extracción vectorizada de partes numéricas de campos como '14.7 (16:30)'.</li>
        <li><strong>Clipping IQR:</strong> Estabilización de outliers en colas usando el Rango Intercuartílico sin perder registros.</li>
        <li><strong>Transformación Logarítmica:</strong> Compresión de variables de viento a base log10 para aproximar a la normalidad.</li>
      </ul>

      <h3>3.5 Ingeniería de Características (Feature Engineering)</h3>
      <ul>
        <li><strong>HDD y CDD:</strong> Heating Degree Days y Cooling Degree Days. Estimación de demanda de climatización basada en 18ºC.</li>
        <li><strong>Amplitud Térmica Diaria:</strong> Diferencia entre temperatura máxima y mínima en cada estación y día.</li>
        <li><strong>Precipitación Total Calculada:</strong> Suma robusta de los 4 tramos de 6 horas de lluvias de AEMET.</li>
      </ul>

      <h2>FASE VI: Despliegue</h2>
      <p><strong>Deployment – Persistencia en HDFS, automatización AWS y dashboard interactivo</strong></p>
      
      <h3>6.1 Automatización de la Ingesta – AWS Lambda + S3</h3>
      <p>Se implementaron dos funciones AWS Lambda que automatizan la actualización diaria del histórico de datos de generación eléctrica. La <strong>Lambda 1</strong> realiza una petición a ESIOS cada día. La <strong>Lambda 2</strong> detecta el nuevo archivo en S3 y fusiona los datos actualizando el histórico.</p>

      <h3>6.2 Persistencia en Hadoop HDFS</h3>
      <p>Los tres niveles de transformación se persisten en rutas diferenciadas dentro del cluster Hadoop local (datalake/plata y datalake/oro). La conexión a HDFS se realiza mediante WebHDFS.</p>

      <h3>6.3 Dashboard Interactivo HTML</h3>
      <p>El entregable final es un dashboard HTML autocontenido generado mediante Python que embebe el dataset Gold serializado. Toda la lógica de filtrado y renderizado se ejecuta en el cliente mediante Plotly.js, permitiendo filtros interactivos por provincia, fecha, tipo de día y fuente de energía, sin necesidad de servidor backend.</p>

      <h2>Conclusiones</h2>
      <ul>
        <li>Implementación completa de un pipeline ETL Medallion sobre Hadoop HDFS.</li>
        <li>Integración exitosa de fuentes heterogéneas en un dataset de ~103.000 registros.</li>
        <li>Automatización Event-driven serverless en AWS (S3 + Lambda).</li>
        <li>Creación de características clave del dominio (HDD, CDD).</li>
        <li>Entrega de un dashboard analítico portátil e independiente de plataforma.</li>
      </ul>
      <p style={{fontStyle: 'italic', color: 'var(--text-tertiary)', marginTop: 'var(--space-xl)'}}>"Los datos son el nuevo petróleo, pero como el petróleo, en bruto son poco útiles. La ingeniería de datos — limpiarlos, transformarlos e integrarlos — es lo que los convierte en valor real." — Clive Humby (adaptado)</p>
    </div>
  );
}
