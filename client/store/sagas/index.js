import { all, fork } from 'redux-saga/effects';
import main from './main';

export default function* rootSaga() {
	yield all([
		fork(main),
	]);
}