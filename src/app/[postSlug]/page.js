import React from 'react';

import BlogHero from '@/components/BlogHero';

import styles from './postSlug.module.css';
import { loadBlogPost } from '@/helpers/file-helpers';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { BLOG_TITLE } from '@/constants';

import COMPONENT_MAP from '@/helpers/mdx-components';
import { notFound } from 'next/navigation';

async function getBlogPost(slug) {
	try {
		return await loadBlogPost(slug);
	} catch (error) {
		notFound();
	}
}

export async function generateMetadata({ params }) {
	const { postSlug } = await params;
	const { frontmatter } = await getBlogPost(postSlug);

	return {
		title: `${frontmatter.title} • ${BLOG_TITLE}`,
		description: frontmatter.abstract,
	};
}

async function BlogPost({ params }) {
	const { postSlug } = await params;
	const { frontmatter, content } = await getBlogPost(postSlug);

	return (
		<article className={styles.wrapper}>
			<BlogHero
				title={frontmatter.title}
				publishedOn={frontmatter.publishedOn}
			/>
			<div className={styles.page}>
				<MDXRemote source={content} components={COMPONENT_MAP} />
			</div>
		</article>
	);
}

export default BlogPost;
