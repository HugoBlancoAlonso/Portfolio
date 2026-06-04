import React from 'react';

export default function DiccionarioDocument() {
  return (
    <div className="document-page">
      <div className="doc-header-banner">
        <h1 style={{color: 'var(--color-accent)'}}>DICCIONARIO DE DATOS TÉCNICO</h1>
        <h2 style={{borderBottom: 'none', marginTop: 'var(--space-sm)'}}>Documentación de Entidades y Campos Finales • Capa Gold</h2>
      </div>

      <div className="doc-meta-info">
        <div><strong>Proyecto:</strong> Datalake Climatológico y Energético</div>
        <div><strong>Capa de Datalake:</strong> Gold (Capas de Valor)</div>
        <div><strong>Formato de Almacenamiento:</strong> Apache Parquet (Comprimido columnar)</div>
        <div><strong>Ruta HDFS Destino:</strong> /datalake/oro/datos_consolidados/</div>
        <div><strong>Codificación Estándar:</strong> UTF-8 / Numérica Binaria</div>
        <div><strong>Dataset Corporativo:</strong> datos_consolidados.parquet</div>
      </div>

      <h2>1. Introducción y Propósito de la Capa Gold</h2>
      <p>Este documento sirve como especificación técnica formal del dataset consolidado y refinado en la capa de producción de mayor valor corporativo (Capa Gold). Este conjunto de datos integra métricas climatológicas procedentes de la AEMET, métricas de generación del operador del sistema eléctrico (ESIOS - Red Eléctrica) y datos calendarizados estructurados. El objetivo principal es suministrar un recurso de datos 100% depurado, vectorizado e indexado temporalmente para el entrenamiento inmediato de modelos predictivos y el aprovisionamiento de cuadros de mando empresariales.</p>

      <h2>2. Estructura y Metadata de las Columnas</h2>
      <p>A continuación se detallan todas las variables disponibles en el recurso, especificando su tipo lógico, formato físico, descripciones y las reglas de negocio aplicadas durante el pipeline de ingeniería de atributos (feature engineering).</p>

      <div className="doc-table-wrapper">
        <table className="doc-table">
          <thead>
            <tr>
              <th>Nombre del Campo</th>
              <th>Tipo de Dato</th>
              <th>Descripción Lógica y Reglas de Negocio</th>
              <th>Ejemplo / Rango</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>fecha</strong></td>
              <td>DATE / STR</td>
              <td>Clave temporal primaria de la unión. Homogeneizada estrictamente al estándar YYYY-MM-DD para garantizar indexaciones eficientes.</td>
              <td>2026-03-01</td>
            </tr>
            <tr>
              <td><strong>Estación</strong></td>
              <td>STRING</td>
              <td>Nombre oficial de la estación meteorológica de la AEMET encargada de la lectura física. Alta cardinalidad.</td>
              <td>"Reus Aeropuerto"</td>
            </tr>
            <tr>
              <td><strong>Provincia</strong></td>
              <td>STRING</td>
              <td>Provincia política del territorio español asociada geográficamente a la estación meteorológica.</td>
              <td>"Tarragona"</td>
            </tr>
            <tr>
              <td><strong>Temperatura máxima (ºC)</strong></td>
              <td>FLOAT64</td>
              <td>Temperatura más alta registrada en la estación durante el día. Limpiada contra valores erráticos y normalizada con puntos decimales.</td>
              <td>17.3</td>
            </tr>
            <tr>
              <td><strong>Temperatura mínima (ºC)</strong></td>
              <td>FLOAT64</td>
              <td>Temperatura más baja registrada en la estación durante el ciclo de 24 horas.</td>
              <td>8.7</td>
            </tr>
            <tr>
              <td><strong>Temperatura media (ºC)</strong></td>
              <td>FLOAT64</td>
              <td>Media matemática del día calculada de forma continua. Variable predictora base para demandas energéticas.</td>
              <td>13.0</td>
            </tr>
            <tr>
              <td><strong>Racha (km/h)</strong></td>
              <td>FLOAT64</td>
              <td>Velocidad máxima instantánea del viento. Corregida mediante una transformación logarítmica (np.log1p) para mitigar la varianza extrema de outliers climáticos.</td>
              <td>1.4149 (Transformado)</td>
            </tr>
            <tr>
              <td><strong>Velocidad máxima (km/h)</strong></td>
              <td>FLOAT64</td>
              <td>Velocidad media máxima sostenida del viento registrada durante un intervalo del día.</td>
              <td>1.2304</td>
            </tr>
            <tr>
              <td><strong>Precipitación 00-24h (mm)</strong></td>
              <td>FLOAT64</td>
              <td>Acumulado total oficial de lluvia registrada en la estación meteorológica durante todo el día natural.</td>
              <td>0.2</td>
            </tr>
            <tr>
              <td><strong>valor</strong></td>
              <td>FLOAT64</td>
              <td>Generación neta de energía introducida al sistema eléctrico nacional medida en MWh, parseada dinámicamente de la API v2 de ESIOS.</td>
              <td>228914.087</td>
            </tr>
            <tr>
              <td><strong>porcentaje</strong></td>
              <td>FLOAT64</td>
              <td>Representación porcentual que ocupa el tipo de energía sobre el mix de generación total del día. Redondeado a 1 decimal.</td>
              <td>45.3</td>
            </tr>
            <tr>
              <td><strong>HDD</strong></td>
              <td>FLOAT64 (NEW)</td>
              <td>Heating Degree Days. Grados-día de calefacción estimados para empresas energéticas. Calculado de forma vectorizada como max(0, 18 - T_media).</td>
              <td>5.0 (0.0 si T ≥ 18)</td>
            </tr>
            <tr>
              <td><strong>CDD</strong></td>
              <td>FLOAT64 (NEW)</td>
              <td>Cooling Degree Days. Grados-día de refrigeración / demanda de aire acondicionado. Calculado como max(0, T_media - 18).</td>
              <td>0.0 (&gt;0 si T &gt; 18)</td>
            </tr>
            <tr>
              <td><strong>Amplitud_Termica</strong></td>
              <td>FLOAT64 (NEW)</td>
              <td>Métrica de oscilación térmica diaria de utilidad para logística. Diferencia lineal entre T_max - T_min.</td>
              <td>8.6</td>
            </tr>
            <tr>
              <td><strong>Precipitacion_Total_Calculada</strong></td>
              <td>FLOAT64 (NEW)</td>
              <td>Suma de control de precipitaciones calculada agregando de forma robusta las 4 variables horarias sub-diarias (00-06h, 06-12h, 12-18h, 18-24h).</td>
              <td>0.2</td>
            </tr>
            <tr>
              <td><strong>tipo_dia_encoded</strong></td>
              <td>INT32 (NEW)</td>
              <td>Codificación determinista e invariable de tres estados para la naturaleza comercial del día: 0: Fin de semana, 1: Laborable, 2: Festivo Nacional/ Autonómico. Blindado ante nulos con valor -1.</td>
              <td>0, 1, 2</td>
            </tr>
            <tr>
              <td><strong>tipo de energia_Hidráulica</strong></td>
              <td>INT (DUMMY)</td>
              <td>Variable binaria generada por One-Hot Encoding. Indica con un 1 si el registro asocia la métrica a la generación hidroeléctrica, y 0 en caso contrario.</td>
              <td>0 o 1</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{background: 'rgba(255, 171, 0, 0.1)', borderLeft: '4px solid #ffab00', padding: 'var(--space-md)', marginTop: 'var(--space-xl)', borderRadius: '0 var(--radius-md) var(--radius-md) 0'}}>
        <h4 style={{marginTop: 0, color: 'var(--text-primary)'}}>Nota de Ingeniería de Software & Gobierno de Datos</h4>
        <p style={{margin: 0, fontSize: 'var(--text-sm)', color: 'var(--text-secondary)'}}>Para garantizar la robustez analítica a largo plazo, el campo <code>tipo_dia_encoded</code> ha sido mapeado explícitamente mediante diccionarios estáticos estructurados en el script del pipeline. Esto evita la re-indexación aleatoria propia de los métodos dinámicos de ordenación de categorías y asegura que el valor numérico 2 quede blindado de manera permanente para representar días Festivos, independientemente de si el lote de datos ingerido de forma mensual contiene o carece de días feriados.</p>
      </div>
    </div>
  );
}
