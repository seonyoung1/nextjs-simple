import React, { useCallback } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const Header = ({ }) => {
	const { myInfo } = useSelector(state => state.user);
	return (
		<header>
			<h1>
				<Link href="/"><a>Home</a></Link>
			</h1>
			<nav>
				<ul className="auth">
				{!(myInfo && myInfo.userId) ?
					<>
						<li>
							<Link href="/login"><a>Login</a></Link>
						</li>
						<li>
							<Link href="/signup"><a>SignUp</a></Link>
						</li>
					</>
					:
					<li>
						<button>Logout</button>
					</li>
				}
				</ul>
			</nav>
		</header>
	);
};

export default Header;
