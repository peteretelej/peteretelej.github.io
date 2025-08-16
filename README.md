# Let's Talk Code

My personal GitHub.io blog at [peteretelej.github.io](https://peteretelej.github.io). Custom built with Astro and React components for clean, simple design and interactive functionality.

This README is a guide for how you can fork this repo and set up your own blog using the same design and architecture.

## Forking this blog (simple guide to working with your copy)

### Requirements

- **Node.js 18+**: [Install here](https://nodejs.org/)
- **Git**: [Install here](https://git-scm.com/)

### Quick Start

1. **Fork the repo** on GitHub
2. **Clone your fork** (replace with your GitHub username):

```bash
git clone git@github.com:yourusername/yourusername.github.io.git
cd yourusername.github.io
```

3. **Install dependencies**:

```bash
npm install
```

4. **Start the development server**:

```bash
npm run dev
```

Your site will be available at `localhost:4321`. Changes you make will reflect automatically on refresh.

Codebase design: `docs/design.md`

### Customizing Your Blog

#### Update Site Info

Edit `src/config.ts` to change:

- Site title and description
- Your name and social links
- SEO settings

#### Add Your Content

Please delete the posts at `src/content/readme` and `src/content/notes` and replace them with your own content.

- They are just markdown files

Create new posts in `src/content/readme/` with this format:

```yaml
---
title: Your Post Title
subtitle: Optional subtitle
publishDate: 2024-01-15
tags: [javascript, tutorial, web-dev]
thumbnail: /images/your-image.png
---
Your post content here...
```

#### Customize Styling

- **Colors**: Edit the brand colors in `tailwind.config.js`
- **Fonts**: Update font imports in `src/styles/global.css`
- **Layout**: Modify components in `src/components/`

### Deployment to GitHub Pages

1. **Enable GitHub Pages** in your repo settings
2. **Build and deploy**:

```bash
npm run build
```

3. **Push to GitHub** - your site will be live at `yourusername.github.io`

### Built With

- **Astro 5** - Static site generator
- **Tailwind CSS** - Styling
- **React** - Interactive components
- **TypeScript** - Type safety
- **MDX** - Enhanced markdown

### Commands

| Command           | Action                               |
| ----------------- | ------------------------------------ |
| `npm install`     | Install dependencies                 |
| `npm run dev`     | Start dev server at `localhost:4321` |
| `npm run build`   | Build production site                |
| `npm run preview` | Preview build locally                |

### Features You Get

- Dark/light mode toggle
- Live search with keyboard navigation
- Mobile-responsive design
- SEO optimization
- RSS feed
- Fast performance (95+ Lighthouse scores)
- Tag-based organization
- Syntax highlighting for code blocks

---

Questions? Check out the [live example](https://peteretelej.github.io) or open an issue.
