# Mercs MSA Website

The public website for Mercs MSA, a high school STEAM organization. It is also a
real-world teaching project: students build and maintain it, and the codebase is
meant to be inherited by the students who come after them.

This README is the first thing a future developer should read. Keep it current.

## The stack, in plain language

| Tool | What it does |
| --- | --- |
| **Astro** | The site builder. Turns the files in `src/` into a fast static website. |
| **Sveltia CMS** | A no-code editor (at `/admin`) for writing content without touching code. A modern, drop-in replacement for Decap CMS. |
| **GitHub** | Where the code lives and every change is tracked. Repo: `Mercs-MSA/2026-MSA-Website`. |
| **Cloudflare Pages** | Hosts the site and rebuilds it automatically on every push. Gives each pull request its own preview URL. |

## Run it on your own computer

You need **Node.js 22.12 or newer** (the LTS line — avoid odd-numbered versions
like 23; Astro doesn't support them). This repo's `.nvmrc` pins Node 22.

```sh
npm install      # download dependencies (one time)
npm run dev      # start the local dev server at http://localhost:4321
```

Then open the address it prints. Edit a file in `src/`, save, and the browser
updates on its own.

| Command | Action |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Local dev server at `localhost:4321` |
| `npm run build` | Build the production site to `./dist/` |
| `npm run preview` | Preview the production build locally |

## How the project is organized

```text
src/
  pages/            Each file is a page. The file path becomes the URL.
    index.astro       Homepage
    about.astro       /about            (placeholder)
    events.astro      /events           (placeholder)
    contact.astro     /contact          (placeholder)
    news/
      index.astro     /news             (lists all news posts)
      [...slug].astro  one page per news post
  layouts/
    BaseLayout.astro  The shared page shell (head, header, footer).
  components/
    Header.astro      Site header + navigation (on every page)
    Footer.astro      Site footer (on every page)
  styles/
    global.css        Site-wide styles + design tokens (the design student's home base)
  content/
    news/             News posts as Markdown files (edited via the CMS)
  content.config.ts   Defines the shape of the "news" collection
public/
  admin/              The Sveltia CMS editor (index.html + config.yml)
  uploads/            Images uploaded through the CMS land here
```

The placeholder pages and navigation are intentional starting points — the
content student's sitemap decides the real structure, and the design student
owns the look.

## Editing content through the CMS

Once CMS authentication is set up (see below), go to `/admin` and sign in with a
GitHub account that belongs to the Mercs-MSA org. Saving an edit opens a pull
request rather than publishing instantly, so changes can be reviewed on a Cloudflare
preview URL before they go live.

## CMS authentication setup (one-time, coach task)

Cloudflare Pages does **not** provide GitHub login for the CMS by itself. A small
OAuth handler has to be deployed once:

1. Create a **GitHub OAuth App** in the Mercs-MSA org settings
   (Settings → Developer settings → OAuth Apps). Note the Client ID and secret.
2. Deploy the **`sveltia-cms-auth`** Cloudflare Worker (open source). Set the
   Client ID and secret as Worker secrets, and set the GitHub OAuth App's
   callback URL to the worker's `/callback` URL.
3. Put the worker's URL into `public/admin/config.yml` under
   `backend.base_url`.

Until that's done, the rest of the site works fine — only the `/admin` login is
blocked.

## Deployment

Cloudflare Pages is connected to this repo. A push to `main` rebuilds and
publishes the production site; opening a pull request publishes a preview URL for
review. Build settings: build command `npm run build`, output directory `dist`,
and set the environment variable `NODE_VERSION=22.12.0` (Cloudflare's default
Node is too old).

## Accounts and access (who to ask — never passwords)

- **GitHub org (`Mercs-MSA`)** — controls the code and who can edit. A coach/org
  holds owner access.
- **Cloudflare** — hosting and DNS. On an org-controlled account, not a personal one.
- **Domain registrar (Bluehost)** — domain registration. Renews ~$12–15/year.

Owner-level access to all three is held by the organization/coach, never by a
single student's personal account — so the site survives turnover.

## License

MIT — see [LICENSE](./LICENSE).
