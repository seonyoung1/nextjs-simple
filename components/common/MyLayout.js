import React from 'react';
import Header from './Header';

const MyLayout = ({ children, locale }) => {
	return (
		<div id="wrapper">
			<Header locale={locale} />
			{children}
		</div>
	);
};

export default MyLayout;
