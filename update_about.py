import re

with open('src/components/sections/About.tsx', 'r') as f:
    content = f.read()

# Add imports
content = re.sub(r"import \{ EXPERIENCES \} from '@/src/data';", r"import { EXPERIENCES, PERSONAL_INFO, CERTIFICATES } from '@/src/data';", content)

# Replace Image
content = re.sub(
    r'<img\s+src="https://images.unsplash.com[^"]+"\s+alt="Narottam Sharan Portrait"\s+className="w-full h-full object-cover"\s+/>',
    r'<img\n            src={PERSONAL_INFO.profileImage}\n            alt="Narottam Sharan - Creative Video Editor"\n            loading="lazy"\n            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"\n          />',
    content
)

# Make the container circular in About.tsx
content = re.sub(
    r'className="relative aspect-\[3/4\] w-full max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden border border-border-subtle"',
    r'className="relative aspect-square w-full max-w-sm mx-auto lg:mx-0 rounded-full overflow-hidden border border-border-subtle hover:border-border-medium transition-colors"',
    content
)

# Replace Certifications
cert_block = """<h3 className="text-sm font-mono text-text-secondary uppercase mb-6 flex items-center gap-2">
              <Award className="w-4 h-4" /> Certifications
            </h3>
            <div className="flex flex-col gap-4">
              {CERTIFICATES.map((cert, index) => (
                <div key={cert.id} className={`flex justify-between items-center ${index !== CERTIFICATES.length - 1 ? 'border-b border-border-subtle pb-4' : ''}`}>
                  <span className="font-medium text-text-primary">{cert.title}</span>
                  <span className="text-xs font-mono text-text-secondary">{cert.issuer}</span>
                </div>
              ))}
            </div>"""

content = re.sub(
    r'<h3 className="text-sm font-mono text-text-secondary uppercase mb-6 flex items-center gap-2">[\s\S]*?</div>\s*</div>',
    cert_block,
    content
)

with open('src/components/sections/About.tsx', 'w') as f:
    f.write(content)
