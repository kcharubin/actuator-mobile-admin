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

export const getEndpointAndServerId = (action) => {
    const { endpointId } = action.endpoint;
    const { serverId } = action.server;
    return { endpointId, serverId };
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_ENDPOINT: {
            const { endpointId, serverId } = getEndpointAndServerId(action);
            const currentResponse = state[endpointId] || INITIAL_RESPONSE_PARAMS;
            return {
                ...state, [endpointId]: { ...currentResponse, ...INITIAL_RESPONSE_PARAMS, serverId }
            };
        }
        case FETCH_ENDPOINT_SUCCESS: {
            const { endpointId, serverId } = getEndpointAndServerId(action);
            const lastResponse = {
                time: Date(),
                data: action.payload,
                loading: false,
                isSuccess: true,
                serverId
            };

            return { ...state, [endpointId]: lastResponse };
        }
        case FETCH_ENDPOINT_FAILURE: {
            const { endpointId, serverId } = getEndpointAndServerId(action);
            const lastResponse = {
                time: Date(),
                data: action.error,
                loading: false,
                isSuccess: false,
                serverId
            };
            return { ...state, [endpointId]: lastResponse };
        }
        default:
            return state;
    }
};
