# 📋 VibeSite — Tasks, Roles & Feature Backlog

## Dev Team Roles (AI Agents mapping to real dev functions)

| Role | Agent | Responsibility | Output |
|------|-------|---------------|--------|
| Project Manager | ARCHITECT | Parse properties, plan structure | project-plan.json |
| UI/UX Designer | DESIGNER | Tokens, layout, design system | tokens.css, main.css |
| Frontend Dev | FRONTEND | HTML page generation | dist/*.html |
| SEO Specialist | SEO | Meta, schema, sitemap | meta tags, sitemap.xml |
| DevOps Engineer | DEPLOYER | CI/CD, config files | deploy.yml, vercel.json |
| QA Engineer | QA | Validation, bug detection | qa-report.md |

---

## 🏁 Sprint 0 — Project Setup (run once)

- [x] Create `site.properties` with all site details
- [x] Place logo in `assets/logo.png`  
- [x] Add team photos in `assets/team/`
- [x] Add hero image in `assets/hero.jpg`
- [ ] Install Node.js (v18+) — download from nodejs.org
- [ ] Run `generate.cmd` for first time

---

## 🔨 Sprint 1 — Core Pages

| Task | Agent | Status | File |
|------|-------|--------|------|
| Generate index.html (Home) | FRONTEND | auto | dist/index.html |
| Generate about.html | FRONTEND | auto | dist/about.html |
| Generate services.html | FRONTEND | auto | dist/services.html |
| Generate contact.html | FRONTEND | auto | dist/contact.html |
| Generate team.html | FRONTEND | auto | dist/team.html |
| Generate 404.html | FRONTEND | auto | dist/404.html |

---

## 🎨 Sprint 2 — Design & Branding

| Task | Agent | Status |
|------|-------|--------|
| CSS design tokens from brand colours | DESIGNER | auto |
| Typography scale | DESIGNER | auto |
| Responsive grid system | DESIGNER | auto |
| Dark mode support | DESIGNER | manual — see PROMPTS.md |
| Animation library | DESIGNER | manual — see PROMPTS.md |

---

## 🔍 Sprint 3 — SEO & Performance

| Task | Agent | Status |
|------|-------|--------|
| Open Graph meta tags | SEO | auto |
| JSON-LD LocalBusiness schema | SEO | auto |
| XML sitemap | SEO | auto |
| robots.txt | SEO | auto |
| Image lazy loading | SEO | auto |
| Google Analytics | SEO | manual — add GA_TRACKING_ID to properties |

---

## 🚀 Sprint 4 — Deployment

| Task | Agent | Status |
|------|-------|--------|
| GitHub Actions workflow | DEPLOYER | auto |
| vercel.json / netlify.toml | DEPLOYER | auto |
| CNAME for custom domain | DEPLOYER | auto (if CUSTOM_DOMAIN set) |
| README.md | DEPLOYER | auto |
| .gitignore | DEPLOYER | auto |

---

## 🧩 Optional Feature Backlog

Add these to `site.properties` when ready:

| Feature | Properties Key | Effort |
|---------|---------------|--------|
| Google Maps on contact page | MAP_EMBED_URL= | Low |
| Formspree contact form | FORMSPREE_ID= | Low |
| Google Analytics | GA_TRACKING_ID= | Low |
| Cookie consent banner | COOKIE_BANNER=true | Low |
| WhatsApp floating button | SOCIAL_WHATSAPP= | Low |
| Instagram photo feed | INSTAGRAM_FEED=true | Medium |
| Blog/news section | PAGES=...,blog | Medium |
| Live chat (Tawk.to) | TAWKTO_ID= | Medium |
| Pricing table page | PAGES=...,pricing | Medium |
| Testimonials slider | TESTIMONIAL_SLIDER=true | Medium |
| Gallery lightbox | GALLERY_LIGHTBOX=true | Medium |
| Multi-language support | LANGUAGES=en,ta,hi | High |
| CMS integration (Decap) | CMS=decap | High |
| Search functionality | SEARCH=true | High |

---

## 🐛 How to Report Issues

If the generated site has problems:

1. Check `.ai/logs/qa-report.md` for known issues
2. Check `.ai/logs/run-[latest].log` for generation errors
3. Use the PROMPTS.md skill prompts to fix specific issues with Copilot
4. Re-run `generate.cmd` after fixing `site.properties`

---

## 📅 Progress Log

| Date | Run # | Pages Generated | QA Status |
|------|-------|----------------|-----------|
| [auto-filled] | 1 | [auto-filled] | [auto-filled] |
