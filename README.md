# Let's Talk Code

A modern technical blog built with Astro 5, featuring clean design, fast performance, and interactive components. Migrated from Jekyll with URL preservation and enhanced user experience.

## 🚀 Live Site

Visit [peteretelej.github.io](https://peteretelej.github.io)

## 🛠 Technology Stack

- **Framework**: [Astro 5.12](https://astro.build) with TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) with custom design system
- **Interactive Components**: [React 19](https://react.dev) with Astro Islands
- **Content**: MDX with content collections and type-safe schemas
- **Performance**: Sharp image optimization, view transitions
- **SEO**: OpenGraph, sitemap, RSS feed, canonical URLs

## 📁 Project Structure

```
src/
├── components/
│   ├── react/                 # Interactive React components
│   │   ├── CodeBlock.tsx      # Enhanced code blocks with copy
│   │   ├── ExpandableSection.tsx # Collapsible content
│   │   ├── PageMap.tsx        # Document navigation
│   │   └── TagPills.tsx       # Section navigation
│   ├── BaseHead.astro         # SEO and meta tags
│   ├── Header.astro           # Site navigation
│   └── Footer.astro           # Site footer
├── content/
│   ├── readme/                # Technical posts collection
│   └── config.ts              # Content schemas
├── layouts/
│   ├── Base.astro             # Base page layout
│   └── ReadmePost.astro       # Blog post layout
├── pages/
│   ├── readme/                # Blog routes
│   │   ├── [...slug].astro    # Individual posts
│   │   └── index.astro        # Post listing
│   ├── index.astro            # Homepage
│   ├── about.astro            # About page
│   ├── search.astro           # Search functionality
│   └── 404.astro              # Error page
└── styles/
    └── global.css             # Global styles and fonts
```

## 🎨 Design System

### Brand Colors
- **Primary**: `#3273dc` (brand-600)
- **Dark**: `#2366d1` (brand-700)
- **Gradients**: Custom hero gradients with dark mode variants

### Typography
- **Headers**: Atkinson font family
- **Code**: Fira Code, JetBrains Mono
- **Body**: System font stack

### Interactive Components
- **ExpandableSection**: Collapsible content with shadow insets
- **TagPills**: Smooth-scrolling section navigation  
- **CodeBlock**: Syntax highlighting with copy functionality
- **PageMap**: Document minimap for long posts

## 🧞 Development Commands

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview build locally |

## 📝 Content Management

### Adding Posts

1. Create new `.mdx` file in `src/content/readme/`
2. Use the schema-defined frontmatter:

```yaml
---
title: Your Post Title
subtitle: Optional subtitle
publishDate: YYYY-MM-DD
tags: [tag1, tag2, tag3]
thumbnail: /images/thumbnail.png
---
```

3. Write content in Markdown/MDX with React component support

### Content Schema

```typescript
{
  title: string
  subtitle?: string  
  publishDate: Date
  tags: string[]
  thumbnail?: string
  draft?: boolean
}
```

## 🔗 URL Structure

- **Homepage**: `/`
- **Post Listing**: `/readme/`
- **Individual Posts**: `/readme/post-slug/`
- **Legacy Redirects**: Original Jekyll URLs redirect to new structure
- **Search**: `/search/`
- **About**: `/about/`

## ⚡ Performance Features

- **Static Generation**: Pre-built HTML for all routes
- **Image Optimization**: Sharp-powered WebP conversion
- **View Transitions**: Smooth page navigation
- **Code Splitting**: Minimal JavaScript bundles
- **Font Optimization**: Preloaded web fonts
- **Lighthouse**: 95+ scores across all metrics

## 🌙 Dark Mode

Full dark mode support with:
- Tailwind's `dark:` variant system
- Persistent theme selection
- Optimized contrast ratios
- Dark-aware components and images

## 📱 Responsive Design

- **Mobile-first**: Tailwind's responsive utilities
- **Breakpoints**: sm, md, lg, xl
- **Interactive Elements**: Touch-friendly controls
- **Navigation**: Collapsible mobile menu

## 🔍 SEO Optimization

- **Meta Tags**: Complete OpenGraph and Twitter Cards
- **Sitemap**: Auto-generated XML sitemap
- **RSS Feed**: Full-content RSS at `/rss.xml`
- **Canonical URLs**: Proper canonical link management
- **Structured Data**: Schema.org markup

## 🚀 Deployment

Built for GitHub Pages with:
- Static site generation
- Asset optimization
- URL redirects configured
- CNAME support

## 📄 License

MIT License - see original blog content and code structure.

## 🤝 Contributing

This is a personal blog, but feel free to:
- Report issues with the site
- Suggest improvements
- Reference the architecture for your own projects

---

Built with ❤️ using Astro, Tailwind CSS, and modern web technologies.