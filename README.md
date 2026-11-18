# Quora, Reconsidered — Accessibility Audit

A three-page, static website for a preliminary manual accessibility evaluation of Quora's question-creation journey.

## Files

- `index.html` — Quora overview, testing context, user flow and screenshot evidence.
- `guidelines.html` — WCAG 2.2 findings, evidence status, design recommendations and illustrative code examples.
- `about.html` — evaluator perspective and accessibility features built into this report website.
- `styles.css` — responsive visual design.
- `script.js` — reading preferences and copy-code controls.
- `assets/` — screenshots supplied for this project.

## Run locally

Open `index.html` in a browser. No build step or package installation is required.

## Publish with GitHub Pages

1. Create a new GitHub repository.
2. Upload the contents of this folder (not the ZIP file itself).
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)` folder, then save.
6. Wait for GitHub Pages to publish the site.

## Accessibility features included

- Skip link to main content.
- Semantic landmarks, page titles, headings and lists.
- Keyboard-visible focus indicators.
- Responsive layout and reduced-motion support.
- Descriptive alternative text for evidence screenshots.
- Reading controls for paragraph text size, line/paragraph spacing and optional bionic-style emphasis.
- Live announcements for reading preference changes and code-copy feedback.
- Native links and buttons.

## Important audit limitations

This is a preliminary student evaluation, not a formal WCAG conformance claim. Findings are labelled as observed or requiring verification. The Quora screenshots cannot prove DOM semantics, computed accessible names, live-region behaviour or exact contrast ratios.

The code snippets on the WCAG page are illustrative patterns, not copied from Quora. Inspect the actual HTML and accessibility tree before reporting a code-level failure.

The bionic-style reading control is an optional visual preference, not a proven accessibility accommodation. Google Fonts are loaded from Google Fonts when online; system fallbacks are provided.
