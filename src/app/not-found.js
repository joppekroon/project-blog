import Link from 'next/link';
import { BLOG_TITLE } from '@/constants';
import styles from './not-found.module.css';

export const metadata = {
	title: `Not Found • ${BLOG_TITLE}`,
};

export default function NotFound() {
	return (
		<div className={styles.wrapper}>
			<h1 className={styles.mainHeading}>404: Not Found</h1>
			<p>The requested page does not exist</p>
			<Link href="/">Return Home</Link>
		</div>
	);
}
