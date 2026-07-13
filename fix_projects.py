import re

with open('src/data/projects.ts', 'r') as f:
    content = f.read()

# Replace embedUrl: "https://www.youtube.com/embed/" + project.id, with the correct string
def repl(m):
    id_val = m.group(1)
    return f'id: "{id_val}",\n    embedUrl: "https://www.youtube.com/embed/{id_val}",'

content = re.sub(r'id: "([^"]+)",\n\s+title:[^\n]+\n\s+embedUrl: "https://www\.youtube\.com/embed/" \+ project\.id,', lambda m: m.group(0).replace('embedUrl: "https://www.youtube.com/embed/" + project.id,', f'embedUrl: "https://www.youtube.com/embed/{m.group(1)}",'), content)

with open('src/data/projects.ts', 'w') as f:
    f.write(content)
