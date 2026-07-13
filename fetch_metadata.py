import urllib.request
import json
import re

ids = [
    "3i_Jm0v8eII", "gdT3sYKeS4w", "Ef9tXPJFoAg", "jFRUQFfjmXE", 
    "_doFcCKT92A", "EdgAYZ2Hq9g", "VWti8jfHGJY", "GZQA6iZxlcg", 
    "zT-TQH5dd_I", "E6sB17ZdDV0"
]

results = {}

for vid in ids:
    url = f"https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v={vid}&format=json"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            results[vid] = data
    except Exception as e:
        print(f"Error fetching {vid}: {e}")

with open('metadata.json', 'w') as f:
    json.dump(results, f, indent=2)
print("Done")
