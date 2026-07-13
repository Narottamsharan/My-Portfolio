import urllib.request
import json

ids = ["GE4aiZVFxZY", "qNIV-Zm1bJw", "bOmuwIUXzn8"]
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

with open('metadata2.json', 'w') as f:
    json.dump(results, f, indent=2)
print("Done")
