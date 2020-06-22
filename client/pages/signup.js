import React, { useEffect, useCallback, useState } from 'react';
import { useInput } from '../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_UP_REQUEST } from '../modules/reducers/user';

const SignUp = () => {
	const [email, onChangeEmail] = useInput('');
	const [name, onChangeName] = useInput('');
	const [password, onChangePassword] = useInput('');
	const [passwordCheck, setPasswordCheck] = useState('');
	const [term, setTerm] = useState(false);
	const [termError, setTermError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const dispatch = useDispatch();
	const { isSigningUp, isSignedUp } = useSelector(state => state.user);

	const onSubmit = useCallback(e => {
		e.preventDefault();
		if( password !== passwordCheck ){
			return setPasswordError(true);
		}
		if( !term ){
			return setTermError(true);
		}
		if( !email || !name || !password ){
			return alert('필수정보를 입력해주세요');
		}
		// alert(`${email}님 안녕하세요!`)
		dispatch({
			type: SIGN_UP_REQUEST,
			data: {
				email,
				name,
				password
			}
		})
	}, [email, password, passwordCheck, term]);

	const onChangeTerm = useCallback(e => {
		setTermError(false);
		setTerm(e.target.checked);
	}, []);

	const onChangePasswordCheck = useCallback(e => {
		setPasswordError(e.target.value !== password);
		setPasswordCheck(e.target.value);
	}, [password]);

	useEffect(() => {
		if( isSignedUp ){
			return alert(`회원가입 성공`);
		}
	}, [isSignedUp])

	return (
		<div className="signup">
			<h2>회원가입</h2>
			<form onSubmit={onSubmit}>
				<div className="item">
					<label htmlFor="userEmail">이메일</label>
					<input type="text" name="userEmail" id="userEmail" onChange={onChangeEmail} value={email} />
				</div>
				<div className="item">
					<label htmlFor="userName">이름</label>
					<input type="text" name="userName" id="userName" onChange={onChangeName} value={name} />
				</div>
				<div className="item">
					<label htmlFor="userPassword">비밀번호</label>
					<input type="password" name="userPassword" id="userPassword" onChange={onChangePassword} value={password} />
				</div>
				<div className="item">
					<label htmlFor="userPasswordCheck">비밀번호 확인</label>
					<input type="password" name="userPasswordCheck" id="userPasswordCheck" onChange={onChangePasswordCheck} value={passwordCheck} />
				</div>
				<div>
					<input type="checkbox" name="term" id="term" onChange={onChangeTerm} value={term} />
					<label htmlFor="term">동의 합니다</label>
				</div>
				<div>
					{passwordError && <p>비밀번호가 일치하지 않습니다.</p>}
					{termError && <p>동의해 주세요</p>}
				</div>
				<div className="button_group">
					<button type="submit">{isSigningUp? '회원가입 중..' : '회원가입'}</button>
				</div>
			</form>
		</div>
	);
};

export default SignUp;
