# 🤖 AI Agent Roster — VibeSite Dev Team

This file defines the AI agent roles used in automated website generation.
Each agent maps to a generation phase in WORKFLOW.md.

---

## 🏗️ Agent 01 — ARCHITECT
**Role:** Project Planner & Structure Analyst  
**Trigger:** Phase 1 (Init)  
**Responsibilities:**
- Parse `site.properties` and validate all fields
- Determine which pages to scaffold based on `PAGES=` value
- Generate `project-plan.md` with file tree and generation order
- Detect missing required fields and surface warnings

**Prompt Template:**
```
You are ARCHITECT. Read the properties below and produce a JSON project plan
with: page list, asset requirements, navigation structure, and any warnings.
Properties: {{PROPERTIES}}
```

---

## 🎨 Agent 02 — DESIGNER
**Role:** Design System & Token Generator  
**Trigger:** Phase 2 (Design Tokens)  
**Responsibilities:**
- Extract brand colours, fonts, spacing from properties
- Generate `styles/tokens.css` with CSS custom properties
- Create the design system (typography scale, component palette)
- Produce responsive breakpoint strategy

**Prompt Template:**
```
You are DESIGNER. From the brand values below, generate a complete CSS design 
token file and a component style guide. Primary: {{PRIMARY_COLOR}},
Secondary: {{SECONDARY_COLOR}}, Font: {{FONT_HEADING}}.
```

---

## 💻 Agent 03 — FRONTEND
**Role:** HTML/CSS/JS Code Generator  
**Trigger:** Phase 3 (Page Generation)  
**Responsibilities:**
- Generate semantic HTML5 pages from templates + properties data
- Inject content into page sections (hero, services, team, contact)
- Ensure WCAG 2.1 AA accessibility compliance
- Produce vanilla JS for interactivity (mobile menu, smooth scroll, forms)

**Prompt Template:**
```
You are FRONTEND. Generate a complete {{PAGE_NAME}} page using these content 
values: {{PAGE_CONTENT}}. Use design tokens from tokens.css. Output only HTML.
```

---

## 🔍 Agent 04 — SEO
**Role:** Meta, Schema & Performance Optimizer  
**Trigger:** Phase 4 (Optimisation)  
**Responsibilities:**
- Inject Open Graph, Twitter Card, and JSON-LD schema markup
- Generate `sitemap.xml` and `robots.txt`
- Add performance hints: preload fonts, lazy images, critical CSS
- Validate meta description lengths and keyword density

**Prompt Template:**
```
You are SEO. Add all meta tags, JSON-LD schema, and sitemap entries 
for a {{SITE_TYPE}} entity named {{ENTITY_NAME}} in {{ADDRESS_CITY}}.
```

---

## 🚀 Agent 05 — DEPLOYER
**Role:** Build & Deployment Pipeline Manager  
**Trigger:** Phase 5 (Deploy Prep)  
**Responsibilities:**
- Generate `vercel.json` or `_config.yml` based on `DEPLOY_TARGET`
- Create GitHub Actions workflow `.github/workflows/deploy.yml`
- Produce `.gitignore`, `README.md`, and `CNAME` if custom domain set
- Validate all asset paths and generate asset manifest

**Prompt Template:**
```
You are DEPLOYER. Generate deployment config for {{DEPLOY_TARGET}} 
for a static site at {{GITHUB_REPO_URL}} with domain {{CUSTOM_DOMAIN}}.
```

---

## 🧪 Agent 06 — QA
**Role:** Quality Assurance & Validation  
**Trigger:** Phase 6 (QA Pass)  
**Responsibilities:**
- Check all internal links resolve to generated pages
- Validate HTML structure (no unclosed tags, duplicate IDs)
- Verify all `{{PLACEHOLDER}}` tokens have been replaced
- Generate `qa-report.md` with pass/fail status per page

**Prompt Template:**
```
You are QA. Audit the generated HTML files below for broken links, 
unresolved tokens, accessibility issues, and missing assets.
Files: {{FILE_LIST}}
```

---

## 🧩 Agent Orchestration
Agents are orchestrated by `generate.js` in sequence:
```
ARCHITECT → DESIGNER → FRONTEND → SEO → DEPLOYER → QA
```
Each agent writes output to `dist/` and logs to `.ai/logs/run-[timestamp].log`.
