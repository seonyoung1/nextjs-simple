import React, { useCallback } from 'react';
import { Router, Link, i18n } from '../../i18n'

const Header = ({ locale }) => {
	const changeLo = useCallback(() => {
		// document.body.classList.remove(locale);
		i18n.changeLanguage(i18n.language === 'en' ? 'kr' : 'en');
		setTimeout(() => {
			Router.push('/');
		}, 100);
	}, [locale]);

	return (
		<header>
			<nav>
				<ul>
					<li>
						<Link href="/"><a>Index</a></Link>
					</li>
					<li>
						<Link href="/contact"><a>Contact</a></Link>
					</li>
				</ul>
			</nav>
			<div className="locale">
				<button onClick={changeLo}>{ locale === 'kr' ? 'en' : 'kr' }</button>
			</div>
		</header>
	);
};

export default Header;
