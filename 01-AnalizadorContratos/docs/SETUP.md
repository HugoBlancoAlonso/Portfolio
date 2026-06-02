# ⚙️ Guía de Instalación y Estructura del Proyecto

En este documento se detalla de forma técnica cómo está organizado el código fuente del proyecto y las instrucciones paso a paso para desplegarlo en tu propia máquina.

---

## 📂 Estructura del Proyecto

El código está organizado siguiendo las mejores prácticas de modularidad y separación de responsabilidades (Arquitectura Cliente-Servidor).

```text
01-AnalizadorContratos/
├── data/                       <-- Datos del proyecto
│   ├── raw/                    <-- PDFs originales subidos por los usuarios
│   └── processed/              <-- Archivos limpios, diccionarios JSON y bases CSV
├── docs/                       <-- Documentación técnica y guías de uso
├── frontend/                   <-- Interfaz de Usuario (Streamlit)
│   ├── app.py                  <-- Punto de entrada principal (Router)
│   └── views/                  <-- Pantallas independientes
│       ├── analizar.py         <-- Vista del analizador de PDFs
│       ├── generar.py          <-- Vista del formulario generador de contratos
│       └── menu.py             <-- Menú principal de navegación
├── src/                        <-- Lógica de negocio y Backend (FastAPI)
│   ├── api/                    
│   │   └── api.py              <-- Endpoints HTTP (REST) que procesan las peticiones
│   ├── analysis/               <-- Algoritmos de NLP y búsqueda en ChromaDB
│   └── pipeline/               <-- Scripts de transformación y carga de datos
├── tests/                      <-- Pruebas unitarias de la API
├── chroma_db/                  <-- Base de datos vectorial persistente local
├── docker-compose.yml          <-- Orquestador de contenedores
├── Dockerfile                  <-- Receta de construcción de la imagen de Docker
├── requirements.txt            <-- Dependencias de Python
└── README.md                   <-- Presentación general del proyecto
```

---

## 🚀 Cómo iniciar el proyecto

Tienes dos formas de arrancar esta aplicación en tu ordenador. La forma recomendada es utilizando **Docker**, ya que evita cualquier tipo de conflicto de versiones con librerías de Python.

### Opción A: Usando Docker (Recomendado 🐳)

Asegúrate de tener [Docker Desktop](https://www.docker.com/products/docker-desktop) instalado y ejecutándose en tu ordenador.

1. Abre una terminal.
2. Navega hasta la carpeta raíz del proyecto (`01-AnalizadorContratos`).
3. Ejecuta el siguiente comando para construir y levantar los contenedores mágicamente:
   ```bash
   docker compose up --build
   ```
4. Espera unos segundos a que los modelos de lenguaje se descarguen y se levanten los servicios.
5. Abre tu navegador web y visita: **[http://localhost:8501](http://localhost:8501)** para interactuar con la interfaz visual.

*(Nota: La API por detrás estará escuchando en el puerto `8000`, puedes ver su documentación técnica entrando en `http://localhost:8000/docs`).*

### Opción B: Ejecución Manual Local (Python puro 🐍)

Si prefieres no usar Docker, puedes levantar los servicios manualmente en tu entorno local.

1. Navega a la carpeta del proyecto y crea un entorno virtual (recomendado):
   ```bash
   python -m venv venv
   # En Windows:
   venv\Scripts\activate
   # En Mac/Linux:
   source venv/bin/activate
   ```
2. Instala las dependencias necesarias:
   ```bash
   pip install -r requirements.txt
   ```
3. Descarga el modelo de idioma español para `spaCy`:
   ```bash
   python -m spacy download es_core_news_sm
   ```
4. **Levantar el Backend (API):**
   Abre una terminal y ejecuta:
   ```bash
   python -m uvicorn src.api.api:app --reload --host 0.0.0.0 --port 8000
   ```
5. **Levantar el Frontend (Streamlit):**
   Abre **otra** terminal distinta (con el entorno activado) y ejecuta:
   ```bash
   python -m streamlit run frontend/app.py
   ```
6. El navegador se abrirá automáticamente mostrando la interfaz.

---

## 🛑 Cómo detener el proyecto

- Si usaste **Docker**, ve a la terminal donde se está ejecutando y presiona `Ctrl + C`, o ejecuta `docker compose down` para borrar los contenedores limpiamente.
- Si lo levantaste **manualmente**, ve a cada una de las dos terminales y presiona `Ctrl + C`.
