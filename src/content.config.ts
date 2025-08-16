import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const readme = defineCollection({
	// Load Markdown and MDX files in the `src/content/readme/` directory.
	loader: glob({ base: './src/content/readme', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			subtitle: z.string().optional(),
			publishDate: z.coerce.date(),
			tags: z.array(z.string()),
			thumbnail: z.string().optional(),
			draft: z.boolean().optional(),
		}),
});

const notes = defineCollection({
	// Load Markdown and MDX files in the `src/content/notes/` directory.
	loader: glob({ base: './src/content/notes', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		publishDate: z.coerce.date(),
		tags: z.array(z.string()).optional(),
		draft: z.boolean().optional(),
		excerpt: z.string().optional(),
	}),
});

export const collections = { readme, notes };
