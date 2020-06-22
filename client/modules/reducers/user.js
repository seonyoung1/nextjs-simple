export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const initialState = {
	isLoggedIn: false, // 로그인 여부
	isLoggingIn: false, // 로그인 시도중
	isLoggingOut: false, // 로그아웃 시도중
	logInErrorReason: '', // 로그인 실패 사유
	isSignedUp: false, // 회원가입 성공
	isSigningUp: false, // 회원가입 시도중
	signUpErrorReason: '', // 회원가입 실패 사유
	me: null, //내정보
}

export default ( state = initialState, action) => {
	switch (action.type) {
		case LOG_IN_REQUEST: {
			return{
				...state,
				isLoggingIn: true,
				logInErrorReason: '',
			}
		}
		case LOG_IN_SUCCESS: {
			return{
				...state,
				isLoggingIn: false,
				isLoggedIn: true,
				me: action.data,
			}
		}
		case LOG_IN_FAILURE: {
			return{
				...state,
				isLoggingIn: false,
				isLoggedIn: false,
				logInErrorReason: action.error,
				me: null,
			}
		}
		case LOG_OUT_REQUEST: {
			return{
				...state,
				isLoggedOut: true,
			}
		}
		case LOG_OUT_SUCCESS: {
			return{
				...state,
				isLoggedOut: false,
				isLoggedIn: false,
				me: null,
			}
		}
		case SIGN_UP_REQUEST: {
			return{
				...state,
				isSigningUp: true,
				isSignedUp: false,
				signUpErrorReason: '',
			}
		}
		case SIGN_UP_SUCCESS: {
			return{
				...state,
				isSigningUp: false,
				isSignedUp: true,
			}
		}
		case SIGN_UP_FAILURE: {
			return{
				...state,
				isSigningUp: false,
				signUpErrorReason: action.error,
			}
		}
		default: {
			return {
				...state,
			}
		}
	}
}