import json
import pandas as pd
import chromadb
from chromadb.utils import embedding_functions
import sys

sys.stdout.reconfigure(encoding="utf-8")



model_name = "paraphrase-multilingual-MiniLM-L12-v2"

huggingface_ef = embedding_functions.SentenceTransformerEmbeddingFunction(
    model_name=model_name
)


client = chromadb.PersistentClient(path="./chroma_db")

collection = client.get_or_create_collection(
    name="clausulas_referencia",
    embedding_function=huggingface_ef,
    metadata={"hnsw:space": "cosine"}
)


def indexar_diccionario(ruta_json):

    if collection.count() == 0:

        print(" Indexando diccionario en ChromaDB por primera vez...")

        with open(ruta_json, "r", encoding="utf-8") as f:
            data = json.load(f)

        ids = []
        documents = []
        metadatos = []

        idx = 0

        for categoria, subcategorias in data.items():

            for subcategoria, info in subcategorias.items():

                ids.append(f"id_{idx}")

                documents.append(info["ejemplo"])

                metadatos.append({
                    "categoria": categoria,
                    "subcategoria": subcategoria,
                    "es_legal": info["valor"],
                    "justificacion": info.get(
                        "explicacion",
                        "Sin justificación disponible"
                    )
                })

                idx += 1

        collection.add(
            ids=ids,
            documents=documents,
            metadatas=metadatos
        )

        print(f" {idx} ejemplos indexados correctamente.")

    else:

        print(
            f" Base persistente detectada "
            f"({collection.count()} registros)."
        )


def analizar_con_chroma(texto_usuario):
    
    results = collection.query(
        query_texts=[texto_usuario],
        n_results=2, 
        include=["metadatas", "distances", "documents"]
    )

    
    if not results["distances"][0]:
        return (0, True, "", "", 1.0)

    
    distancia = results["distances"][0][0]
    confianza = 1 - distancia
    metadata = results["metadatas"][0][0]
    texto_ref = results["documents"][0][0]
    justificacion = metadata.get("justificacion", "Sin información adicional")
    es_legal = metadata["es_legal"]

    
    if len(results["distances"][0]) > 1:
        dist_segunda = results["distances"][0][1]
        es_legal_segunda = results["metadatas"][0][1]["es_legal"]
        
        if es_legal and not es_legal_segunda and dist_segunda < 0.45:
            
            es_legal = False
            distancia = dist_segunda
            justificacion = results["metadatas"][0][1].get("justificacion")
            texto_ref = results["documents"][0][1]

    return (confianza, es_legal, texto_ref, justificacion, distancia)


indexar_diccionario("data/processed/clausulas.json")
df_contrato = pd.read_csv("data/processed/clausulas_contrato.csv")

resultados = []

for _, row in df_contrato.iterrows():
    score, es_legal_ref, ref_txt, motivo, dist = analizar_con_chroma(row["contenido"])

    
    if not es_legal_ref and dist < 0.50:
        dictamen = " POSIBLE ABUSIVA"
        razon = f"SOSPECHA DE ABUSO: {motivo}"

    
    elif es_legal_ref and dist < 0.40:
        dictamen = " LEGAL"
        razon = motivo

    
    else:
        dictamen = " REVISIÓN"
        razon = "Redacción fuera de estándar o combinación de términos sospechosa."

    resultados.append({
        "Cláusula": row["titulo"],
        "Dictamen": dictamen,
        "Confianza": f"{1-dist:.2%}",
        "Referencia": ref_txt,
        "Justificación": razon
    })


df_final = pd.DataFrame(resultados)

print("\n" + "=" * 80)
print(df_final[["Cláusula", "Dictamen", "Justificación"]])
print("=" * 80)

df_final.to_csv(
    "data/processed/prediccionAbusividad.csv",
    index=False,
    encoding="utf-8"
)

print(
    "\n Análisis completo guardado en "
    "'data/processed/prediccionAbusividad.csv'"
)