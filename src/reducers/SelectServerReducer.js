import { 
    SELECT_SERVER, 
    SELECT_SERVER_ENDPOINT,
    EDIT_SERVER_ENDPOINT
} from '../actions/types';

const INITIAL_STATE = {
    serverId: null,
    endpointId: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SELECT_SERVER: {
            return { ...state, serverId: action.payload.serverId };
        }
        case EDIT_SERVER_ENDPOINT:
        case SELECT_SERVER_ENDPOINT: {
            return { ...state, endpointId: action.payload.endpointId };
        }

        default:
            return state;
    }
};
