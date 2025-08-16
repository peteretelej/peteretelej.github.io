import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const readmePosts = await getCollection('readme', ({ data }) => {
		// Show drafts in development, hide in production
		return import.meta.env.DEV ? true : data.draft !== true;
	});
	const notes = await getCollection('notes', ({ data }) => {
		// Show drafts in development, hide in production
		return import.meta.env.DEV ? true : data.draft !== true;
	});
	
	// Combine and sort all content by date
	const allContent = [
		...readmePosts.map((post) => ({
			title: post.data.title,
			description: post.data.subtitle || '',
			pubDate: post.data.publishDate,
			link: `/readme/${post.id}/`,
			category: 'README'
		})),
		...notes.map((note) => ({
			title: note.data.title,
			description: note.data.excerpt || '',
			pubDate: note.data.publishDate,
			link: `/notes/${note.id}/`,
			category: 'Notes'
		}))
	].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: allContent,
	});
}
