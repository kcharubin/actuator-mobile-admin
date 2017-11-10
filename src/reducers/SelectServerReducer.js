import { SELECT_SERVER, SELECT_SERVER_ENDPOINT } from '../actions/types';
import { navigatorRef } from '../App';

const INITIAL_STATE = {
    serverId: null,
    endpointId: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SELECT_SERVER: {
            console.log("serlect server");
            console.log(action);
            return { ...state, serverId: action.payload.serverId };
        }
        case SELECT_SERVER_ENDPOINT: {
            return { ...state, endpointId: action.payload.endpointId };
        }
        default:
            return state;
    }
};
