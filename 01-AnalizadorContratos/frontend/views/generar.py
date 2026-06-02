import streamlit as st
import pandas as pd
from datetime import datetime


import requests

def mostrar_pagina():
    """Página de generación de contratos"""
    
    if st.button("← Volver al menú"):
        st.session_state.pagina = "menu"
        st.rerun()
    
    st.title("✍️ Generar Contrato")
    st.write("Completa los datos para generar tu contrato personalizado")
    
    st.write("---")
   
    
    st.subheader("👤 Datos del ARRENDADOR")
    
    col1, col2 = st.columns(2)
    with col1:
        nombreV = st.text_input("Nombre arrendador *", placeholder="Juan")
    with col2:
        apellidosV = st.text_input("Apellidos arrendador *", placeholder="García López")
    
    col1, col2 = st.columns(2)
    with col1:
        dniV = st.text_input("DNI arrendador *", placeholder="12345678A")
    with col2:
        telefonoV = st.text_input("Teléfono arrendador *", placeholder="+34 123 456 789")
    
    col1, col2 = st.columns(2)
    with col1:
        emailV = st.text_input("Email arrendador *", placeholder="juan@example.com")
    with col2:
        ciudadV = st.text_input("Ciudad arrendador *", placeholder="Madrid")

    col1, col2 = st.columns(2)
    with col1:
        direccionV = st.text_input("Dirección arrendador *", placeholder="Calle Principal, 123")
        
    with col2:
        numeroBancoV = st.text_input("Numero cuenta bancaria arrendador *", placeholder="43283649237432")
        

    col1, col2 = st.columns(2)
    with col1:
        bancoV = st.text_input("Nombre del banco *", placeholder="Santander")
    with col2:   
        sucursalV = st.text_input("Sucursal *", placeholder="7")
    
    st.write("---")

   
    
    st.subheader("👤 Datos del Arrendatario")
    
    col1, col2 = st.columns(2)
    with col1:
        nombreC = st.text_input("Nombre arrendatario *", placeholder="Juan")
    with col2:
        apellidosC = st.text_input("Apellidos arrendatario *", placeholder="García López")
    
    col1, col2 = st.columns(2)
    with col1:
        dniC = st.text_input("DNI arrendatario *", placeholder="12345678A")
    with col2:
        telefonoC = st.text_input("Teléfono arrendatario *", placeholder="+34 123 456 789")
    
    col1, col2 = st.columns(2)
    with col1:
        emailC = st.text_input("Email arrendatario *", placeholder="juan@example.com")
    
    st.write("---")
    

    
    st.subheader("📋 Detalles del Contrato")
    
    col1, col2 = st.columns(2)
    with col1:
        precio = st.number_input("Precio (EUR) *", min_value=0.0, step=0.01)
    with col2:
        duracion = st.text_input("Duración del Contrato *", placeholder="12 meses / Indefinido")

    col1, col2 = st.columns(2)
    with col1:
        metros = st.number_input("Metros (m2) *", placeholder="97")
    with col2:
        numeroPersonas = st.text_input("Numero de personas *", placeholder="4")

    col1, col2 = st.columns(2)
    with col1:
        dirVivienda = st.text_input("Direccion de la vivienda a alquilar *", placeholder="Calle San Mames numero 10 1A")
    with col2:
        refCatastral = st.text_input("Referancia catastral *", placeholder="12345678901234567890")
    
    col1, col2 = st.columns(2)
    with col1:
        registro = st.text_input("Registro *", placeholder="si / no")

    
    st.write("---")
    

    st.subheader("📝 Términos y Condiciones Adicionales")
    
    terminos = st.text_area(
        "Añade términos y condiciones adicionales (opcional)",
        placeholder="Introduce aquí cualquier cláusula o término adicional que desees incluir en el contrato...",
        height=120
    )
    
    st.write("---")
    
 
    
    col1, col2, col3 = st.columns(3)
    
    with col2:
        if st.button("📄 Generar PDF", use_container_width=True):
            
            
            campos_obligatorios = [
                nombreV, apellidosV, dniV, telefonoV, emailV, ciudadV, direccionV, nombreC, apellidosC, dniC, telefonoC, emailC,
                numeroBancoV,bancoV, sucursalV, precio, metros, numeroPersonas, duracion, dirVivienda, refCatastral, registro
            ]
            
            if all(campos_obligatorios) and precio > 0:
                
                datos_contrato = {
                    "nombreV": nombreV,
                    "apellidosV": apellidosV,
                    "dniV": dniV,
                    "telefonoV": telefonoV,
                    "emailV": emailV,
                    "ciudadV": ciudadV,
                    "direccionV": direccionV,
                    "nombreC": nombreC,
                    "apellidosC": apellidosC,
                    "dniC": dniC,
                    "telefonoC": telefonoC,
                    "emailC": emailC,
                    "numeroBancoV": numeroBancoV,
                    "bancoV": bancoV,
                    "sucursalV": sucursalV,
                    "precio": precio,
                    "metros": metros,
                    "numeroPersonas": numeroPersonas,
                    "duracion": duracion,
                    "dirVivienda": dirVivienda,
                    "refCatastral": refCatastral,
                    "registro": registro,
                    "terminos": terminos
                }
                
                with st.spinner("Generando contrato..."):
                    try:
                        import os
                        api_url = os.environ.get("API_URL", "http://localhost:8000")
                        response = requests.post(f"{api_url}/generar", json=datos_contrato)
                        if response.status_code == 200:
                            pdf = response.content
                            st.success("Contrato generado exitosamente!")
                            st.download_button(
                                label="📥 Descargar Contrato PDF",
                                data=pdf,
                                file_name=f"contrato_{apellidosV.replace(' ', '_')}.pdf",
                                mime="application/pdf",
                                use_container_width=True
                            )
                        else:
                            st.error(f"Error de la API: {response.text}")
                    except Exception as e:
                        st.error(f"Error de conexión con la API: {str(e)}")
                
            else:
                st.error("Por favor, completa todos los campos obligatorios (*)")
