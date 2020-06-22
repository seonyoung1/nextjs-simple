import React, { useCallback } from 'react';
import Link from 'next/link';

const Header = ({ }) => {
	return (
		<header>
			<h1>
				<Link href="/"><a>Home</a></Link>
			</h1>
			<nav>
				<ul>
					<li>
						<Link href="/login"><a>Login</a></Link>
					</li>
					<li>
						<Link href="/signup"><a>SignUp</a></Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
