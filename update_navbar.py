import re

with open('src/components/layout/Navbar.tsx', 'r') as f:
    content = f.read()

# Add PERSONAL_INFO to import from @/src/data
if 'PERSONAL_INFO' not in content:
    content = re.sub(r"import \{ ([^}]+) \} from '@/src/data';", r"import { \1, PERSONAL_INFO } from '@/src/data';", content)
    if "import { PERSONAL_INFO" not in content and "import {" not in content:
        # maybe it's not imported at all
        pass

# if no import from @/src/data
if "from '@/src/data'" not in content:
    content = "import { PERSONAL_INFO } from '@/src/data';\n" + content

# Replace image src and alt
content = re.sub(
    r'src="https://images.unsplash.com[^"]+"',
    r'src={PERSONAL_INFO.profileImage}',
    content
)
content = re.sub(
    r'alt="Narottam Sharan"',
    r'alt="Narottam Sharan - Creative Video Editor"',
    content
)

with open('src/components/layout/Navbar.tsx', 'w') as f:
    f.write(content)
