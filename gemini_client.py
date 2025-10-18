# gemini_client.py
import os
from google import genai
from dotenv import load_dotenv

load_dotenv()

def call_gemini(messages, context=None):
    """Call Gemini with optional retrieval context."""
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("⚠️ LLM disabled: set GEMINI_API_KEY")
        return "(LLM disabled: set GEMINI_API_KEY)"

    try:
        client = genai.Client(api_key=api_key)

        prompt = ""
        if context:
            prompt += "Relevant formulary context:\n" + context + "\n\n"
        for msg in messages:
            prompt += f"{msg['role'].capitalize()}: {msg['content']}\n"

        response = client.models.generate_content(
            model="models/gemini-2.5-flash",
            contents=prompt
        )

        return response.text.strip() if response and hasattr(response, "text") else "(No response text)"
    except Exception as e:
        print(f"⚠️ Error calling Gemini: {e}")
        return f"(Gemini error: {e})"
