import {
    FETCH_ENDPOINT,
    FETCH_ENDPOINT_FAILURE,
    FETCH_ENDPOINT_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {

};

const INITIAL_RESPONSE_PARAMS = {
    loading: true,
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case FETCH_ENDPOINT: {
            const { endpointId } = action.endpoint;
            const currentResponse = state[endpointId] || INITIAL_RESPONSE_PARAMS;
            return {
                ...state, [endpointId]: { ...currentResponse, ...INITIAL_RESPONSE_PARAMS }
            };
        }
        case FETCH_ENDPOINT_SUCCESS: {
            const lastResponse = {
                time: Date(),
                data: action.payload,
                loading: false
            };

            return { ...state, [action.endpoint.endpointId]: lastResponse };
        }
        case FETCH_ENDPOINT_FAILURE: {
            const lastResponse = {
                time: Date(),
                data: action.error,
                loading: false
            };
            return { ...state, [action.endpoint.endpointId]: lastResponse };
        }
        default:
            return state;
    }
};
