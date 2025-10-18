# 💊 Formulary AI — Intelligent Drug Preference Assistant

An AI-powered web application that helps users instantly check **formulary drug preferences**, codes, and preferred alternatives — with both deterministic lookup and **Gemini-powered natural language answers**.

---

## 🚀 Features

✅ Scrape formulary data directly from official sources  
✅ Ask natural questions (e.g., *Is Kanjinti preferred?*)  
✅ Get both structured data **and** AI-generated insights  
✅ Elegant Apple-style UI built with React + Tailwind + Framer Motion  
✅ Real-time toast notifications for user feedback  

---

## 🏗️ Project Structure

shunya_formulary_app/
│
├── app.py # Flask backend API
├── scraper.py # Scrapes formulary data
├── embedder.py # Embedding-based retrieval
├── gemini_client.py # Gemini API client
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
├── .env # Environment variables (optional)
└── README.md

yaml
Copy code

---

## ⚙️ Setup & Installation

### 🧩 Prerequisites
- Python **3.10+**
- Node.js **18+**
- A valid **Gemini API key**

---

### 🧱 Backend Setup (Flask)

/*1️⃣ Navigate to your backend root:
```bash
cd shunya_formulary_app
python3 -m venv .venv
source .venv/bin/activate
2️⃣ Install dependencies:

bash
Copy code
pip install -r requirements.txt
3️⃣ Export your Gemini API key:

bash
Copy code
export GEMINI_API_KEY="your_google_gemini_api_key_here"
4️⃣ Start Flask:

bash
Copy code
flask --app app run --port 5000
✅ Flask will start at:
👉 http://127.0.0.1:5000

💻 Frontend Setup (React + Vite)
In a new terminal:

bash
Copy code
cd frontend
npm install
npm run dev
✅ Vite will start at:
👉 http://localhost:5173

*/
---

**Author:** Sameer Srivastava (VIT '26')
```
Email: rishupayne04@gmail.com
GitHub: https://github.com/Sameer-queue
```
