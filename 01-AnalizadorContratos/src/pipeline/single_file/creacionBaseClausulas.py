import pandas as pd
import re
import os
import sys

sys.stdout.reconfigure(encoding="utf-8")

def segmentar_clausulas(texto, nombre_archivo):



    patron = r"""
(
    ^\s*CLÁUSULAS\s*$ |

    ^\s*(PRIMERA|SEGUNDA|TERCERA|CUARTA|QUINTA|SEXTA|SÉPTIMA|SEPTIMA|
    OCTAVA|NOVENA|DÉCIMA|DECIMA|
    UNDÉCIMA|UNDECIMA|DUODÉCIMA|DUODECIMA|
    DÉCIMO\s+PRIMERA|DECIMO\s+PRIMERA|
    DÉCIMO\s+SEGUNDA|DECIMO\s+SEGUNDA|
    DÉCIMO\s+TERCERA|DECIMO\s+TERCERA|
    DÉCIMO\s+CUARTA|DECIMO\s+CUARTA|
    DÉCIMO\s+QUINTA|DECIMO\s+QUINTA|
    DÉCIMO\s+SEXTA|DECIMO\s+SEXTA|
    DÉCIMO\s+SÉPTIMA|DECIMO\s+SEPTIMA|
    DÉCIMO\s+OCTAVA|DECIMO\s+OCTAVA|
    DÉCIMO\s+NOVENA|DECIMO\s+NOVENA|
    VIGÉSIMA|VIGESIMA|
    VIGÉSIMO\s+PRIMERA|VIGESIMO\s+PRIMERA|
    VIGÉSIMO\s+SEGUNDA|VIGESIMO\s+SEGUNDA|
    VIGÉSIMO\s+TERCERA|VIGESIMO\s+TERCERA)
    \s*[\.:]
)
"""

    matches = list(
        re.finditer(
            patron,
            texto,
            re.IGNORECASE | re.VERBOSE | re.MULTILINE
        )
    )

    clausulas = []

   
    if len(matches) == 0:
        clausulas.append({
            "contrato_id": nombre_archivo,
            "titulo": "CONTRATO_COMPLETO",
            "contenido": texto,
            "longitud": len(texto)
        })
        return pd.DataFrame(clausulas)

  
    for i in range(len(matches)):

        inicio = matches[i].start()
        titulo = matches[i].group().strip()

        if i + 1 < len(matches):
            fin = matches[i + 1].start()
        else:
            fin = len(texto)

        contenido = texto[inicio:fin].strip()

        contenido = re.sub(r"\s+", " ", contenido)

        clausulas.append({
            "contrato_id": nombre_archivo,
            "titulo": titulo,
            "contenido": contenido,
            "longitud": len(contenido)
        })

    return pd.DataFrame(clausulas)




ruta = "data/processed/contrato_limpio.txt"

if os.path.exists(ruta):

    with open(ruta, "r", encoding="utf-8") as f:
        texto = f.read()

    df = segmentar_clausulas(
        texto,
        "contrato_01"
    )

    salida = "data/processed/clausulas_contrato.csv"

    df.to_csv(
        salida,
        index=False,
        encoding="utf-8"
    )

    print(f" Detectadas {len(df)} cláusulas.")
    print(f" Archivo guardado en: {salida}")

else:
    print(" No existe contrato_limpio.txt")