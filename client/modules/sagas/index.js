import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import main from './main';
import user from './user';

axios.defaults.baseURL = 'http://localhost:5000/api/';

export default function* rootSaga() {
	yield all([
		fork(main),
		fork(user),
	]);
}