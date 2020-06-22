import React, { useCallback } from 'react';
import Link from 'next/link';

const Header = ({ }) => {
	return (
		<header>
			<nav>
				<ul>
					<li>
						<Link href="/"><a>Index</a></Link>
					</li>
					<li>
						<Link href="/signup"><a>Join</a></Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
