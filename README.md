# Jared Joselowitz - Personal Website

Personal website showcasing AI research, publications, and wildlife photography.

## Project Structure

```
src/
├── components/          # React components
│   ├── Hero.tsx        # Landing section with name and bio
│   ├── About.tsx       # About section with description
│   ├── Research.tsx    # Publications list with links
│   ├── Photography.tsx # Wildlife photography gallery
│   ├── Contact.tsx     # Social links (email, LinkedIn, GitHub, Google Scholar)
│   └── Navigation.tsx  # Top navigation bar
├── assets/             # Images (profile, wildlife photos, hero background)
├── pages/              # Page components
└── main.tsx           # App entry point

public/
└── cv.pdf             # Downloadable CV
```

## Key Sections

- **Hero**: Name, tagline, quick navigation
- **About**: Professional bio focused on healthcare LLM research
- **Research**: 6 publications spanning 2022-2025
- **Photography**: Wildlife photography gallery with modal view
- **Contact**: Social media and professional links

## Tech Stack

React + TypeScript + Vite + Tailwind CSS + shadcn/ui

## Development

```bash
npm install
npm run dev
```

## Deployment

This site is configured for GitHub Pages with automatic deployment.

### Setup GitHub Pages

1. Go to your repository Settings > Pages
2. Under "Build and deployment", select:
   - **Source**: GitHub Actions
3. Push to the `main` branch to trigger automatic deployment

### Manual Deployment

```bash
npm run deploy
```

**Note**: If using a custom domain or `username.github.io`, update the `base` path in `vite.config.ts` to `"/"` instead of `"/jared-joselowitz-personal-website/"`
