import { BLOG_TITLE, BLOG_DESCRIPTION } from '@/constants';

import { getBlogPostList } from '@/helpers/file-helpers';
import RSS from 'rss';

const FEED_OPTIONS = {
	title: BLOG_TITLE,
	description: BLOG_DESCRIPTION,
	feed_url: 'http://localhost:3000/rss.xml',
	site_url: 'http://localhost:3000/',
};

export async function GET() {
	const posts = await getBlogPostList();

	const feed = new RSS(FEED_OPTIONS);
	posts.forEach(({ slug, title, abstract, publishedOn }) => {
		feed.item({
			title,
			description: abstract,
			url: `http://localhost:3000/${slug}`,
			date: publishedOn,
		});
	});

	return new Response(feed.xml({ indent: true }), {
		headers: { 'Content-Type': 'application/xml' },
	});
}
