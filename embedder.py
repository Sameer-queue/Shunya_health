# embedder.py
import os
import json
import numpy as np
from google import genai
from google.genai import types
from dotenv import load_dotenv
from numpy.linalg import norm

load_dotenv()

DATA_PATH = "data/formulary.json"
EMBED_PATH = "data/embeddings.npy"
ID_MAP_PATH = "data/id_map.json"

def get_client():
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("Missing GEMINI_API_KEY in environment or .env file")
    return genai.Client(api_key=api_key)

def generate_embeddings():
    """Generate embeddings for each formulary entry and save locally."""
    client = get_client()
    if not os.path.exists(DATA_PATH):
        raise FileNotFoundError(f"Missing data file: {DATA_PATH}")

    with open(DATA_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    print(f"🧠 Generating embeddings for {len(data)} entries...")
    texts = [f"{d.get('name')} | {d.get('code')} | {d.get('preferred_status')} | {', '.join(d.get('preferred_alternatives', []))}" for d in data]
    
    vectors = []
    for i in range(0, len(texts), 100):
        batch = texts[i:i+100]
        response = client.models.embed_content(
            model="models/text-embedding-004",
            contents=batch
        )
        vectors.extend([np.array(v.values, dtype=np.float32) for v in response.embeddings])

    np.save(EMBED_PATH, np.vstack(vectors))
    with open(ID_MAP_PATH, "w") as f:
        json.dump([d.get("name") for d in data], f, indent=2)
    print("✅ Embeddings saved.")

def search_similar(query, top_k=5):
    """Find the most relevant formulary entries for a user query."""
    client = get_client()
    if not os.path.exists(EMBED_PATH):
        print("⚠️ No embeddings found — generating now...")
        generate_embeddings()

    # Load data + embeddings
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)
    embeddings = np.load(EMBED_PATH)
    
    # Embed query
    resp = client.models.embed_content(
        model="models/text-embedding-004",
        contents=[query]
    )
    qvec = np.array(resp.embeddings[0].values, dtype=np.float32)
    
    # Compute cosine similarity
    sims = embeddings.dot(qvec) / (norm(embeddings, axis=1) * norm(qvec))
    top_idx = np.argsort(-sims)[:top_k]
    return [data[i] for i in top_idx]
