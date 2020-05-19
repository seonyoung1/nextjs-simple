import { all, fork, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { GET_MAIN_REQUEST, GET_MAIN_SUCCESS, GET_MAIN_FAILURE } from '../reducers/main';

axios.defaults.baseURL = 'http://218.38.58.180/betree_2020_admin/api';

function getMainApi(locale) {
	return axios.get(`/${locale}/index`);
}
function* getMain(action) {
	try {
		const { data : response } = yield call(getMainApi, action.locale);
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