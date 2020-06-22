export const GET_MAIN_REQUEST = 'GET_MAIN_REQUEST';
export const GET_MAIN_SUCCESS = 'GET_MAIN_SUCCESS';
export const GET_MAIN_FAILURE = 'GET_MAIN_FAILURE';

const initialState = {
	contents: {
		title: null,
	},
	isLoading: false,
	error: null,
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_MAIN_REQUEST:
			return {
				...state,
				isLoading: true,
			}
		case GET_MAIN_SUCCESS:
			return {
				...state,
				isLoading: false,
				contents: action.contents,
			}
		case GET_MAIN_FAILURE:
			return {
				...state,
				isLoading: false,
				error: action.error,
			}
		default:
			return state;
	}
}