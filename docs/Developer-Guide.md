# Developer Guide

Version: 1.0

## Purpose

This document defines the standards, architecture and development workflow for the Warhammer Platform project.

---

# 1. Project Principles

- Build for beginners first.
- Prefer simplicity over cleverness.
- Build reusable components.
- Separate content from code.
- Keep one responsibility per file.
- Optimise for readability and maintainability.

---

# 2. Folder Structure

```text
warhammer-platform/
├── assets/
├── css/
├── data/
├── docs/
├── images/
├── js/
├── favicon/
├── index.html
├── journey.html
├── factions.html
├── tools.html
├── resources.html
└── events.html
```

---

# 3. HTML Standards

- Semantic HTML.
- Four-space indentation.
- Double quotes.
- Comment major sections only.

Example:

```html
<!-- ========================================
     MAIN CONTENT
======================================== -->
```

---

# 4. CSS Standards

Files:
- styles.css
- base.css
- navigation.css
- structure.css
- sections.css
- components.css
- utilities.css
- responsive.css

Use section comments:

```css
/* ========================================
   SECTION NAME
======================================== */
```

---

# 5. JavaScript Standards

Every file begins with:

```javascript
/*
========================================
File:
example.js

Purpose:
Brief description.
========================================
*/
```

Use JSDoc for significant functions.

Rules:

- const by default.
- let only when required.
- Never use var.
- One responsibility per function.
- One responsibility per file.
- Use ES modules.
- Handle errors gracefully.

---

# 6. JSON Standards

- Four-space indentation.
- Double quotes.
- No trailing commas.
- Include metadata where useful.
- Document complex structures separately.

---

# 7. Naming Conventions

Files: lowercase-hyphen-separated

Functions: camelCase

Classes/IDs: lowercase-hyphen-separated

---

# 8. Comments

Comment WHY, not WHAT.

Do not comment obvious code.

---

# 9. Git Workflow

```bash
git status
git add .
git status
git commit -m "Meaningful commit message"
git push
```

One logical change per commit.

---

# 10. Architecture

- Modular CSS
- Modular JavaScript
- Reusable components
- JSON-driven decision engine

---

# 11. Development Workflow

1. Design
2. Implement
3. Test
4. Commit
5. Push

---

# 12. Code Review Checklist

- Formatting
- Indentation
- Comments
- Naming
- Correct file placement
- No duplicated code
- Tested locally

---

# 13. Documentation

Project documentation:

- Developer-Guide.md
- Architecture.md
- Product-Bible.md
- Decision-Log.md
- Roadmap.md

---

# 14. AI Development Rules

Generated code must:

- Include the full file path.
- Provide complete files whenever practical.
- Otherwise provide one complete replacement block.
- Preserve four-space indentation.
- Avoid unnecessary blank lines.
- Follow this guide.

---

# 15. Technology Stack

Current:

- HTML
- CSS
- JavaScript
- JSON
- Git
- GitHub

Introduce new technologies only when they provide a clear architectural benefit.
