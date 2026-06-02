<div align="center">
  <img src="https://img.icons8.com/color/96/000000/contract.png" alt="Contract Icon">
  <h1>Analizador Inteligente de Contratos con NLP</h1>
  <p><i>Un sistema automatizado para detectar cláusulas abusivas usando Inteligencia Artificial, Bases de Datos Vectoriales y Arquitectura de Microservicios.</i></p>

  <a href="https://www.python.org"><img src="https://img.shields.io/badge/Python-3.11-3776AB.svg?style=flat&logo=python&logoColor=white" alt="Python"></a>
  <a href="https://fastapi.tiangolo.com"><img src="https://img.shields.io/badge/FastAPI-0.136-009688.svg?style=flat&logo=fastapi&logoColor=white" alt="FastAPI"></a>
  <a href="https://streamlit.io"><img src="https://img.shields.io/badge/Streamlit-1.58-FF4B4B.svg?style=flat&logo=streamlit&logoColor=white" alt="Streamlit"></a>
  <a href="https://www.trychroma.com"><img src="https://img.shields.io/badge/Chroma-Vector_DB-FF8E00.svg?style=flat" alt="ChromaDB"></a>
  <a href="https://www.docker.com"><img src="https://img.shields.io/badge/Docker-Ready-2496ED.svg?style=flat&logo=docker&logoColor=white" alt="Docker"></a>
</div>

---

## 📊 Metodología CRISP-DM

El desarrollo de este proyecto se ha estructurado siguiendo el estándar de la industria para proyectos de Data Science e Inteligencia Artificial: la metodología **CRISP-DM** (Cross-Industry Standard Process for Data Mining).

### 1. Business Understanding (Comprensión del Negocio)
**El Problema:** El análisis manual de contratos legales es lento, repetitivo y propenso a errores humanos. Muchos arrendatarios firman documentos que incluyen cláusulas abusivas o nulas por simple desconocimiento de la Ley de Arrendamientos Urbanos (LAU).  
**La Solución:** Crear un "abogado virtual" automatizado capaz de leer un contrato en formato PDF, despiezarlo y predecir la legalidad de cada cláusula en segundos. Esto aporta agilidad a despachos de abogados y seguridad a usuarios particulares. Adicionalmente, el sistema incluye un generador de contratos seguros desde cero.

### 2. Data Understanding (Comprensión de los Datos)
El sistema maneja dos fuentes principales de datos no estructurados:
- **Contratos Raw (PDFs):** Archivos subidos por los usuarios que contienen el texto legal crudo, a menudo con formatos complejos, tablas, saltos de página y superíndices.
- **Base de Conocimiento Legal (JSON/ChromaDB):** Un diccionario experto que contiene patrones de cláusulas legales y abusivas junto con su justificación legal, el cual actúa como la "verdad base" (Ground Truth) para el modelo.

### 3. Data Preparation (Preparación de los Datos)
Esta fase es crítica en NLP. El motor de procesamiento (*Pipeline*):
1. **Extracción (PyMuPDF):** Lee el PDF y filtra por tamaño de fuente dominante para descartar notas a pie de página irrelevantes o números de página.
2. **Limpieza Regex:** Elimina espacios duplicados, saltos de línea erróneos y normaliza el texto.
3. **Segmentación:** Utiliza patrones de expresiones regulares avanzadas (Ej: *"Primera.", "Décimo segunda."*) para trocear el documento masivo en cláusulas individuales y manejables.

### 4. Modeling (Modelado)
En lugar de entrenar un modelo tradicional de clasificación desde cero (lo cual requeriría miles de contratos etiquetados), se ha optado por un enfoque moderno de **Búsqueda Semántica**:
- **Embeddings:** Cada cláusula extraída se transforma en un vector matemático utilizando el modelo `paraphrase-multilingual-MiniLM-L12-v2` (`sentence-transformers`).
- **Búsqueda Vectorial:** El vector resultante se consulta contra una Base de Datos Vectorial especializada (**ChromaDB**), la cual calcula la distancia coseno (similitud) con las cláusulas de referencia almacenadas.

### 5. Evaluation (Evaluación)
El sistema toma decisiones basadas en el umbral de similitud geométrica (*Confidence Score*):
- **Umbral Abusivo (>80% similitud):** Si coincide altamente con una cláusula nula conocida, se levanta una alerta ⚠️ y se extrae la justificación legal de la base de datos.
- **Umbral Legal (>50% similitud):** Se clasifica como legal ✅ si encaja con patrones permitidos por la ley.
- **Umbral de Revisión:** Si el modelo no tiene la certeza estadística suficiente, marca la cláusula para una revisión humana 🔍.

### 6. Deployment (Despliegue y Arquitectura)
El paso final es poner la inteligencia a disposición del usuario de forma robusta y escalable. Para ello, se ha diseñado una arquitectura de microservicios:
- **Backend Inteligente:** Una API REST asíncrona desarrollada en **FastAPI** que encapsula todo el pipeline de Data Preparation y Modeling.
- **Frontend Interactivo:** Una interfaz de usuario limpia construida con **Streamlit**, que actúa como cliente ciego (Client-Side) realizando peticiones HTTP.
- **Contenerización:** Todo el entorno está empaquetado y orquestado mediante **Docker** (`docker-compose`), permitiendo su ejecución en cualquier servidor en la nube con un solo comando.

### 🔄 Mantenimiento y Mejora Continua
Este proyecto está diseñado para evolucionar. El mantenimiento del modelo no requiere reentrenar redes neuronales complejas; basta con **actualizar progresivamente el archivo JSON** de referencia (`clausulas.json`) añadiendo nuevos ejemplos de jurisprudencia o nuevas trampas legales. Automáticamente, ChromaDB indexará estas nuevas cláusulas, haciendo que el sistema sea más inteligente y preciso en sus detecciones con el paso del tiempo.

---

## 🛠️ Guía de Uso y Estructura Técnica

Si quieres levantar el proyecto en tu máquina para probarlo, he preparado un documento técnico detallado que explica la estructura de carpetas y los comandos exactos para iniciarlo.

👉 **[Haz clic aquí para ver la GUÍA DE INSTALACIÓN Y ESTRUCTURA (SETUP.md)](./docs/SETUP.md)**