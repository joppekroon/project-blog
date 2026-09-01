import React from 'react';

import styles from './Button3d.module.css';

/*
 * From 'Building a Magical 3D Button' by Josh Comeau
 * https://www.joshwcomeau.com/animation/3d-button/
 */
function Button3d({ children }) {
	return (
		<button className={styles.pushable}>
			<span className={styles.shadow}></span>
			<span className={styles.edge}></span>
			<span className={styles.front}>{children}</span>
		</button>
	);
}

export default Button3d;
