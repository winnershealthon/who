# 🧠 VibeSite — AI Prompts & Skills Library

Use these prompts with GitHub Copilot Chat, Claude, or any LLM to extend
or regenerate parts of your website. Copy the prompt, fill in the brackets,
and paste into your AI assistant.

---

## 🎯 SKILL: Generate New Page

```
I am building a static website for {{ENTITY_NAME}}.
The site uses these brand colours: Primary {{PRIMARY_COLOR}}, Secondary {{SECONDARY_COLOR}}.
Font: {{FONT_HEADING}}.

Generate a complete, self-contained HTML page for: [PAGE_NAME]

Requirements:
- Use the same nav and footer structure as index.html
- Include proper semantic HTML5 elements
- Reference styles/tokens.css and styles/main.css
- Mobile-first responsive layout
- Add the page to sitemap.xml

Page content: [DESCRIBE WHAT SHOULD BE ON THE PAGE]
```

---

## 🎯 SKILL: Add New Service Card

```
Add a new service card to services.html.
Existing cards follow this pattern: [PASTE EXISTING SERVICE CARD HTML]

New service details:
- Title: [SERVICE TITLE]
- Description: [SERVICE DESCRIPTION]  
- Icon (emoji or SVG): [ICON]

Maintain the same CSS classes and structure. Return only the new card HTML.
```

---

## 🎯 SKILL: Customise Hero Section

```
Update the hero section of index.html.
Current hero: [PASTE CURRENT HERO HTML]

Changes needed:
- New headline: [HEADLINE]
- New subtext: [SUBTEXT]
- Background: [solid colour #HEX | gradient from #HEX to #HEX | image assets/hero.jpg]
- CTA button: [BUTTON TEXT] linking to [PAGE OR ANCHOR]

Return the updated hero section HTML only.
```

---

## 🎯 SKILL: Add Google Maps Embed

```
Add a Google Maps embed to the contact page of my static website.
Business address: {{ADDRESS_LINE1}}, {{ADDRESS_CITY}}, {{ADDRESS_STATE}} {{ADDRESS_PINCODE}}

Generate:
1. The iframe embed code (responsive, 100% width, 400px height)
2. CSS to make it mobile-friendly
3. A "Get Directions" button that opens Google Maps in a new tab

Return only the HTML/CSS snippet.
```

---

## 🎯 SKILL: Generate FAQ Section

```
Generate a FAQ accordion section for a {{SITE_TYPE}} called {{ENTITY_NAME}}.

Create 8 relevant FAQs covering: services, pricing, location, contact, 
working hours, and unique selling points.

Use vanilla JS for accordion toggle (no jQuery/libraries).
Style with CSS custom properties (--primary, --secondary from tokens.css).
Return complete HTML + CSS + JS as a single self-contained snippet.
```

---

## 🎯 SKILL: Dark Mode Toggle

```
Add a dark/light mode toggle to the website.
The site uses CSS custom properties in styles/tokens.css.

Generate:
1. A toggle button (sun/moon icon) for the navbar
2. CSS: [data-theme="dark"] overrides for all --color-* tokens
3. Vanilla JS to toggle theme + persist choice in localStorage

The current nav HTML is: [PASTE NAV HTML]
Return the updated nav, CSS additions, and JS.
```

---

## 🎯 SKILL: Contact Form with Formspree

```
Add a working contact form to contact.html using Formspree (free tier, no backend needed).

Form fields needed: Name, Email, Phone, Message, Subject dropdown.

Requirements:
- Client-side validation (required fields, email format)
- Loading spinner on submit
- Success/error message display
- Replace [YOUR_FORMSPREE_ID] with a placeholder comment
- No jQuery — vanilla JS only

Return the complete form HTML + CSS + JS.
```

---

## 🎯 SKILL: Performance Audit Checklist Prompt

```
Audit this static website's index.html for performance issues.
[PASTE index.html CONTENTS]

Check and fix:
1. Images missing width/height attributes (causes CLS)
2. Missing font-display: swap on @font-face
3. Render-blocking scripts (move to bottom or add defer/async)
4. Missing preload for hero image and critical fonts
5. Large inline styles that should be in external CSS
6. Missing rel="preconnect" for Google Fonts

Return a diff of changes needed.
```

---

## 🎯 SKILL: Add Blog/News Section

```
Add a blog listing page (blog.html) and a single post template (post.html)
to the static website for {{ENTITY_NAME}}.

The listing page should show: title, date, excerpt, read-more link, category tag.
The post template should have: title, author, date, featured image, body, share buttons.

Use no CMS — posts are static HTML files in a /blog/ subfolder.
Generate: blog.html, blog/post-template.html, and 2 sample post files.
```

---

## 🎯 SKILL: Extend site.properties

```
I want to add a [FEATURE] section to my vibesite website.
My current site.properties ends at line [LINE NUMBER].

Suggest new property keys for: [FEATURE]
Follow the same naming convention (SECTION_FIELD_SUBFIELD).
Include comments explaining each field.
Return only the new properties block to append to site.properties.
```

---

## 📋 Copilot Workspace Prompts (VSCode)

These short prompts work in GitHub Copilot Chat (`Ctrl+Shift+I`):

| What you want | Copilot prompt |
|---|---|
| Fix broken nav | `Fix the mobile hamburger menu in main.js — clicking doesn't toggle the nav` |
| Improve hero | `Make the hero section in index.html more visually impactful with a gradient overlay` |
| Add animations | `Add subtle scroll-triggered fade-in animations to all .card elements using Intersection Observer` |
| Fix layout | `The services grid in services.html breaks at 768px viewport — fix the CSS grid` |
| Add favicon | `Generate the HTML link tags for a favicon using assets/logo.png` |
| Better footer | `Redesign the footer in index.html — 3 columns: links, contact, social` |
