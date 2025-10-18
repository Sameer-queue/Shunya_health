import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Search, Database, Loader2, Brain } from "lucide-react";

// Pill icon component
const Pill = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
    <path d="m8.5 8.5 7 7" />
  </svg>
);

// Flask backend
const API_BASE = "http://127.0.0.1:5000";

const callAPI = async (endpoint: string, method = "GET", body?: any) => {
  const options: RequestInit = {
    method,
    headers: { "Content-Type": "application/json" },
  };
  if (body) options.body = JSON.stringify(body);
  const res = await fetch(`${API_BASE}${endpoint}`, options);
  return res.json();
};

// ---------------- NAVBAR ----------------
const Navbar = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 bg-white/70 backdrop-blur-xl border-b border-slate-200/50 z-50 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex items-center justify-between">
        <motion.div 
          className="flex items-center gap-2.5"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-tr from-[#1D3B73]/20 to-transparent rounded-full blur-sm"
            />
            <Pill className="w-7 h-7 text-[#1D3B73] relative" />
          </div>
          <span className="text-xl font-semibold text-slate-900 tracking-tight">Formulary AI</span>
        </motion.div>

        <div className="hidden md:flex items-center gap-10">
          {["Home", "Docs", "Contact"].map((link, i) => (
            <motion.div
              key={link}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              className="relative"
              onMouseEnter={() => setHoveredLink(link)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <button className="text-[15px] font-medium text-slate-600 hover:text-slate-900 transition-colors duration-300">
                {link}
              </button>
              {hoveredLink === link && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-gradient-to-r from-[#1D3B73] to-indigo-600 rounded-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

// ---------------- HERO ----------------
const Hero = ({ onAskClick, onScrapeClick }: any) => {
  return (
    <section className="relative pt-40 pb-28 px-6 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 -z-10" />
      
      {/* Animated Orbs */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-[#1D3B73]/10 to-indigo-200/20 rounded-full blur-3xl -z-10"
      />
      <motion.div
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-tr from-slate-200/30 to-blue-100/20 rounded-full blur-3xl -z-10"
      />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.h1
            className="text-6xl md:text-[5.5rem] font-bold text-slate-900 mb-7 leading-[1.1] tracking-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            Your AI Formulary
            <br />
            <span className="bg-gradient-to-r from-[#1D3B73] via-indigo-700 to-[#1D3B73] bg-clip-text text-transparent">
              Assistant
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-slate-600 mb-14 leading-relaxed max-w-3xl mx-auto font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          >
            Get instant answers about drug preferences and formulary status.
            <br />
            <span className="text-slate-500">Powered by intelligent search and AI analysis.</span>
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-5 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          >
            <motion.button
              onClick={onAskClick}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="group relative px-9 py-4 bg-gradient-to-r from-[#1D3B73] to-indigo-700 text-white rounded-2xl font-medium text-[17px] shadow-lg shadow-[#1D3B73]/25 hover:shadow-xl hover:shadow-[#1D3B73]/35 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Ask a Question
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-[#1D3B73] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.button>

            <motion.button
              onClick={onScrapeClick}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="px-9 py-4 bg-white/80 backdrop-blur-sm text-slate-700 rounded-2xl font-medium text-[17px] border-2 border-slate-200/80 shadow-md hover:bg-white hover:border-slate-300 hover:shadow-lg transition-all duration-300"
            >
              Scrape Data
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// ---------------- ASK FORM ----------------
const AskForm = ({ onSubmit, loading }: any) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = () => {
    if (query.trim()) onSubmit(query);
  };

  return (
    <section id="ask" className="py-24 px-6 bg-gradient-to-b from-white to-slate-50/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <h2 className="text-5xl font-bold text-slate-900 mb-5 tracking-tight">
            Ask About Any Drug
          </h2>
          <p className="text-lg text-slate-600 font-light">
            Enter a drug name or code to check its formulary status
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.div 
              className="relative flex-1"
              animate={{ scale: isFocused ? 1.01 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 transition-colors duration-300" style={{ color: isFocused ? '#1D3B73' : undefined }} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="e.g., Is Kanjinti (Q5117) preferred?"
                className="w-full pl-14 pr-6 py-5 text-lg bg-white rounded-2xl border-2 border-slate-200 focus:border-[#1D3B73] outline-none transition-all duration-300 shadow-sm focus:shadow-lg focus:shadow-[#1D3B73]/10 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              />
            </motion.div>
            
            <motion.button
              onClick={handleSubmit}
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -2 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              transition={{ duration: 0.2 }}
              className="px-9 py-5 bg-gradient-to-r from-[#1D3B73] to-indigo-700 text-white rounded-2xl font-medium text-[17px] flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-[#1D3B73]/20 hover:shadow-xl hover:shadow-[#1D3B73]/30 transition-all duration-300 min-w-[140px]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Searching
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" /> Search
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ---------------- RESULTS SECTION ----------------
const ResultsSection = ({ detResult, llmAnswer }: any) => {
  if (!detResult && !llmAnswer) return null;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="py-28 px-6 bg-gradient-to-b from-slate-50/50 to-white">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-slate-900 mb-16 text-center tracking-tight"
        >
          Results
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {detResult && (
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="group relative bg-white rounded-3xl border border-slate-200/60 shadow-md hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#1D3B73]/0 to-indigo-600/0 group-hover:from-[#1D3B73]/5 group-hover:to-indigo-600/5 transition-all duration-500 pointer-events-none rounded-3xl" />
              <div className="relative p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-slate-50 rounded-xl group-hover:bg-[#1D3B73]/10 transition-colors duration-300">
                    <Database className="w-5 h-5 text-[#1D3B73]" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 tracking-tight">
                    Formulary Data
                  </h3>
                </div>
                <div className="bg-slate-50/80 backdrop-blur-sm rounded-2xl p-5 border border-slate-100 group-hover:bg-slate-50 transition-colors duration-300">
                  <pre className="text-sm text-slate-700 overflow-auto leading-relaxed font-mono">
                    {JSON.stringify(detResult, null, 2)}
                  </pre>
                </div>
              </div>
            </motion.div>
          )}

          {llmAnswer && (
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="group relative bg-white rounded-3xl border border-slate-200/60 shadow-md hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/0 to-[#1D3B73]/0 group-hover:from-indigo-600/5 group-hover:to-[#1D3B73]/5 transition-all duration-500 pointer-events-none rounded-3xl" />
              <div className="relative p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-slate-50 rounded-xl group-hover:bg-indigo-50 transition-colors duration-300">
                    <Brain className="w-5 h-5 text-[#1D3B73] group-hover:text-indigo-700 transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 tracking-tight">
                    AI Analysis
                  </h3>
                </div>
                <div className="text-[17px] text-slate-700 leading-relaxed whitespace-pre-wrap font-light">
                  {llmAnswer}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
// ---------------- TOAST COMPONENT ----------------
interface ToastProps {
  message: string;
  type?: "success" | "error";
}

const Toast: React.FC<ToastProps> = ({ message, type = "success" }) => {
  const colorClasses =
    type === "success"
      ? "bg-green-50 border-green-200 text-green-800"
      : "bg-red-50 border-red-200 text-red-800";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.9 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed bottom-8 right-8 px-6 py-4 rounded-2xl border shadow-lg backdrop-blur-sm flex items-center gap-3 z-50 ${colorClasses}`}
    >
      {type === "success" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      )}
      <span className="font-medium">{message}</span>
    </motion.div>
  );
};

// ---------------- FOOTER ----------------
const Footer = () => (
  <footer className="py-16 px-6 bg-gradient-to-b from-white to-slate-50 border-t border-slate-200/50">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="text-center"
    >
      <p className="text-slate-500 text-[15px] font-light">
        © 2025 Formulary AI. {" "}
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
          className="inline-block text-red-500"
        >
          
        </motion.span>
        {" "}Built by ~ Sameer Srivastava
      </p>
    </motion.div>
  </footer>
);


// ---------------- MAIN APP ----------------
const App = () => {
  const [loading, setLoading] = useState(false);
  const [detResult, setDetResult] = useState<any>(null);
  const [llmAnswer, setLlmAnswer] = useState<string>("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleQuery = async (question: string) => {
    setLoading(true);
    setDetResult(null);
    setLlmAnswer("");
    try {
      const data = await callAPI("/api/query", "POST", { question });
      setDetResult(data.deterministic_result);
      setLlmAnswer(data.llm_answer || "AI analysis not available.");
      showToast("Query processed successfully!", "success");
    } catch {
      showToast("Query failed. Please check Flask server.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleScrape = async () => {
    setLoading(true);
    try {
      await callAPI("/api/scrape", "POST");
      showToast("Scraping completed successfully!", "success");
    } catch {
      showToast("Scraping failed.", "error");
    } finally {
      setLoading(false);
    }
  };

  const scrollToAsk = () => {
    const element = document.getElementById("ask");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white antialiased relative">
      <Navbar />
      <Hero onAskClick={scrollToAsk} onScrapeClick={handleScrape} />
      <AskForm onSubmit={handleQuery} loading={loading} />
      <ResultsSection detResult={detResult} llmAnswer={llmAnswer} />
      <Footer />
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};


export default App;
