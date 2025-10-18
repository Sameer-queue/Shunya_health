import os
import re
import json
from difflib import SequenceMatcher
from typing import Dict, Any, List
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from scraper import scrape_formulary, save_json, DEFAULT_URL
from gemini_client import call_gemini
from embedder import search_similar



# Path to local JSON dataset
DATA_PATH = os.path.join(os.path.dirname(__file__), "data", "formulary.json")

app = Flask(__name__, template_folder="templates", static_folder="static")


CORS(app, resources={r"/api/*": {"origins": "*"}})

# -----------------------
# Utility Functions
# -----------------------

def load_data() -> List[Dict[str, Any]]:
    """Load formulary data from JSON file."""
    if not os.path.exists(DATA_PATH):
        return []
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def normalize_text(text: str) -> str:
    """Normalize text for fuzzy comparison."""
    if not text:
        return ""
    text = text.lower()
    text = re.sub(r"[^\w\s]", "", text)  # remove ™, ®, punctuation
    text = re.sub(r"\s+", " ", text).strip()
    return text


def find_by_name_or_code(data: List[Dict[str, Any]], query: str) -> List[Dict[str, Any]]:
    """Improved fuzzy search that checks both names and codes."""
    query_norm = normalize_text(query)

    # Extract drug code patterns like J0135, Q5117, etc.
    possible_codes = re.findall(r"\b[AJQ]\d{4,5}\b", query.upper())
    best_matches = []

    # 1️⃣ First: direct code match
    if possible_codes:
        for code in possible_codes:
            for entry in data:
                if code.lower() == normalize_text(entry.get("code", "")):
                    print(f"✅ Found direct code match: {code}")
                    return [entry]

    # 2️⃣ Second: fuzzy name/code search
    best_score = 0.0
    for entry in data:
        name = normalize_text(entry.get("name"))
        code = normalize_text(entry.get("code"))
        score = max(
            SequenceMatcher(None, query_norm, name).ratio(),
            SequenceMatcher(None, query_norm, code).ratio()
        )
        if score > best_score:
            best_matches = [entry]
            best_score = score
        elif abs(score - best_score) < 0.05:
            best_matches.append(entry)

    if best_score < 0.4:
        print(f"⚠️ No strong match for '{query}' (best score {best_score:.2f})")
        return []

    print(f"🔍 Best match: {best_matches[0].get('name')} ({best_score:.2f})")
    return best_matches



# -----------------------
# Flask Routes
# -----------------------

@app.route("/")
def index():
    """Serve main interface."""
    return render_template("index.html")


@app.route("/api/scrape", methods=["POST"])
def api_scrape():
    """Trigger scraper and rebuild local formulary.json."""
    entries = scrape_formulary()
    return jsonify({"ok": True, "count": len(entries), "path": "data/formulary.json"})


@app.route("/api/data", methods=["GET"])
def api_data():
    """Return all loaded formulary data."""
    return jsonify(load_data())





@app.route("/api/query", methods=["POST"])
def api_query():
    body = request.get_json(silent=True) or {}
    question = body.get("question", "").strip()
    if not question:
        return jsonify({"ok": False, "error": "Empty question"}), 400

    data = load_data()
    hits = find_by_name_or_code(data, question)

    # Retrieval-Augmented step
    retrieved_docs = search_similar(question, top_k=5)
    context_text = "\n".join([
        f"- {r['name']} ({r['code']}): {r['preferred_status']} [{', '.join(r.get('preferred_alternatives', []))}]"
        for r in retrieved_docs
    ])

    if hits:
        top = hits[0]
        preferred_status = (top.get("preferred_status") or "").lower()
        result = {
            "Drug": top.get("name"),
            "Code": top.get("code"),
            "Preferred": True if preferred_status.startswith("preferred") and not preferred_status.startswith("non") else False,
            "Preferred_Status": top.get("preferred_status"),
            "Preferred_Alternatives": top.get("preferred_alternatives") or []
        }
    else:
        result = {"note": "No direct match found. Showing similar context.", "context_preview": retrieved_docs}

    messages = [
        {
            "role": "system",
            "content": (
                "You are a helpful, confident assistant explaining formulary drug preferences. "
                "Use the provided formulary context, and reply conversationally."
            )
        },
        {
            "role": "user",
            "content": (
                f"Question: {question}\n\nFormulary context:\n{context_text}\n\n"
                "Now give a short, clear, human-like explanation."
            )
        }
    ]

    llm_answer = call_gemini(messages, context=context_text)

    return jsonify({
        "ok": True,
        "deterministic_result": result,
        "llm_answer": llm_answer
    })



# -----------------------
# Run App
# -----------------------
if __name__ == "__main__":
    print("🔑 GEMINI_API_KEY visible:", bool(os.getenv("GEMINI_API_KEY")))

    app.run(host="0.0.0.0", port=int(os.getenv("PORT", "5000")), debug=True)
