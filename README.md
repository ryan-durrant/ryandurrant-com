# ryandurrant.com

Static personal site for Ryan Durrant. Plain HTML, CSS, and JS — no build step. Ready for GitHub Pages.

## Local preview

- Open `index.html` in a browser, or
- From this directory: `npx serve` (or any static server), then visit the URL it prints (often `http://localhost:3000`).

No `package.json` or bundler is required.

## GitHub Pages setup

1. Push this repo to GitHub (e.g. `ryan-durrant/ryandurrant-com` or your preferred name).
2. In the repo: **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Choose branch **main** (or `master`) and folder **/ (root)**.
5. Save. Pages will publish the site from the repo root.

The `CNAME` file in this repo already contains `ryandurrant.com`, so GitHub Pages can attach the custom domain once DNS is set.

## Custom domain DNS

Point **ryandurrant.com** at GitHub Pages:

**A records** (apex `@`):

| Type | Host | Value |
|------|------|-------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

**Optional www** — CNAME `www` → `ryan-durrant.github.io` (adjust the GitHub username/org if your Pages site hostname differs).

After DNS propagates, in **Settings → Pages** confirm the custom domain is `ryandurrant.com` and enable HTTPS when available.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Single-page site (Home, About, Work, Book, Contact) |
| `styles.css` | Layout and theme |
| `script.js` | Mobile nav, year, light scroll polish |
| `CNAME` | Custom domain: `ryandurrant.com` |
| `README.md` | This file |

## Book CTA

The book section links to the Gumroad ebook ($2.99):  
https://durranty5.gumroad.com/l/iybsh  

Contact email in the HTML is a placeholder (`hello@ryandurrant.com`) — change it when ready.
