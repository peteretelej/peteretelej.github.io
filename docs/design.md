# Architecture Design Document

## Overview

Personal technical blog built with Astro 5, React, and Tailwind CSS. Static site generation with content-driven architecture and dual content collections.

## Technology Stack

- **Framework**: Astro 5 with SSG (Static Site Generation)
- **UI**: React 19 components + Astro components
- **Styling**: Tailwind CSS 4 with typography plugin
- **Content**: MDX with frontmatter schemas
- **Code Highlighting**: Shiki with GitHub themes
- **Deployment**: GitHub Pages
- **Testing**: Vitest with Playwright browser testing

## Architecture

### Content Management

#### Collections (`src/content.config.ts`)
- **readme**: Technical tutorials and guides
  - Schema: `title`, `subtitle?`, `publishDate`, `tags[]`, `thumbnail?`, `draft?`
  - Location: `src/content/readme/`
- **notes**: Short-form content and personal notes  
  - Schema: `title`, `publishDate`, `tags[]?`, `draft?`, `excerpt?`
  - Location: `src/content/notes/`

#### Content Processing
- Glob loader pattern: `**/*.{md,mdx}`
- Draft handling: visible in dev, hidden in production
- TypeScript validation via Zod schemas

### Routing Structure

#### Static Routes
- `/` - Homepage with hero section
- `/about` - About page
- `/search` - Search interface
- `/404` - Error page
- `/rss.xml` - RSS feed

#### Dynamic Routes
- `/readme/[...slug]` - Individual readme posts
- `/readme/` - Readme collection index
- `/notes/[...slug]` - Individual notes
- `/notes/` - Notes collection index
- `/notes/tag/[tag]` - Tag-filtered notes
- `/notes/tags` - All tags listing

### Component Architecture

#### Layout System
- `Base.astro` - Root layout with header/footer
- `ReadmePost.astro` - Readme post layout
- `NotesPost.astro` - Notes post layout

#### Astro Components
- `BaseHead.astro` - SEO meta tags
- `Header.astro` - Site navigation
- `Footer.astro` - Site footer with socials
- `FormattedDate.astro` - Date formatting
- `HeaderLink.astro` - Navigation links
- `NavigationPills.astro` - Content navigation
- `Comments.astro` - Giscus integration

#### React Components
- `Search.tsx` - Live search with keyboard navigation
- `ThemeToggle.tsx` - Dark/light mode switcher
- `MobileMenu.tsx` - Mobile navigation
- `TagPills.tsx` - Tag display and filtering
- `CodeBlock.tsx` - Enhanced code blocks
- `ExpandableSection.tsx` - Collapsible content
- `PageMap.tsx` - Content mapping utility

##### ExpandableSection Component Guidelines

**Purpose**: Progressive disclosure for optional/advanced content that doesn't interrupt main flow.

**Title**: Clear, specific topic name (e.g., "Docker Rootless Mode", "VPS Provider Options")

**Description**: 
- Standalone useful information (don't just describe what's inside)
- Specific facts, options, or key points
- Good: "Some great VPS provider options are DigitalOcean, Hetzner, Linode, Vultr."
- Bad: "Here are some popular VPS providers with my experience and recommendations."

**Button Text**:
- Match content type: "See provider details", "See comparison", "Read setup guide"
- Default "Read how to do this" only for actual how-to content

**Content Structure**:
- Title and description appear in expanded view
- Avoid repeating description info in first paragraph
- Start with unique content that adds value beyond the description

### Build Configuration

#### Astro Config (`astro.config.mjs`)
- **Integrations**: MDX, React, Sitemap
- **Experimental**: Client prerender enabled
- **Redirects**: Legacy URL mapping
- **Shiki**: Dual theme support (light/dark)
- **Transformers**: Notation highlighting, diffs, focus

#### Styling (`tailwind.config.js`)
- **Brand Colors**: Blue gradient palette
- **Typography**: Inter (body), Comfortaa (display), JetBrains Mono (code)
- **Dark Mode**: Class-based toggle
- **Custom**: Hero gradients, code syntax colors

### Development Workflow

#### Scripts
- `npm run dev` - Development server (port 4321)
- `npm run build` - Production build
- `npm run preview` - Preview built site
- `npm run test:screenshots` - Visual regression tests

#### Dev Environment (`dev.sh`, `CLAUDE.local.md`)
- Tmux session management
- Dual pane setup (server + commands)
- Auto-restart on port conflicts

### Features

#### Search System
- Client-side fuzzy search
- Keyboard navigation (↑↓, Enter, Escape)
- Real-time filtering
- Cross-collection search

#### Theme System
- System preference detection
- Manual toggle override
- Persistent localStorage
- Smooth transitions

#### Performance
- Static generation
- Image optimization (Sharp)
- View transitions
- Service worker caching

#### SEO
- Structured metadata
- Open Graph tags
- Twitter cards
- Sitemap generation
- RSS feed

### File Structure

```
src/
├── components/          # Reusable UI components
│   ├── react/          # React components
│   └── *.astro         # Astro components
├── content/            # Content collections
│   ├── readme/         # Technical posts
│   └── notes/          # Short-form content
├── layouts/            # Page layouts
├── pages/              # Route definitions
├── styles/             # Global CSS
├── utils/              # Utility functions
├── consts.ts           # Site constants
└── content.config.ts   # Content schemas
```

### Deployment

#### GitHub Pages
- Automatic deployment on push to main
- Custom domain support
- HTTPS enabled
- Build artifacts in `dist/`

#### Performance Targets
- Lighthouse scores: 95+
- First Contentful Paint: <1.5s
- Cumulative Layout Shift: <0.1
- Time to Interactive: <3s

## Key Design Decisions

1. **Dual Collections**: Separate readme/notes for content categorization
2. **Static Generation**: Full SSG for performance and security
3. **React Islands**: Selective hydration for interactive components
4. **MDX**: Enhanced markdown with component embedding
5. **TypeScript**: Full type safety across content and code
6. **Tailwind**: Utility-first styling with design system