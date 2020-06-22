import React, { useState, useEffect, useCallback } from 'react';
import { useInput } from '../hooks';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_IN_REQUEST } from '../modules/reducers/user';

const Login = () => {
	const [email, onChangeEmail] = useInput('');
	const [password, onChangePassword] = useInput('');
	const dispatch = useDispatch();
	const { isLoggingIn, isLoggedIn, myInfo } = useSelector(state => state.user);

	const onSubmit = useCallback((e) => {
		e.preventDefault();
		if( !email || !password ){
			return alert('정보를 입력해주세요');
		}
		dispatch({
			type: LOG_IN_REQUEST,
			data: {
				email,
				password
			}
		});
	}, [email, password]);

	useEffect(() => {
		if( isLoggedIn ){
			return alert(`${myInfo.nickName}님 어서오세요!`);
		}
	}, [isLoggedIn])

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
					<button type="submit">{isLoggingIn ? '로그인 중..' : '로그인'}</button>
					<Link href={`/signup`}><a>회원가입</a></Link>
				</div>
			</form>
		</div>
	);
};

export default Login;
