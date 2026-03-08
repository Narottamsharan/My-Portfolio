# Narottam Sharan — Portfolio Website

> Personal portfolio for **Narottam Sharan**, Senior Video Editor & 3D Motion Designer based in Bhilai, India.

![Portfolio Preview](narottam.png)

---

## 👤 About

A cinematic portfolio website for a Senior Video Editor & 3D Motion Designer who specializes in scroll-stopping short-form reels, brand films, motion graphics, and 3D product visualization for international D2C brands.

**Currently at:** GrowMedia, Bengaluru  
**Previously:** Lead Video Editor — Google Developers Group, Bhilai

---

## 🗂️ Project Structure

```
portfolio/
├── index.html       # Main HTML — all sections and layout
├── style.css        # Complete styling (dark/light theme, animations)
├── main.js          # All interactivity and JS features
└── narottam.png     # Profile photo (used in nav, hero card, favicon)
```

---

## ✨ Features

| Feature | Description |
|---|---|
| 🌗 Dark / Light Theme | Toggle with persistent `localStorage` preference |
| 🖱️ Custom Cursor | Smooth magnetic cursor with label on work items |
| 🎨 Hero Canvas | Animated particle / line canvas background |
| 🃏 3D Tilt Card | Interactive profile card with parallax tilt effect |
| 📊 Skill Bars | Scroll-triggered animated skill percentage bars |
| 🔢 Count-Up Metrics | Animated stats counter in the hero section |
| 🎞️ Work Filter | Filter portfolio by All / Reels / Long Form / 3D Motion |
| 📷 Photo Upload | Visitor can swap the profile photo on the card |
| 🧲 Magnetic Buttons | Buttons with subtle magnetic hover pull effect |
| 📜 Scroll Reveal | Staggered fade-in animations on scroll |
| 📈 Read Progress Bar | Top-of-page reading progress indicator |
| 📱 Responsive Nav | Hamburger mobile menu with full-screen overlay |
| 🔡 Marquee Ticker | Infinite scrolling skills/tools marquee strip |
| 📬 Contact Form | Client-side contact form with validation |
| 🎬 Auto Video Gallery | Dynamically rendered embedded video grid |
| 🔗 Instagram Embed | Social proof / reel embeds via Instagram JS SDK |

---

## 🧩 Sections

1. **Hero** — Name, role, CTA buttons, animated metrics, profile card
2. **Marquee** — Skills & tools ticker strip
3. **About** — Bio, tech background, experience timeline (GrowMedia, GDG, Techstars, Airtel)
4. **Best Work** — Featured YouTube showreel embed
5. **Skills & Tools** — Tool tiles (Premiere Pro, After Effects, Blender, Photoshop) + skill bars
6. **Portfolio / Work** — Filterable grid of Reels, Long-Form Films, and 3D Motion work
7. **Services** — 6 service offerings (Short-Form, Brand Films, Motion Graphics, 3D Viz, Tech/SaaS, Thumbnails)
8. **Client Reviews** — 5 testimonials with KPI badges (GDG, Santosh Suna, Nadavi Loans, Techstars, Kriti Priya)
9. **Contact** — Contact info + inquiry form
10. **Footer** — Logo, social links, copyright

---

## 🛠️ Tech Stack

- **HTML5** — Semantic markup, single-page layout
- **CSS3** — Custom properties (CSS variables), flexbox, grid, keyframe animations
- **Vanilla JavaScript** — No frameworks, no build tools required
- **External:** [Instagram Embed SDK](https://www.instagram.com/embed.js)

---

## 🚀 Getting Started

No build step required. Just open the file in a browser:

```bash
# Clone or download the project
git clone https://github.com/your-username/narottam-portfolio.git
cd narottam-portfolio

# Open directly
open index.html
# or serve locally
npx serve .
```

> **Note:** Some embed features (Instagram, YouTube) require an internet connection to load.

---

## 🎨 Theming & Customization

All colors are defined as CSS custom properties in `style.css`:

```css
[data-theme="dark"] {
  --bg: #0a0a0a;
  --fg: #f5f5f5;
  --accent: /* brand accent color */;
  /* ... */
}
[data-theme="light"] {
  --bg: #ffffff;
  --fg: #111111;
  /* ... */
}
```

The theme preference is saved to `localStorage` under the key `ns-theme`.

---

## 📹 Replacing the Featured Video

In `index.html`, find the Best Work section and replace `dQw4w9WgXcQ` with your actual YouTube video ID:

```html
<iframe
  src="https://www.youtube.com/embed/YOUR_VIDEO_ID?rel=0&modestbranding=1&color=white"
  ...
```

---

## 📬 Contact

| Channel | Details |
|---|---|
| 📧 Email | narottamsharan.work@gmail.com |
| 📞 Phone / WhatsApp | +91 6205839643 |
| 💼 LinkedIn | [narottam-sharan-18b203218](https://www.linkedin.com/in/narottam-sharan-18b203218/) |
| 📍 Location | Bhilai, Chhattisgarh · Open to Remote |

---

## 📄 License

© 2026 Narottam Sharan. All rights reserved.  
This portfolio is personal and not open-sourced for redistribution.
