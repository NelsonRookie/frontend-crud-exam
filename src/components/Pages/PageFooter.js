import styles from './PageFooter.module.scss';
import React from 'react';

function PageFooter() {
	return (
		<footer className={styles['footer']}>
			<p>&copy; {new Date().getFullYear()} All rights reserved</p>
		</footer>
	)
}

export default PageFooter;
