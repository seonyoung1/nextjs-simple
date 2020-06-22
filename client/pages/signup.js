import React, { useEffect } from 'react';
import axios from 'axios';

const SignUp = () => {
	useEffect(() => {
		axios.get('/hello').then(res => console.log(res.data));
	}, [])
	return (
		<div>
			<p>회원가입</p>
		</div>
	);
};

export default SignUp;
