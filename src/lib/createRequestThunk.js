import { startLoading, finishLoading } from '../modules/loading';

function createRequestThunk(type, request) {
	const SUCCESS = `${type}_SUCCESS`;
	const FAILURE = `${type}_FAILURE`;
	return (params) => async (dispatch) => {
		dispatch({ type });
		dispatch(startLoading(type));
		try {
			const response = await request(params);
			console.log('response:' + response);
			const jsonString = await response.json();
			console.log('jsonString:' + jsonString);
			const payload = JSON.parse(jsonString);
			console.log('payload:' + payload);

			dispatch({
				type: SUCCESS,
				payload,
			});
		} catch (e) {
			dispatch({
				type: FAILURE,
				payload: e,
				error: true,
			});
			console.error(e);
		} finally {
			dispatch(finishLoading(type));
		}
	};
}

export default createRequestThunk;
