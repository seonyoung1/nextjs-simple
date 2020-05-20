import React from 'react';
import Header from './Header';

const MyLayout = ({ children }) => {
	return (
		<div id="wrapper">
			<Header />
			{children}
		</div>
	);
};

export default MyLayout;
