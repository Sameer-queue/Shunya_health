import os
import json
from bs4 import BeautifulSoup

DEFAULT_URL = "https://www.horizonblue.com/providers/products-programs/pharmacy/pharmacy-programs/preferred-medical-drugs"

def save_json(entries, path):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(entries, f, ensure_ascii=False, indent=2)

def scrape_formulary(url: str = None):
    path = "data/preferred-medical-drugs.html"
    print(f"📂 Looking for: {path}")
    if not os.path.exists(path):
        print("⚠️ File not found!")
        return []

    with open(path, "r", encoding="utf-8") as f:
        html = f.read()
    print(f"✅ Loaded HTML ({len(html)} chars)")

    soup = BeautifulSoup(html, "lxml")
    tables = soup.find_all("table")
    print(f"🧾 Found {len(tables)} tables in the HTML")

    all_entries = []

    for table in tables:
        # Get table headers
        header_cells = [th.get_text(strip=True).lower() for th in table.find_all("th")]
        rows = table.find_all("tr")

        # Map column indices
        def get_idx(keyword):
            for i, h in enumerate(header_cells):
                if keyword in h:
                    return i
            return None

        idx_status = get_idx("status") or 0
        idx_name = get_idx("drug") or 1
        idx_code = get_idx("hcpcs") or 2
        idx_alt = get_idx("manufacturer") or 3

        for tr in rows[1:]:
            cells = [td.get_text(strip=True) for td in tr.find_all("td")]
            if len(cells) < 3:
                continue

            entry = {
                "preferred_status": cells[idx_status] if idx_status < len(cells) else None,
                "name": cells[idx_name] if idx_name < len(cells) else None,
                "code": cells[idx_code] if idx_code < len(cells) else None,
                "preferred_alternatives": [cells[idx_alt]] if idx_alt < len(cells) else [],
            }
            all_entries.append(entry)

    save_json(all_entries, "data/formulary.json")
    print(f"✅ Parsed {len(all_entries)} total entries across {len(tables)} tables.")
    return all_entries
