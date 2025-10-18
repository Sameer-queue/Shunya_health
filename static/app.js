// ✅ Wait until DOM is ready before running anything
document.addEventListener("DOMContentLoaded", () => {
  // 🔹 Scrape the formulary HTML
  async function scrapeNow() {
    const url = document.getElementById('urlInput').value.trim();
    try {
      const res = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(url ? { url } : {})
      });
      const data = await res.json();
      document.getElementById('scrapeResult').textContent = JSON.stringify(data, null, 2);
      await refreshData();
    } catch (err) {
      console.error("❌ Scrape failed:", err);
      document.getElementById('scrapeResult').textContent = "⚠️ Error scraping data.";
    }
  }

  // 🔹 Ask the LLM or deterministic model a question
  async function ask() {
    const q = document.getElementById('qInput').value.trim();
    if (!q) return;

    document.getElementById('detResult').textContent = "⏳ Thinking...";
    document.getElementById('llmResult').textContent = "⏳ Waiting for Gemini...";

    try {
      const res = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q })
      });

      const data = await res.json();

      // 🧩 Show deterministic result
      document.getElementById('detResult').textContent =
        JSON.stringify(data.deterministic_result, null, 2);

      // 🧠 Show Gemini (LLM) result or fallback
      if (data.llm_answer && data.llm_answer.trim() !== "") {
        document.getElementById('llmResult').textContent = data.llm_answer;
      } else {
        document.getElementById('llmResult').textContent =
          '(LLM disabled: set GEMINI_API_KEY)';
      }
    } catch (err) {
      console.error("❌ Error while querying:", err);
      document.getElementById('llmResult').textContent =
        "⚠️ LLM request failed. Check console or API key.";
    }
  }

  // 🔹 Refresh the preview of formulary data
  async function refreshData() {
    try {
      const res = await fetch('/api/data');
      const data = await res.json();

      document.getElementById('dataPreview').textContent =
        JSON.stringify(data.slice(0, 20), null, 2) +
        (data.length > 20 ? `\n... and ${data.length - 20} more entries` : '');
    } catch (err) {
      console.error("❌ Could not load data:", err);
      document.getElementById('dataPreview').textContent = "⚠️ Error loading data.";
    }
  }

  // 🔹 Hook up button listeners
  document.getElementById('scrapeBtn').addEventListener('click', scrapeNow);
  document.getElementById('askBtn').addEventListener('click', ask);
  document.getElementById('refreshBtn').addEventListener('click', refreshData);

  // 🔹 Load initial data on page load
  refreshData();
});
