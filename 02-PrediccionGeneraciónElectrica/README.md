<div align="center">
  <img src="https://img.icons8.com/color/96/000000/electrical.png" alt="Energy Icon">
  <h1>Predicción de Generación y Demanda Eléctrica</h1>
  <p><i>Pipeline de datos estructurado en Arquitectura Medallón para el procesamiento y análisis de datos energéticos y meteorológicos.</i></p>

  <a href="https://www.python.org"><img src="https://img.shields.io/badge/Python-3.11-3776AB.svg?style=flat&logo=python&logoColor=white" alt="Python"></a>
  <a href="https://jupyter.org/"><img src="https://img.shields.io/badge/Jupyter-Notebook-F37626.svg?style=flat&logo=jupyter&logoColor=white" alt="Jupyter"></a>
  <a href="https://pandas.pydata.org/"><img src="https://img.shields.io/badge/Pandas-Data_Analysis-150458.svg?style=flat&logo=pandas&logoColor=white" alt="Pandas"></a>
  <a href="https://www.docker.com"><img src="https://img.shields.io/badge/Docker-Ready-2496ED.svg?style=flat&logo=docker&logoColor=white" alt="Docker"></a>
</div>

---

> 🎓 **Contexto Académico y Desarrollo Continuo**
> 
> Este repositorio nace originalmente como **Proyecto Final para los módulos de Big Data** de la Especialización en Inteligencia Artificial y Big Data. La infraestructura de Ingeniería de Datos (Arquitectura Medallón) y el procesamiento ETL cumplen con los requisitos académicos exigidos.
> 
> No obstante, como iniciativa personal para llevar el proyecto al siguiente nivel, **estoy desarrollando por mi cuenta toda la capa predictiva de Machine Learning**. Esta fase de modelado predictivo no era un requisito del curso, pero se encuentra actualmente en pleno desarrollo y será publicada muy pronto en este mismo repositorio.

---

## 📑 Memoria Oficial del Proyecto
Para una lectura detallada, analítica de negocio y justificaciones técnicas mucho más exhaustivas, te invito a leer el documento oficial del proyecto en formato PDF:

👉 **[Abrir Memoria del Proyecto (Memoria.pdf)](./Memoria.pdf)**

---

## 📊 Metodología CRISP-DM

El desarrollo de este proyecto se ha estructurado siguiendo el estándar de la industria **CRISP-DM** (Cross-Industry Standard Process for Data Mining).

### 1. Business Understanding (Comprensión del Negocio)
El sector energético moderno depende enormemente de la capacidad de prever la demanda y la generación (especialmente de fuentes renovables que dependen del clima). El objetivo de este proyecto es construir un ecosistema de datos capaz de unificar registros históricos de generación eléctrica con variables meteorológicas, para finalmente permitir el despliegue de un modelo que anticipe los picos de demanda.

### 2. Data Understanding (Comprensión de los Datos)
Las fuentes de datos provienen de servicios oficiales e históricos estructurados:
- **Datos de Red Eléctrica (ESIOS):** Históricos de generación por tipo de tecnología, demanda y precios.
- **Datos Meteorológicos (AEMET):** Temperaturas, precipitaciones y radiación solar, vitales para entender la generación fotovoltaica e hidráulica.
- **Calendario Laboral/Festivos:** Variables categóricas que impactan drásticamente en los patrones de consumo humano e industrial.

> 📚 *Puedes consultar el detalle exacto de cada variable en el **[Diccionario de datos.pdf](./Diccionario%20de%20datos.pdf)***.

### 3. Data Preparation (Preparación de los Datos) - *Arquitectura Medallón*
El tratamiento de datos se ha orquestado simulando una **Arquitectura Medallón** (Data Lakehouse) para garantizar la escalabilidad y calidad de los datos:
1. **🥉 Capa Bronce (`bronce/`):** Ingesta de los datos crudos (Raw Data) tal como vienen de las fuentes originales (APIs, web scraping o buckets de AWS). Contiene notebooks como `obtencionCSVs.ipynb` y `aws.ipynb`.
2. **🥈 Capa Plata (`plata/`):** Proceso de limpieza, filtrado, manejo de nulos y transformación de formatos. Aquí se estructuran los datos de AEMET y ESIOS en un formato tabular consolidado y fiable.
3. **🥇 Capa Oro (`oro/`):** Agrupación y cruce final de tablas. El resultado son bases de datos enriquecidas, listas para alimentar a los Dashboards de Business Intelligence y a los modelos de Machine Learning.

### 4. Modeling (Modelado)
*🏗️ Fase actualmente en desarrollo.* Se están probando algoritmos de predicción de series temporales (como ARIMA, Prophet y arquitecturas LSTM) para predecir la demanda a 24-48 horas vista.

### 5. Evaluation (Evaluación)
*🏗️ Fase actualmente en desarrollo.* Se definirán métricas como RMSE y MAE para validar la precisión predictiva contra un conjunto de datos de validación (Holdout).

### 6. Deployment (Despliegue y Dashboarding)
Actualmente, el proyecto cuenta con el despliegue de la infraestructura de datos y un **Dashboard Interactivo** programado en Python (disponible en la capa Oro) que lee la tabla consolidada final y permite a los analistas de negocio explorar visualmente los patrones de generación y meteorología sin escribir código.

El entorno está completamente **Dockerizado**, lo que permite levantar los cuadernos de Jupyter y los servicios asociados (Hadoop/Spark simulados) de forma aislada.

---

## 🛠️ Guía de Uso y Estructura Técnica

Si deseas ejecutar este pipeline en tu propia máquina (levantando el entorno Dockerizado con los Notebooks de Jupyter y el Dashboard), puedes seguir las instrucciones técnicas detalladas:

👉 **[Ver GUÍA DE INSTALACIÓN Y EJECUCIÓN (SETUP.md)](./docs/SETUP.md)**
