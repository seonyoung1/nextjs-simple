export const ACTION_PATH = 'ACTION_PATH';

const initialState = {
	pathname: '',
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ACTION_PATH:
			return {
				...state,
				pathname: action.pathname,
			};
		default:
			return state;
	}
}
