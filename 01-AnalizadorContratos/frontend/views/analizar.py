# ======================================================
# frontend/views/analizar.py
# ANÁLISIS DE CONTRATOS (Frontend puro)
# ======================================================

import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from collections import Counter
import re
import requests


def limpiar_texto(txt):
    try:
        return txt.encode("latin1").decode("utf-8")
    except:
        return txt


def colorear_confianza(val):
    texto = str(val).replace("%", "").replace(",", ".").strip()
    try:
        confianza = float(texto)
    except ValueError:
        return ""

    if confianza >= 90:
        return "background-color:#d1e7dd; color:#0f5132; font-weight:600"
    elif confianza >= 75:
        return "background-color:#fff3cd; color:#664d03; font-weight:600"
    else:
        return "background-color:#f8d7da; color:#842029; font-weight:600"


def mostrar_metricas(df):
    abusivas = df["Dictamen"].astype(str).str.contains("ABUSIVA").sum()
    revision = df["Dictamen"].astype(str).str.contains("REVISIÓN").sum()
    legales = len(df) - abusivas - revision

    c1, c2, c3 = st.columns(3)
    c1.metric("⚠️ Abusivas", abusivas)
    c2.metric("🔍 Revisión", revision)
    c3.metric("✅ Legales", legales)


def mostrar_graficos(df):
    if df.empty:
        return

    sns.set_theme(style="whitegrid")

    if "titulo" in df.columns and "longitud" in df.columns:
        fig, ax = plt.subplots(figsize=(15, 6))
        sns.barplot(data=df, x="titulo", y="longitud", palette="viridis", ax=ax)
        ax.set_title("Longitud de todas las cláusulas")
        ax.set_xlabel("Cláusulas")
        ax.set_ylabel("Caracteres")
        plt.xticks(rotation=45, ha="right")
        st.subheader("📊 Longitud cláusulas")
        st.pyplot(fig)

    if "contenido" in df.columns:
        texto = " ".join(df["contenido"].astype(str)).lower()
        palabras = re.findall(r"\b[a-záéíóúñ]{4,}\b", texto)
        stop = {"para", "esta", "este", "como", "donde", "entre", "desde", "hasta", "sobre", "tambien", "cuando", "debera", "podra", "haber", "seran"}
        palabras = [p for p in palabras if p not in stop]
        comunes = Counter(palabras).most_common(15)

        if comunes:
            top = pd.DataFrame(comunes, columns=["Palabra", "Frecuencia"])
            fig2, ax2 = plt.subplots(figsize=(10, 6))
            sns.barplot(data=top, x="Frecuencia", y="Palabra", palette="magma", ax=ax2)
            ax2.set_title("Top 15 palabras")
            st.subheader("📈 Frecuencia palabras")
            st.pyplot(fig2)


def mostrar_pagina():
    if st.button("← Volver al menú"):
        st.session_state.pagina = "menu"
        st.rerun()
    
    st.title("📄 Analizador Inteligente de Contratos")
    st.write("Sube un contrato PDF y analiza cláusulas automáticamente enviándolo a la API.")
    
    archivo = st.file_uploader("Subir contrato PDF", type=["pdf"], key="pdf_uploader")

    if archivo:
        st.success(f"Archivo '{archivo.name}' listo para analizar.")
        st.info(f"Tamaño: {archivo.size / 1024:.2f} KB")

        if st.button("🔍 Iniciar Análisis", use_container_width=True):
            with st.spinner("Procesando contrato en el backend..."):
                try:
                    # Enviar petición a la API
                    import os
                    api_url = os.environ.get("API_URL", "http://localhost:8000")
                    files = {"file": (archivo.name, archivo.getvalue(), "application/pdf")}
                    response = requests.post(f"{api_url}/analizar", files=files)
                    
                    if response.status_code == 200:
                        datos = response.json()
                        st.success("Análisis completado exitosamente!")
                        st.write("---")

                        resultados = datos.get("resultados", [])
                        if resultados:
                            df = pd.DataFrame(resultados)
                            # Adaptar nombres de columnas
                            df.rename(columns={
                                "dictamen": "Dictamen",
                                "clausula": "titulo",
                                "longitud_original": "longitud",
                                "confianza": "Confianza"
                            }, inplace=True)
                            
                            df = df.map(lambda x: limpiar_texto(str(x)))

                            st.subheader("⚠️ Resultado del Análisis")
                            mostrar_metricas(df)

                            styled_df = df.style
                            if "Confianza" in df.columns:
                                styled_df = styled_df.map(colorear_confianza, subset=["Confianza"])

                            st.dataframe(styled_df, use_container_width=True, height=500)
                            
                            # Mostrar gráficos de cláusulas
                            mostrar_graficos(df)
                        else:
                            st.warning("La API no devolvió resultados.")
                    else:
                        st.error(f"Error de la API: {response.text}")
                except Exception as e:
                    st.error(f"Error de conexión con la API: {str(e)}")
