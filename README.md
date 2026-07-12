# Subash Limbu — Website

Static site for Subash Limbu: author of *Tracing the Yakthung*, creator of Shall Explore.
No build step. Plain HTML/CSS/JS, ready for GitHub Pages.

## Deploy to GitHub Pages (free)

**Option A — cleanest URL (`shallexplore.github.io`)**

1. On github.com, create a new repository under your `shallexplore` account named exactly
   `shallexplore.github.io`
2. Upload every file in this folder to the root of that repo (keep the `assets/` folder structure)
3. Go to repo **Settings > Pages** and confirm the source is `main` branch, `/ (root)`
4. Your site is live at `https://shallexplore.github.io/` within a few minutes

**Option B — project repo (e.g. `github.com/shallexplore/website`)**

1. Create any repo name you like and upload these files to the root
2. Settings > Pages > set source to `main` branch, `/ (root)`
3. Site is live at `https://shallexplore.github.io/website-repo-name/`
   (Option A is recommended, it avoids the extra path segment, which is cleaner for SEO)

## Before you publish, replace these placeholders

- `mailto:hello@shallexplore.com` in the Connect section — your real email
- The three "Get the Book" links (Amazon, Gumroad, Thuprai) in `index.html` under `id="book"`
- `assets/img/og-cover.jpg` — add a real 1200x630px image for social link previews (referenced in
  the Open Graph meta tags but not yet created)
- TikTok/Instagram URLs if they differ from `shallexplore`

## Custom domain (optional, still free hosting)

If you buy a domain (e.g. `subashlimbu.com`):
1. Add a `CNAME` file to the repo root containing just the domain name
2. Point your domain's DNS to GitHub Pages (A records to GitHub's IPs, or a CNAME record to
   `shallexplore.github.io`)
3. Enable "Enforce HTTPS" in repo Settings > Pages

## SEO / LLM discoverability included

- Semantic HTML with a single `h1`, proper heading hierarchy
- Meta description, Open Graph, and Twitter Card tags
- JSON-LD structured data for `Person` and `Book` (schema.org) — this is what lets Google and
  AI answer engines understand who you are and what you've published, not just index your text
- `robots.txt` explicitly allowing major AI crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.)
- `sitemap.xml`
- `llms.txt` — a plain-text summary of the site, following the emerging convention some LLM
  crawlers read directly instead of parsing HTML

After deploying, submit the site to Google Search Console and add the sitemap URL there for
faster indexing.
