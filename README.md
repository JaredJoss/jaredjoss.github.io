# jossy.co.za

Personal site of Jared Joselowitz — research engineer working on LLMs for healthcare. Single-page portfolio covering about, research & publications, and wildlife photography.

Live at **[jossy.co.za](https://jossy.co.za)**.

![Screenshot of the landing page](docs/landing-page.png)

## Stack

- [Vite](https://vitejs.dev/) + React 18 + TypeScript
- Tailwind CSS with [shadcn/ui](https://ui.shadcn.com/) components (`src/components/ui`)
- React Router (`/` and a catch-all 404)

## Local development

Requires Node.js 20 (the version CI builds with).

```sh
npm install
npm run dev      # http://localhost:8080
```

Other scripts:

| Script | Purpose |
| --- | --- |
| `npm run build` | Production build to `dist/` |
| `npm run build:dev` | Build in development mode |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint |
| `npm run cv` | Render every `cv/*.yaml` to `public/<name>.pdf` |

## Content

Almost all page content is hardcoded as constants in [`src/pages/Index.tsx`](src/pages/Index.tsx) — the cycling job titles, publications, experience, and photo grid. To add a publication, append to `PUBLICATIONS`:

```ts
{
  year: "2026",
  venue: "IWSDS 2026",
  title: "...",
  description: <>...</>,
  tags: ["#ASR", "#Clinical"],
  link: "https://arxiv.org/abs/...",
  status: "Published",        // or "Preprint" — renders a yellow badge
  presentation: "Oral",       // optional, renders a violet badge
  codeLink: "https://github.com/...",  // optional "View Code" button
}
```

Static assets (`cv.pdf`, `research_cv.pdf`, `profile.jpeg`, `photos/`, `og-image.jpg`, `robots.txt`) live in `public/` and are served from the site root.

## CVs

CV PDFs under `public/` are generated from YAML, not hand-uploaded. Each source file `cv/<name>.yaml` renders to `public/<name>.pdf` via [RenderCV](https://docs.rendercv.com/) (Typst under the hood — no LaTeX toolchain needed). Currently that is [`cv/research_cv.yaml`](cv/research_cv.yaml) → `public/research_cv.pdf`; add another CV by dropping a new `cv/<name>.yaml` in — no other change needed.

```sh
npm run cv       # rewrites every public/<name>.pdf from cv/*.yaml, ~1s each
```

The script creates a virtualenv in `cv/.venv` on first run and needs `uv` or Python >= 3.11. Edit a YAML, re-render, and commit the YAML and its PDF together — [`.github/workflows/cv.yml`](.github/workflows/cv.yml) re-renders on PRs and fails if any committed PDF's text no longer matches its YAML.

### Editing

Everything above the `design:` key is content; everything below it is layout. To change a CV, edit the `cv.sections` entries — e.g. to add a job:

```yaml
    EXPERIENCE:
      - company: Ufonia
        position: Lead AI Research Engineer
        start_date: 2025-02
        end_date: present        # or a YYYY-MM date
        location: London, United Kingdom
        highlights:
          - Developing LLM-based clinical conversational systems.
```

Section names are arbitrary (they render verbatim, hence the all-caps keys). Entry shapes are fixed per section: `EDUCATION` uses `institution`/`area`/`degree`, `EXPERIENCE` uses `company`/`position`, normal entries (e.g. `SELECTED RESEARCH CONTRIBUTIONS`) use `name`/`summary`, `PUBLICATIONS` uses `title`/`authors`/`journal`, `TECHNICAL SKILLS` uses `label`/`details`, and `ACHIEVEMENTS` uses `bullet`. Highlight text supports Markdown, including links: `[ASTRID](https://aclanthology.org/...)`.

Then run `npm run cv` and commit `cv/<name>.yaml` and `public/<name>.pdf` together.

### Layout

The `design:` block controls fonts, colours, margins, and spacing, plus the row templates for each entry type. For example, experience entries render the company on the first row and the position underneath, with the date and location right-aligned:

```yaml
  templates:
    experience_entry:
      main_column: "**COMPANY**\n*POSITION*\nSUMMARY\nHIGHLIGHTS"
      date_and_location_column: "DATE\n*LOCATION*"
```

Options are documented in the [RenderCV design reference](https://docs.rendercv.com/user_guide/structure_of_the_yaml_input_file/). The version is pinned in [`cv/requirements.txt`](cv/requirements.txt) because the design schema changes between minor releases.

## Environment variables

The footer shows the most recent Last.fm track when these are set (create a `.env` locally; they're configured as repository secrets for CI):

```sh
VITE_LASTFM_API_KEY=...
VITE_LASTFM_USERNAME=...
```

Both are inlined into the client bundle at build time, so treat the key as public. The footer's visit counter uses [counterapi.dev](https://counterapi.dev/) and needs no configuration.

## Deployment

Hosted on GitHub Pages. Every push to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds with Node 20 and publishes `dist/` to the `github-pages` environment — no `gh-pages` branch involved.

The custom domain is configured in the repository's Pages settings (`jossy.co.za`, with `www` as a CNAME to `jaredjoss.github.io`) rather than via a `CNAME` file in the repo. HTTPS is enforced.
