'use client';
import React from 'react';
import Cookie from 'js-cookie';
import { Sun, Moon } from 'react-feather';

import VisuallyHidden from '@/components/VisuallyHidden';

import {
	COLOR_THEME_COOKIE_NAME,
	DARK_TOKENS,
	LIGHT_TOKENS,
} from '@/constants';

function LightDarkToggle({ className, initialTheme }) {
	const [theme, setTheme] = React.useState(initialTheme);

	function handleToggleTheme() {
		const nextTheme = theme === 'dark' ? 'light' : 'dark';
		setTheme(nextTheme);

		Cookie.set(COLOR_THEME_COOKIE_NAME, nextTheme, {
			expires: 1000,
		});

		const root = document.documentElement;
		const colors = nextTheme === 'dark' ? DARK_TOKENS : LIGHT_TOKENS;

		root.setAttribute('data-color-theme', nextTheme);
		Object.entries(colors).forEach(([key, value]) => {
			root.style.setProperty(key, value);
		});
	}

	return (
		<button
			onClick={handleToggleTheme}
			aria-pressed={theme === 'dark'}
			className={className}
		>
			{theme === 'dark' ? <Moon size="1.5rem" /> : <Sun size="1.5rem" />}
			<VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
		</button>
	);
}

export default LightDarkToggle;
