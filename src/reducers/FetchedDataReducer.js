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
            console.log("EEE");
            console.log(action.endpoint);
            const currentResponse = state[endpointId] || INITIAL_RESPONSE_PARAMS;
            return {
                ...state, [endpointId]: { ...currentResponse, ...INITIAL_RESPONSE_PARAMS }
            };
        }
        case FETCH_ENDPOINT_SUCCESS: {
            console.log('axios sucess');
            console.log(action);
            const lastResponse = {
                time: Date(),
                data: action.payload,
                loading: false
            };

            return { ...state, [action.endpoint.endpointId]: lastResponse };
        }
        case FETCH_ENDPOINT_FAILURE: {
            console.log('axios failure');
            console.log(action);
            return {};
        }

        default:
            return state;
    }
};