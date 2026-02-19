# 🔄 VibeSite — Automated Development Workflow

## Overview
Running `generate.cmd` executes a 6-phase pipeline that reads `site.properties`
and produces a fully deployable static website in the `dist/` folder.

---

## Phase 1 — INIT & PARSE 🏗️
**Agent:** ARCHITECT  
**Input:** `site.properties`  
**Output:** `.ai/logs/project-plan.json`, `dist/` folder scaffold

**Steps:**
1. Read and parse `site.properties` into key-value map
2. Validate required fields (ENTITY_NAME, PHONE_PRIMARY, EMAIL_PRIMARY)
3. Determine page list from `PAGES=` value
4. Create `dist/` directory structure
5. Copy `assets/` into `dist/assets/`
6. Log warnings for missing optional fields

```
dist/
├── index.html          ← home
├── about.html
├── services.html
├── team.html
├── gallery.html
├── contact.html
├── assets/
│   ├── logo.png
│   └── ...
├── styles/
│   ├── tokens.css
│   ├── main.css
│   └── pages/
├── scripts/
│   └── main.js
├── sitemap.xml
└── robots.txt
```

---

## Phase 2 — DESIGN SYSTEM 🎨
**Agent:** DESIGNER  
**Input:** brand values from `site.properties`  
**Output:** `dist/styles/tokens.css`, `dist/styles/main.css`

**Steps:**
1. Extract `PRIMARY_COLOR`, `SECONDARY_COLOR`, `FONT_HEADING`, `FONT_BODY`
2. Generate CSS custom property tokens
3. Build typography scale (h1–h6, body, caption)
4. Create component classes: `.btn`, `.card`, `.section`, `.container`
5. Generate responsive grid utilities
6. Write dark mode CSS media queries

---

## Phase 3 — PAGE GENERATION 💻
**Agent:** FRONTEND  
**Input:** tokens.css + page content from properties  
**Output:** all HTML pages in `dist/`

**Steps per page:**
1. Load page template from `templates/[page].html`
2. Replace all `{{TOKEN}}` placeholders with properties values
3. Build dynamic sections (services loop, team loop, testimonials loop)
4. Inject navigation with active page state
5. Add footer with social links, copyright
6. Write final HTML to `dist/[page].html`

**Template tokens used:**
```
{{ENTITY_NAME}}     {{ENTITY_TAGLINE}}    {{PRIMARY_COLOR}}
{{LOGO_PATH}}       {{PHONE_PRIMARY}}     {{EMAIL_PRIMARY}}
{{ADDRESS_LINE1}}   {{SOCIAL_FACEBOOK}}   {{META_TITLE}}
... (all properties keys)
```

---

## Phase 4 — SEO OPTIMISATION 🔍
**Agent:** SEO  
**Input:** all generated HTML files + meta properties  
**Output:** updated HTML with meta tags, `sitemap.xml`, `robots.txt`

**Steps:**
1. Inject `<meta>` tags: title, description, keywords, author
2. Add Open Graph tags for social sharing
3. Add Twitter Card meta tags
4. Inject JSON-LD structured data (LocalBusiness / School schema)
5. Add canonical URL tags
6. Generate `sitemap.xml` listing all pages
7. Write `robots.txt` allowing all crawlers
8. Add preload hints for fonts and hero images

---

## Phase 5 — DEPLOY PREP 🚀
**Agent:** DEPLOYER  
**Input:** `DEPLOY_TARGET`, `GITHUB_REPO_URL`, `CUSTOM_DOMAIN`  
**Output:** deployment config files

**For `github-pages`:**
- Creates `.github/workflows/deploy.yml` (GitHub Actions)
- Creates `_config.yml` if Jekyll needed
- Creates `CNAME` file if `CUSTOM_DOMAIN` is set

**For `vercel`:**
- Creates `vercel.json` with routing rules
- Creates `package.json` stub for Vercel detection

**For `netlify`:**
- Creates `netlify.toml` with publish directory
- Creates `_redirects` file

**Always creates:**
- `.gitignore`
- `README.md` with setup instructions
- `404.html` error page

---

## Phase 6 — QA PASS 🧪
**Agent:** QA  
**Input:** all files in `dist/`  
**Output:** `.ai/logs/qa-report.md`

**Checks:**
- [ ] All `{{TOKEN}}` placeholders replaced (zero remaining)
- [ ] All internal `href` links point to existing pages
- [ ] All `<img src>` paths exist in `dist/assets/`
- [ ] `<html lang>` attribute present on all pages
- [ ] `<meta charset>` and `<meta viewport>` present
- [ ] `<title>` tags populated and unique per page
- [ ] No duplicate `id` attributes within a page
- [ ] Contact form has `action` or JS handler
- [ ] Social links use `rel="noopener noreferrer"`
- [ ] Footer copyright year matches current year

**QA Report format:**
```
# QA Report — [timestamp]
## ✅ PASS (9/10 checks)
## ❌ FAIL
- index.html: img src `assets/team/ravi.jpg` not found
## ⚠️ WARNINGS
- SOCIAL_GITHUB is empty, link omitted
```

---

## Rerunning the Generator
You can safely re-run `generate.cmd` at any time.  
The `dist/` folder is fully regenerated each run.  
Your `site.properties` and `assets/` are never modified.
