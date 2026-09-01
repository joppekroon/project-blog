'use client';
import React from 'react';
import { Search, X } from 'react-feather';
import VisuallyHidden from '@/components/VisuallyHidden';
import { useRouter } from 'next/navigation';

import styles from './SearchAction.module.css';
import Button3d from '../Button3d';

function SearchAction({ className }) {
	const id = React.useId();
	const [searchTerm, setSearchTerm] = React.useState('');
	const router = useRouter();

	const dialogId = `${id}-dialog`;
	const dialogTitleId = `${id}-dialog-title`;
	const searchFieldId = `${id}-search-field`;

	function handleSearch() {
		const searchURL = `/search?q=${encodeURIComponent(searchTerm)}`;
		setSearchTerm('');

		router.push(searchURL);
	}

	return (
		<>
			<button
				className={className}
				aria-haspopup="dialog"
				command="show-modal"
				commandfor={dialogId}
			>
				<Search size="1.5rem" />
				<VisuallyHidden>Search</VisuallyHidden>
			</button>
			<dialog
				aria-labelledby={dialogTitleId}
				id={dialogId}
				className={styles.dialog}
			>
				<div className={styles.contentWrapper}>
					<header className={styles.dialogHeader}>
						<h2 id={dialogTitleId} className={styles.dialogTitle}>
							Article search
						</h2>
						<button
							type="button"
							command="close"
							commandfor={dialogId}
							className={styles.closeButton}
						>
							<X />
							<VisuallyHidden>Close</VisuallyHidden>
						</button>
					</header>
					<form method="dialog" onSubmit={handleSearch}>
						<div className={styles.fieldWrapper}>
							<label htmlFor={searchFieldId} className={styles.label}>
								Search for:
							</label>
							<input
								className={styles.field}
								type="text"
								autoFocus
								id={searchFieldId}
								value={searchTerm}
								onChange={(event) => setSearchTerm(event.target.value)}
							/>
						</div>
						<Button3d>
							<div className={styles.submitContentWrapper}>
								<Search />
								Search
							</div>
						</Button3d>
					</form>
				</div>
			</dialog>
		</>
	);
}

export default SearchAction;
