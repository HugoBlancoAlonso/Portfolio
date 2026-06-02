

import streamlit as st
import sys

sys.stdout.reconfigure(encoding="utf-8")



st.set_page_config(
    page_title="Analizador IA de Contratos",
    page_icon="⚖️",
    layout="wide"
)


if "pagina" not in st.session_state:
    st.session_state.pagina = "menu"


from frontend.views.menu import mostrar_menu
from frontend.views.analizar import mostrar_pagina as mostrar_analizar
from frontend.views.generar import mostrar_pagina as mostrar_generar


if st.session_state.pagina == "menu":
    mostrar_menu()

elif st.session_state.pagina == "analizar":
    mostrar_analizar()

elif st.session_state.pagina == "generar":
    mostrar_generar()