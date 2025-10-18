# 💊 Formulary AI — Intelligent Drug Preference Assistant

An AI-powered web application that helps users instantly check **formulary drug preferences**, codes, and preferred alternatives — combining **deterministic lookup** and **Gemini-powered natural language answers**.

---

## 🚀 Features

✅ Scrapes formulary data directly from official sources  
✅ Accepts natural-language questions (e.g., *“Is Kanjinti preferred?”*)  
✅ Returns structured JSON + AI-enhanced summaries  
✅ Elegant, Apple-inspired UI using **React + Tailwind + Framer Motion**  
✅ Real-time **toast notifications** for user feedback  
✅ End-to-end Flask ↔ React integration  

---

## 🏗️ Project Structure

shunya_formulary_app/
│
├── app.py # Flask backend API
├── scraper.py # Scrapes formulary data
├── embedder.py # Embedding-based retrieval
├── gemini_client.py # Gemini API client
│
├── data/
│ └── formulary.json # Cached formulary data
│
├── frontend/ # React + Vite frontend
│ ├── src/
│ │ ├── App.tsx # Main UI logic
│ │ ├── main.tsx # Entry point
│ │ └── index.css # Global Tailwind styles
│ ├── package.json
│ ├── tailwind.config.js
│ └── vite.config.ts
│
├── .env # (Optional) Environment variables
├── requirements.txt # Python dependencies
└── README.md

yaml
Copy code

---

## ⚙️ Setup & Installation

### 🧩 Prerequisites

- **Python** ≥ 3.10  
- **Node.js** ≥ 18  
- A valid **Gemini API Key** → [Get one here](https://aistudio.google.com/app/apikey)

---

### 🧱 Backend Setup (Flask)

**1️⃣ Create & activate a virtual environment**

```bash
cd shunya_formulary_app
python3 -m venv .venv
source .venv/bin/activate    # macOS / Linux
# or
.venv\Scripts\activate       # Windows
2️⃣ Install dependencies

bash
Copy code
pip install -r requirements.txt
(If missing, install manually:)

bash
Copy code
pip install flask flask-cors requests beautifulsoup4 google-generativeai numpy scikit-learn
3️⃣ Export your Gemini API key

bash
Copy code
export GEMINI_API_KEY="your_google_gemini_api_key_here"
(You can add this to .bashrc or .zshrc for persistence.)

4️⃣ Start the Flask backend

bash
Copy code
flask --app app run --port 5000
✅ Flask runs at → http://127.0.0.1:5000

💻 Frontend Setup (React + Vite)
In a new terminal:

bash
Copy code
cd frontend
npm install
npm run dev
✅ Vite runs at → http://localhost:5173
