import { combineReducers } from 'redux';
import common from './common';
import main from './main';
import user from './user';

export default combineReducers({
	common,
	main,
	user,
});


