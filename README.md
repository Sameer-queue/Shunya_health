# 🌐 Formulary AI — Intelligent Drug Preference Assistant

An **AI-powered drug formulary scraper and query system** that extracts, processes, and answers questions from **Horizon BCBSNJ’s preferred medical drugs data**.  
The system scrapes the formulary webpage, parses and stores the data locally, and allows intelligent querying through a modern, interactive frontend interface.

---

## 🚀 Features

- **Automated Web Scraping:** Extracts and parses formulary data from HTML pages.  
- **AI Query Engine:** Uses **Google Gemini API** to answer natural-language drug queries.  
- **Interactive Frontend:** Built with **React + Vite + TailwindCSS + Framer Motion** for smooth UI.  
- **Backend Processing:** Flask-based API for scraping, querying, and LLM integration.  
- **Local Storage:** Saves parsed data in JSON for offline access and caching.  
- **Elegant Notifications:** Real-time toast alerts for scraping and search operations.  

---

## 🏗️ Project Structure

shunya_formulary_app/
│
├── app.py # Main Flask backend API
├── scraper.py # Scrapes Horizon formulary data
├── embedder.py # Embedding-based retrieval logic
├── gemini_client.py # Gemini API client
│
├── data/
│ └── formulary.json # Cached formulary dataset
│
├── frontend/ # React + Vite frontend
│ ├── src/
│ │ ├── App.tsx # Main app logic
│ │ ├── main.tsx # Entry point
│ │ └── index.css # Tailwind global styles
│ ├── package.json
│ ├── tailwind.config.js
│ └── vite.config.ts
│
├── requirements.txt # Python dependencies
├── .env # Optional (Gemini API key)
└── README.md

yaml
Copy code

---

## ⚙️ Setup Instructions

### 🧩 1. Clone the Repository

```bash
git clone https://github.com/Sameer-queue/shunya_formulary_app.git
cd shunya_formulary_app
🐍 2. Backend Setup (Flask)
Create and activate a virtual environment:

bash
Copy code
python3 -m venv .venv
source .venv/bin/activate      # macOS/Linux
# OR
.venv\Scripts\activate         # Windows
Install dependencies:

bash
Copy code
pip install -r requirements.txt
Set up your Gemini API key (temporarily):

bash
Copy code
export GEMINI_API_KEY="your_api_key_here"       # macOS/Linux
set GEMINI_API_KEY=your_api_key_here            # Windows CMD
Alternatively, create a .env file in the root directory:

ini
Copy code
GEMINI_API_KEY=your_api_key_here
Start the Flask server:

bash
Copy code
flask --app app run --port 5000
✅ Runs at → http://127.0.0.1:5000

⚛️ 3. Frontend Setup (React + Vite)
In a new terminal:

bash
Copy code
cd frontend
npm install
npm run dev
✅ Runs at → http://localhost:5173

🧰 Example Commands
Task	Command
Run backend	flask --app app run --port 5000
Run frontend	npm run dev
Check API key (macOS/Linux)	echo $GEMINI_API_KEY
Check API key (Windows PowerShell)	echo $env:GEMINI_API_KEY

🧭 Environment Variables
Variable	Description	Example
GEMINI_API_KEY	API key for Google Gemini	AIzaSyDxxxxxxx
OPENAI_API_KEY	(Optional) OpenAI API key	sk-xxxxxx

🧱 Example Query Flow
Step	Component	Action
1️⃣	Frontend	User enters a query (e.g., “Is Kanjinti (Q5117) preferred?”)
2️⃣	Backend	Flask receives query → searches JSON → retrieves embeddings
3️⃣	AI Engine	Gemini API interprets query and formulary context
4️⃣	Frontend	Displays structured + AI-enhanced answer

Example Response:

json
Copy code
{
  "deterministic_result": {
    "drug": "Kanjinti",
    "code": "Q5117",
    "preferred": true,
    "alternatives": ["Herceptin", "Ogivri"]
  },
  "llm_answer": "Yes, Kanjinti (Q5117) is a preferred drug on the Horizon formulary, alongside Herceptin and Ogivri."
}
🚧 Extending to Production
To evolve this into a production-grade service:

✅ Replace Flask dev server with FastAPI + Uvicorn
✅ Store data in a vector database (Pinecone, FAISS, or ChromaDB)
✅ Deploy to Google Cloud Run / AWS Lambda
✅ Schedule scraping with Celery + Redis
✅ Add user authentication and API rate limiting
✅ Host frontend via Vercel or Netlify

