export const projectDetails = {
  es: {
    'doom-ue5': {
      title: 'Remasterización de DOOM (1993) en Unreal Engine 5',
      subtitle: 'Recreación técnica y visual de los dos primeros niveles del clásico shooter en primera persona utilizando las últimas tecnologías de desarrollo de videojuegos.',
      badges: ['Unreal Engine 5', 'Blueprints', 'Level Design', 'Game AI'],
      githubUrl: 'https://github.com/HugoBlancoAlonso/Portfolio/tree/main/00-RemasterDoomUR5',
      sections: [
        {
          title: '🎮 Sobre el Proyecto',
          content: 'Este proyecto nació con el objetivo de estudiar a fondo los fundamentos del **Game Design** y la **Programación Gameplay** en motores modernos. Para ello, me propuse el ambicioso reto de recrear con la mayor fidelidad posible los dos primeros niveles del mítico **DOOM (1993)**, trasladando un juego clásico basado en sprites 2D a un entorno completamente 3D en **Unreal Engine 5**.\n\nEl desarrollo se enfocó no solo en replicar la arquitectura de los niveles, sino en reprogramar desde cero las físicas del jugador, la balística de las armas, los sistemas de recolección de objetos y la Inteligencia Artificial (IA) de los enemigos utilizando NavMesh y Behavior Trees.',
        },
        {
          title: '📽️ Diario de Desarrollo (Videoblog)',
          content: 'A lo largo del proyecto, he ido documentando mi progreso en **6 fases de desarrollo** en formato vídeo. A continuación puedes ver la evolución gráfica y técnica del juego.',
        },
      ],
      phases: [
        {
          title: '🏗️ Fase 1: Blockout y Estructura Base',
          description: 'En esta fase inicial, el objetivo fue importar los planos originales del nivel E1M1 de DOOM y construir toda la geometría básica (Blockout). Aquí se definen las proporciones, pasillos y salas clave sin texturas para asegurar que el flujo del nivel se siente correcto.',
          youtubeId: 'gsX6vk6bzFo',
        },
        {
          title: '🏃‍♂️ Fase 2: Controlador del Personaje y Movimiento',
          description: 'Desarrollo del Character Controller. Se implementó la cámara en primera persona y se ajustaron las físicas de movimiento (velocidad, inercia) para emular la agilidad frenética tan característica del Doom original.',
          youtubeId: '66SVgaC9y_o',
        },
        {
          title: '🔫 Fase 3: Mecánicas de Disparo y Armas',
          description: 'Programación de la lógica de armamento mediante Blueprints. Se añadieron las armas icónicas, sistemas de Raycasting (Hitscan) e instanciación de proyectiles para simular el daño. También se añadieron los primeros efectos de partículas y sonido de los disparos.',
          youtubeId: '5ZjQVXDtT5o',
        },
        {
          title: '🤖 Fase 4: Inteligencia Artificial (Enemigos)',
          description: 'Una de las partes más complejas. Se implementó el NavMesh para que los enemigos pudieran moverse por el mapa esquivando obstáculos. Mediante Behavior Trees y Blackboards, se dotó a los monstruos de rutinas de patrullaje, detección del jugador (visión) y persecución/ataque.',
          youtubeId: 'cyKU1-NJMzQ',
        },
        {
          title: '🎒 Fase 5: Pickups, Interfaz y Lógica de Puertas',
          description: 'Se integró todo el sistema interactivo del escenario. Esto incluye la recogida de botiquines (Health), escudos (Armor) y munición. También se programaron los sistemas de puertas que requieren llaves de colores (Keycards) y la Interfaz de Usuario (HUD).',
          youtubeId: 'x8I2urG0LDQ',
        },
        {
          title: '✨ Fase 6: Pulido, Iluminación y Gameplay Final',
          description: 'La fase de texturizado e iluminación. Se aplicaron materiales fieles a la obra original, se ajustaron las luces puntuales para dar esa atmósfera oscura de terror, y se pulieron todos los bugs para conseguir un gameplay loop fluido y divertido, uniendo el nivel 1 con el nivel 2.',
          youtubeId: '2eew1G4ZhQQ',
        },
      ],
      note: '💡 **Nota:** Todos los assets 3D, texturas y sonidos pertenecen a *id Software*. Este proyecto fue creado con fines puramente académicos y de aprendizaje, y no tiene ningún fin comercial.',
      documents: [],
    },
    'contract-analyzer': {
      title: 'Analizador Inteligente de Contratos con NLP',
      subtitle: 'Un sistema automatizado para detectar cláusulas abusivas usando Inteligencia Artificial, Bases de Datos Vectoriales y Arquitectura de Microservicios.',
      badges: ['Python', 'FastAPI', 'Streamlit', 'ChromaDB', 'NLP', 'Docker'],
      githubUrl: 'https://github.com/HugoBlancoAlonso/Portfolio/tree/main/01-AnalizadorContratos',
      sections: [
        {
          title: '📊 Metodología CRISP-DM',
          content: 'El desarrollo de este proyecto se ha estructurado siguiendo el estándar de la industria para proyectos de Data Science e Inteligencia Artificial: la metodología **CRISP-DM** (Cross-Industry Standard Process for Data Mining).',
        },
        {
          title: '1. Business Understanding',
          content: '**El Problema:** El análisis manual de contratos legales es lento, repetitivo y propenso a errores humanos. Muchos arrendatarios firman documentos que incluyen cláusulas abusivas o nulas por simple desconocimiento de la Ley de Arrendamientos Urbanos (LAU).\n\n**La Solución:** Crear un "abogado virtual" automatizado capaz de leer un contrato en formato PDF, despiezarlo y predecir la legalidad de cada cláusula en segundos.',
        },
        {
          title: '2. Data Understanding',
          content: 'El sistema maneja dos fuentes principales de datos no estructurados:\n\n• **Contratos Raw (PDFs):** Archivos subidos por los usuarios que contienen el texto legal crudo.\n• **Base de Conocimiento Legal (JSON/ChromaDB):** Un diccionario experto que contiene patrones de cláusulas legales y abusivas.',
        },
        {
          title: '3. Data Preparation',
          content: 'Esta fase es crítica en NLP. El motor de procesamiento:\n\n1. **Extracción (PyMuPDF):** Lee el PDF y filtra por tamaño de fuente dominante.\n2. **Limpieza Regex:** Elimina espacios duplicados, saltos de línea erróneos y normaliza el texto.\n3. **Segmentación:** Utiliza patrones de expresiones regulares avanzadas para trocear el documento en cláusulas individuales.',
        },
        {
          title: '4. Modeling',
          content: 'Se ha optado por un enfoque moderno de **Búsqueda Semántica**:\n\n• **Embeddings:** Cada cláusula se transforma en un vector matemático utilizando el modelo `paraphrase-multilingual-MiniLM-L12-v2` (sentence-transformers).\n• **Búsqueda Vectorial:** El vector se consulta contra **ChromaDB**, la cual calcula la distancia coseno (similitud) con las cláusulas de referencia.',
        },
        {
          title: '5. Evaluation',
          content: 'El sistema toma decisiones basadas en el umbral de similitud geométrica:\n\n• **Umbral Abusivo (>80% similitud):** Alerta ⚠️ con justificación legal.\n• **Umbral Legal (>50% similitud):** Se clasifica como legal ✅.\n• **Umbral de Revisión:** Se marca para revisión humana 🔍.',
        },
        {
          title: '6. Deployment',
          content: 'Arquitectura de microservicios:\n\n• **Backend:** API REST asíncrona en **FastAPI**.\n• **Frontend:** Interfaz con **Streamlit**.\n• **Contenerización:** Todo orquestado mediante **Docker** (`docker-compose`).',
        },
        {
          title: '🔄 Mantenimiento y Mejora Continua',
          content: 'El mantenimiento del modelo no requiere reentrenar redes neuronales complejas; basta con actualizar progresivamente el archivo JSON de referencia (`clausulas.json`). Automáticamente, ChromaDB indexará estas nuevas cláusulas.',
        },
      ],
      phases: [],
      note: '',
      documents: [],
      setup: {
        title: '🛠️ Guía de Uso y Estructura Técnica',
        description: 'Si quieres levantar el proyecto en tu máquina para probarlo, he preparado un documento técnico detallado.',
        structure: `01-AnalizadorContratos/
├── data/                       ← Datos del proyecto
│   ├── raw/                    ← PDFs originales
│   └── processed/              ← Archivos limpios, JSON y CSV
├── frontend/                   ← Interfaz (Streamlit)
│   ├── app.py                  ← Router principal
│   └── views/                  ← Pantallas
├── src/                        ← Backend (FastAPI)
│   ├── api/                    ← Endpoints REST
│   ├── analysis/               ← NLP y ChromaDB
│   └── pipeline/               ← Transformación de datos
├── tests/                      ← Pruebas unitarias
├── chroma_db/                  ← Base de datos vectorial
├── docker-compose.yml
├── Dockerfile
└── requirements.txt`,
        dockerCommand: 'docker compose up --build',
        accessUrl: 'http://localhost:8501',
      },
    },
    'energy-prediction': {
      title: 'Predicción de Generación y Demanda Eléctrica',
      subtitle: 'Pipeline de datos estructurado en Arquitectura Medallón para el procesamiento y análisis de datos energéticos y meteorológicos.',
      badges: ['Python', 'Pandas', 'Jupyter', 'Docker', 'Machine Learning'],
      githubUrl: 'https://github.com/HugoBlancoAlonso/Portfolio/tree/main/02-PrediccionGeneraci%C3%B3nElectrica',
      sections: [
        {
          title: '🎓 Contexto Académico',
          content: 'Este repositorio nace originalmente como **Proyecto Final para los módulos de Big Data** de la Especialización en Inteligencia Artificial y Big Data. La infraestructura de Ingeniería de Datos (Arquitectura Medallón) y el procesamiento ETL cumplen con los requisitos académicos exigidos.\n\nComo iniciativa personal, **estoy desarrollando por mi cuenta toda la capa predictiva de Machine Learning**. Esta fase de modelado predictivo no era un requisito del curso.',
        },
        {
          title: '📊 Metodología CRISP-DM',
          content: 'El desarrollo sigue el estándar de la industria **CRISP-DM** (Cross-Industry Standard Process for Data Mining).',
        },
        {
          title: '1. Business Understanding',
          content: 'El sector energético moderno depende enormemente de la capacidad de prever la demanda y la generación. El objetivo es construir un ecosistema de datos capaz de unificar registros históricos de generación eléctrica con variables meteorológicas.',
        },
        {
          title: '2. Data Understanding',
          content: 'Las fuentes de datos:\n\n• **Datos de Red Eléctrica (ESIOS):** Históricos de generación por tipo de tecnología, demanda y precios.\n• **Datos Meteorológicos (AEMET):** Temperaturas, precipitaciones y radiación solar.\n• **Calendario Laboral/Festivos:** Variables categóricas que impactan en los patrones de consumo.',
        },
        {
          title: '3. Data Preparation — Arquitectura Medallón',
          content: 'El tratamiento de datos se ha orquestado simulando una **Arquitectura Medallón** (Data Lakehouse):\n\n1. 🥉 **Capa Bronce:** Ingesta de los datos crudos (Raw Data) tal como vienen de las fuentes originales.\n2. 🥈 **Capa Plata:** Proceso de limpieza, filtrado, manejo de nulos y transformación de formatos.\n3. 🥇 **Capa Oro:** Agrupación y cruce final. Datos enriquecidos listos para Dashboards y ML.',
        },
        {
          title: '4. Modeling',
          content: '🏗️ **Fase actualmente en desarrollo.** Se están probando algoritmos de predicción de series temporales (como ARIMA, Prophet y arquitecturas LSTM) para predecir la demanda a 24-48 horas vista.',
        },
        {
          title: '5. Evaluation',
          content: '🏗️ **Fase actualmente en desarrollo.** Se definirán métricas como RMSE y MAE para validar la precisión predictiva.',
        },
        {
          title: '6. Deployment y Dashboarding',
          content: 'El proyecto cuenta con un **Dashboard Interactivo** programado en Python que permite a los analistas explorar visualmente los patrones de generación y meteorología. El entorno está completamente **Dockerizado**.',
        },
      ],
      phases: [],
      note: '',
      documents: [
        {
          title: '📄 Memoria del Proyecto',
          description: 'Documento oficial con análisis de negocio y justificaciones técnicas exhaustivas.',
          url: '/docs/Memoria.pdf',
          icon: '📑',
        },
        {
          title: '💾 Diccionario de Datos',
          description: 'Definición formal de la estructura de la base de datos y modelo Entidad-Relación.',
          url: '/docs/Diccionario_de_datos.pdf',
          icon: '🗂️',
        },
      ],
      setup: {
        title: '🛠️ Guía de Uso',
        description: 'Si deseas ejecutar este pipeline en tu propia máquina.',
        structure: `02-PrediccionGeneracionElectrica/
├── bronce/                     ← Datos crudos (Raw Data)
│   └── obtencionCSVs.ipynb     ← Ingesta de datos
├── plata/                      ← Datos limpios
│   └── extraccion.ipynb        ← ETL y limpieza
├── oro/                        ← Datos enriquecidos
│   ├── combinacion.ipynb       ← Consolidación final
│   ├── dashboard_*.py          ← Dashboard interactivo
│   └── data/                   ← Datos finales y HTML
├── docker-compose.yml          ← HDFS + servicios
├── hadoop.env
└── requirements.txt`,
        dockerCommand: 'docker compose up -d',
        accessUrl: 'http://localhost:9870',
      },
    },
    'social-app': {
      title: 'Red Social — Aplicación Móvil Full-Stack',
      subtitle: 'Aplicación móvil de red social construida con React Native (Expo) y FastAPI (Python).',
      badges: ['React Native', 'Expo', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'JWT', 'TypeScript'],
      githubUrl: '',
      sections: [
        {
          title: '🏗️ Arquitectura',
          content: 'Aplicación full-stack con frontend móvil en **React Native + Expo** (TypeScript) y backend API en **FastAPI** (Python). Base de datos **PostgreSQL 16** con ORM **SQLAlchemy 2.0** y migraciones **Alembic**.',
        },
        {
          title: '🔐 Autenticación',
          content: 'Sistema de autenticación completo con:\n\n• **JWT** (JSON Web Tokens) con tokens de acceso y refresh.\n• **Google OAuth** para login con cuenta de Google.\n• **Apple Sign-In** para usuarios de iOS.',
        },
        {
          title: '📱 Funcionalidades',
          content: '• Sistema de publicaciones (crear, editar, eliminar)\n• Feed cronológico personalizado\n• Sistema de likes y comentarios\n• Seguimiento de usuarios (follow/unfollow)\n• Notificaciones en tiempo real\n• Perfiles de usuario con avatar\n• Upload de imágenes',
        },
      ],
      phases: [],
      note: '',
      documents: [],
    },
  },
  en: {
    'doom-ue5': {
      title: 'DOOM (1993) Remaster in Unreal Engine 5',
      subtitle: 'Technical and visual recreation of the first two levels of the classic first-person shooter using the latest game development technologies.',
      badges: ['Unreal Engine 5', 'Blueprints', 'Level Design', 'Game AI'],
      githubUrl: 'https://github.com/HugoBlancoAlonso/Portfolio/tree/main/00-RemasterDoomUR5',
      sections: [
        {
          title: '🎮 About the Project',
          content: 'This project was born with the goal of studying in depth the fundamentals of **Game Design** and **Gameplay Programming** in modern engines. I set myself the ambitious challenge of recreating as faithfully as possible the first two levels of the iconic **DOOM (1993)**, translating a classic sprite-based 2D game into a fully 3D environment in **Unreal Engine 5**.\n\nThe development focused not only on replicating the level architecture, but on reprogramming from scratch the player physics, weapon ballistics, item collection systems, and enemy Artificial Intelligence (AI) using NavMesh and Behavior Trees.',
        },
        {
          title: '📽️ Development Diary (Videoblog)',
          content: 'Throughout the project, I documented my progress in **6 development phases** in video format. Below you can see the graphic and technical evolution of the game.',
        },
      ],
      phases: [
        {
          title: '🏗️ Phase 1: Blockout & Base Structure',
          description: 'In this initial phase, the goal was to import the original E1M1 level plans from DOOM and build all the basic geometry (Blockout). Proportions, corridors, and key rooms are defined without textures to ensure the level flow feels right.',
          youtubeId: 'gsX6vk6bzFo',
        },
        {
          title: '🏃‍♂️ Phase 2: Character Controller & Movement',
          description: 'Development of the Character Controller. First-person camera was implemented and movement physics (speed, inertia) were adjusted to emulate the frenetic agility characteristic of the original Doom.',
          youtubeId: '66SVgaC9y_o',
        },
        {
          title: '🔫 Phase 3: Shooting Mechanics & Weapons',
          description: 'Weapon logic programming using Blueprints. Iconic weapons were added, along with Raycasting (Hitscan) systems and projectile instantiation to simulate damage. First particle effects and shooting sounds were also added.',
          youtubeId: '5ZjQVXDtT5o',
        },
        {
          title: '🤖 Phase 4: Artificial Intelligence (Enemies)',
          description: 'One of the most complex parts. NavMesh was implemented so enemies could navigate the map avoiding obstacles. Using Behavior Trees and Blackboards, monsters were given patrol routines, player detection (vision), and chase/attack behaviors.',
          youtubeId: 'cyKU1-NJMzQ',
        },
        {
          title: '🎒 Phase 5: Pickups, UI & Door Logic',
          description: 'All interactive scenario systems were integrated. This includes health, armor, and ammo pickups. Door systems requiring color-coded Keycards and the on-screen HUD were also programmed.',
          youtubeId: 'x8I2urG0LDQ',
        },
        {
          title: '✨ Phase 6: Polish, Lighting & Final Gameplay',
          description: 'The texturing and lighting phase. Materials faithful to the original work were applied, point lights were adjusted for that dark horror atmosphere, and all bugs were polished to achieve a smooth and fun gameplay loop, connecting level 1 with level 2.',
          youtubeId: '2eew1G4ZhQQ',
        },
      ],
      note: '💡 **Note:** All 3D assets, textures, and sounds belong to *id Software*. This project was created purely for academic and learning purposes, with no commercial intent.',
      documents: [],
    },
    'contract-analyzer': {
      title: 'Intelligent Contract Analyzer with NLP',
      subtitle: 'An automated system for detecting abusive clauses using AI, Vector Databases, and Microservices Architecture.',
      badges: ['Python', 'FastAPI', 'Streamlit', 'ChromaDB', 'NLP', 'Docker'],
      githubUrl: 'https://github.com/HugoBlancoAlonso/Portfolio/tree/main/01-AnalizadorContratos',
      sections: [
        {
          title: '📊 CRISP-DM Methodology',
          content: 'The development of this project has been structured following the industry standard for Data Science and AI projects: the **CRISP-DM** methodology (Cross-Industry Standard Process for Data Mining).',
        },
        {
          title: '1. Business Understanding',
          content: '**The Problem:** Manual analysis of legal contracts is slow, repetitive, and prone to human errors. Many tenants sign documents containing abusive or void clauses simply due to ignorance of the Urban Lease Law.\n\n**The Solution:** Create an automated "virtual lawyer" capable of reading a contract in PDF format, breaking it down, and predicting the legality of each clause in seconds.',
        },
        {
          title: '2. Data Understanding',
          content: 'The system handles two main sources of unstructured data:\n\n• **Raw Contracts (PDFs):** Files uploaded by users containing raw legal text.\n• **Legal Knowledge Base (JSON/ChromaDB):** An expert dictionary containing patterns of legal and abusive clauses.',
        },
        {
          title: '3. Data Preparation',
          content: 'This phase is critical in NLP. The processing pipeline:\n\n1. **Extraction (PyMuPDF):** Reads the PDF and filters by dominant font size.\n2. **Regex Cleaning:** Removes duplicate spaces, erroneous line breaks, and normalizes text.\n3. **Segmentation:** Uses advanced regex patterns to split the document into individual clauses.',
        },
        {
          title: '4. Modeling',
          content: 'A modern **Semantic Search** approach was chosen:\n\n• **Embeddings:** Each clause is transformed into a mathematical vector using the `paraphrase-multilingual-MiniLM-L12-v2` model (sentence-transformers).\n• **Vector Search:** The vector is queried against **ChromaDB**, which calculates cosine distance (similarity) with reference clauses.',
        },
        {
          title: '5. Evaluation',
          content: 'The system makes decisions based on geometric similarity threshold:\n\n• **Abusive Threshold (>80% similarity):** Alert ⚠️ with legal justification.\n• **Legal Threshold (>50% similarity):** Classified as legal ✅.\n• **Review Threshold:** Marked for human review 🔍.',
        },
        {
          title: '6. Deployment',
          content: 'Microservices architecture:\n\n• **Backend:** Async REST API in **FastAPI**.\n• **Frontend:** Interface with **Streamlit**.\n• **Containerization:** All orchestrated with **Docker** (`docker-compose`).',
        },
        {
          title: '🔄 Continuous Maintenance',
          content: 'Model maintenance does not require retraining complex neural networks; simply progressively update the reference JSON file (`clausulas.json`). ChromaDB will automatically index new clauses.',
        },
      ],
      phases: [],
      note: '',
      documents: [],
      setup: {
        title: '🛠️ Usage Guide & Technical Structure',
        description: 'If you want to run the project on your machine.',
        structure: `01-AnalizadorContratos/
├── data/                       ← Project data
│   ├── raw/                    ← Original PDFs
│   └── processed/              ← Clean files, JSON and CSV
├── frontend/                   ← UI (Streamlit)
│   ├── app.py                  ← Main router
│   └── views/                  ← Screens
├── src/                        ← Backend (FastAPI)
│   ├── api/                    ← REST endpoints
│   ├── analysis/               ← NLP and ChromaDB
│   └── pipeline/               ← Data transformation
├── tests/                      ← Unit tests
├── chroma_db/                  ← Vector database
├── docker-compose.yml
├── Dockerfile
└── requirements.txt`,
        dockerCommand: 'docker compose up --build',
        accessUrl: 'http://localhost:8501',
      },
    },
    'energy-prediction': {
      title: 'Electricity Generation & Demand Prediction',
      subtitle: 'Data pipeline structured in Medallion Architecture for processing and analyzing energy and meteorological data.',
      badges: ['Python', 'Pandas', 'Jupyter', 'Docker', 'Machine Learning'],
      githubUrl: 'https://github.com/HugoBlancoAlonso/Portfolio/tree/main/02-PrediccionGeneraci%C3%B3nElectrica',
      sections: [
        {
          title: '🎓 Academic Context',
          content: 'This repository was originally created as the **Final Project for the Big Data modules** of the AI and Big Data Specialization. The Data Engineering infrastructure (Medallion Architecture) and ETL processing meet the academic requirements.\n\nAs a personal initiative, **I am developing on my own the entire predictive Machine Learning layer**. This predictive modeling phase was not a course requirement.',
        },
        {
          title: '📊 CRISP-DM Methodology',
          content: 'The development follows the industry standard **CRISP-DM** (Cross-Industry Standard Process for Data Mining).',
        },
        {
          title: '1. Business Understanding',
          content: 'The modern energy sector depends heavily on the ability to predict demand and generation. The goal is to build a data ecosystem capable of unifying historical electricity generation records with meteorological variables.',
        },
        {
          title: '2. Data Understanding',
          content: 'Data sources:\n\n• **Grid Data (ESIOS):** Historical generation by technology type, demand, and prices.\n• **Meteorological Data (AEMET):** Temperatures, precipitation, and solar radiation.\n• **Work Calendar/Holidays:** Categorical variables that drastically impact consumption patterns.',
        },
        {
          title: '3. Data Preparation — Medallion Architecture',
          content: 'Data processing orchestrated simulating a **Medallion Architecture** (Data Lakehouse):\n\n1. 🥉 **Bronze Layer:** Raw data ingestion as it comes from original sources.\n2. 🥈 **Silver Layer:** Cleaning, filtering, null handling, and format transformation.\n3. 🥇 **Gold Layer:** Final grouping and cross-referencing. Enriched data ready for Dashboards and ML.',
        },
        {
          title: '4. Modeling',
          content: '🏗️ **Phase currently in development.** Time series prediction algorithms (such as ARIMA, Prophet, and LSTM architectures) are being tested to predict demand 24-48 hours ahead.',
        },
        {
          title: '5. Evaluation',
          content: '🏗️ **Phase currently in development.** Metrics such as RMSE and MAE will be defined to validate predictive accuracy.',
        },
        {
          title: '6. Deployment & Dashboarding',
          content: 'The project features an **Interactive Dashboard** programmed in Python that allows analysts to visually explore generation and meteorology patterns. The environment is fully **Dockerized**.',
        },
      ],
      phases: [],
      note: '',
      documents: [
        {
          title: '📄 Project Report',
          description: 'Official document with business analysis and exhaustive technical justifications.',
          url: '/docs/Memoria.pdf',
          icon: '📑',
        },
        {
          title: '📄 Data Dictionary',
          description: 'Exact detail of each variable used in the project.',
          url: '/docs/Diccionario_de_datos.pdf',
          icon: '📊',
        },
      ],
      setup: {
        title: '🛠️ Usage Guide',
        description: 'If you want to run this pipeline on your own machine.',
        structure: `02-PrediccionGeneracionElectrica/
├── bronce/                     ← Raw Data
│   └── obtencionCSVs.ipynb     ← Data ingestion
├── plata/                      ← Clean Data
│   └── extraccion.ipynb        ← ETL and cleaning
├── oro/                        ← Enriched Data
│   ├── combinacion.ipynb       ← Final consolidation
│   ├── dashboard_*.py          ← Interactive dashboard
│   └── data/                   ← Final data and HTML
├── docker-compose.yml          ← HDFS + services
├── hadoop.env
└── requirements.txt`,
        dockerCommand: 'docker compose up -d',
        accessUrl: 'http://localhost:9870',
      },
    },
    'social-app': {
      title: 'Social Network — Full-Stack Mobile App',
      subtitle: 'Full-stack social network mobile application built with React Native (Expo) and FastAPI (Python).',
      badges: ['React Native', 'Expo', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'JWT', 'TypeScript'],
      githubUrl: '',
      sections: [
        {
          title: '🏗️ Architecture',
          content: 'Full-stack application with **React Native + Expo** (TypeScript) mobile frontend and **FastAPI** (Python) backend API. **PostgreSQL 16** database with **SQLAlchemy 2.0** ORM and **Alembic** migrations.',
        },
        {
          title: '🔐 Authentication',
          content: 'Complete authentication system with:\n\n• **JWT** (JSON Web Tokens) with access and refresh tokens.\n• **Google OAuth** for Google account login.\n• **Apple Sign-In** for iOS users.',
        },
        {
          title: '📱 Features',
          content: '• Post system (create, edit, delete)\n• Personalized chronological feed\n• Likes and comments system\n• User following (follow/unfollow)\n• Real-time notifications\n• User profiles with avatar\n• Image upload',
        },
      ],
      phases: [],
      note: '',
      documents: [],
    },
  },
};
