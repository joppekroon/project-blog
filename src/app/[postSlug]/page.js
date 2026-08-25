import React from "react";
import dynamic from "next/dynamic";

import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";
import { loadBlogPost } from "@/helpers/file-helpers";
import { MDXRemote } from "next-mdx-remote/rsc";
import { BLOG_TITLE } from "@/constants";
import CodeSnippet from "@/components/CodeSnippet";

export async function generateMetadata({ params }) {
	const { postSlug } = await params;
	const { frontmatter } = await loadBlogPost(postSlug);

	return {
		title: `${frontmatter.title} • ${BLOG_TITLE}`,
		description: frontmatter.abstract,
	};
}

async function BlogPost({ params }) {
	const { postSlug } = await params;
	const { frontmatter, content } = await loadBlogPost(postSlug);

	const components = frontmatter.components
		.split(",")
		.map((component) => [
			component,
			dynamic(() => import(`@/components/${component}`)),
		]);

	return (
		<article className={styles.wrapper}>
			<BlogHero
				title={frontmatter.title}
				publishedOn={frontmatter.publishedOn}
			/>
			<div className={styles.page}>
				<MDXRemote
					source={content}
					components={{
						pre: CodeSnippet,
						...Object.fromEntries(components),
					}}
				/>
			</div>
		</article>
	);
}

export default BlogPost;
