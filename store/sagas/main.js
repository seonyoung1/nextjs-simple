import { all, fork, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { GET_MAIN_REQUEST, GET_MAIN_SUCCESS, GET_MAIN_FAILURE } from '../reducers/main';

function getMainApi() {
	return axios.get(`http://jsonplaceholder.typicode.com/posts`);
}
function* getMain(action) {
	try {
		const { data : response } = yield call(getMainApi);
		yield put({
			type: GET_MAIN_SUCCESS,
			contents: {
				beyond: response.beyond,
			}
		})
	} catch (e) {
		yield put({
			type: GET_MAIN_FAILURE,
			error: e,
		})
	}
}
function* watchMain() {
	yield takeLatest(GET_MAIN_REQUEST, getMain);
}

export default function* mainSaga() {
	yield all([
		fork(watchMain),
	])
}