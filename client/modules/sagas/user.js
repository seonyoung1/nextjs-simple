import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';
import { LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS, SIGN_UP_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS } from '../reducers/user';

function loginApi(loginData) {
	return axios.post('/users/login', loginData);
}
function* login(action) {
	try {
		const res = yield call(loginApi, action.data);
		yield put({
			type: LOG_IN_SUCCESS,
			data: res.data,
		});
	} catch (e) {
		yield put({
			type: LOG_IN_FAILURE,
			error: e,
		});
	}
}
function* watchLogin() {
	yield takeEvery(LOG_IN_REQUEST, login);
}

function signApi(signData) {
	return axios.post('/users/register', signData);
}
function* sign(action) {
	try {
		yield call(signApi, action.data);
		yield put({
			type: SIGN_UP_SUCCESS,
		});
	} catch (e) {
		yield put({
			type: SIGN_UP_FAILURE,
			error: e,
		});
	}
}
function* watchSign() {
	yield takeEvery(SIGN_UP_REQUEST, sign);
}

function logoutApi() {
	return axios.get('/users/logout', logout);
}
function* logout() {
	try {
		yield call(logoutApi);
		yield put({
			type: SIGN_UP_SUCCESS,
		});
	} catch (e) {
		yield put({
			type: SIGN_UP_FAILURE,
			error: e,
		});
	}
}
function* watchLogout() {
	yield takeEvery(SIGN_UP_REQUEST, sign);
}

export default function* userSaga() {
	yield all([fork(watchLogin), fork(watchSign), fork(watchLogout)]);
}
