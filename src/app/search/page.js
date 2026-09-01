import React, { Suspense } from 'react';

import BlogSummaryCard from '@/components/BlogSummaryCard';
import Spinner from '@/components/Spinner';

import styles from './search.module.css';
import { getFilteredBlogPostList } from '@/helpers/file-helpers';

async function SearchPage({ searchParams }) {
	const { q } = await searchParams;

	const posts = await getFilteredBlogPostList(q);

	return (
		<div className={styles.wrapper}>
			<h1 className={styles.mainHeading}>Search results for "{q}":</h1>

			<Suspense fallback={<Spinner />}>
				{posts.map(({ slug, title, abstract, publishedOn }) => (
					<BlogSummaryCard
						key={slug}
						slug={slug}
						title={title}
						abstract={abstract}
						publishedOn={publishedOn}
					/>
				))}
			</Suspense>
		</div>
	);
}

export default SearchPage;
