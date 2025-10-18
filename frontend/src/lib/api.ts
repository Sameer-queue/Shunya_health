const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const callAPI = async (endpoint: string, method = 'GET', body?: any) => {
  const options: RequestInit = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };
  if (body) options.body = JSON.stringify(body);

  const res = await fetch(`${API_BASE}${endpoint}`, options);
  if (!res.ok) throw new Error(`API Error: ${res.statusText}`);
  return res.json();
};
