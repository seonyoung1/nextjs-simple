import React, { useState, useCallback } from 'react';
import { useInput } from '../hooks';
import Link from 'next/link';

const Login = () => {
	const [email, onChangeEmail] = useInput('');
	const [password, onChangePassword] = useInput('');

	const onSubmit = useCallback((e) => {
		e.preventDefault();
		if( !email || !password ){
			return alert('정보를 입력해주세요');
		}
		alert(`${email}님 안녕하세요!`)
	}, [email, password]);

	return (
		<div className="login">
			<h2>로그인</h2>
			<form onSubmit={onSubmit}>
				<div className="item">
					<label htmlFor="userEmail">이메일</label>
					<input type="text" name="userEmail" id="userEmail" onChange={onChangeEmail} value={email} />
				</div>
				<div className="item">
					<label htmlFor="userPassword">비밀번호</label>
					<input type="password" name="userPassword" id="userPassword" onChange={onChangePassword} value={password} />
				</div>
				<div className="button_group">
					<button type="submit">로그인</button>
					<Link href={`/signup`}>회원가입</Link>
				</div>
			</form>
		</div>
	);
};

export default Login;
